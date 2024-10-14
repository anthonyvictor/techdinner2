import { Dialog, Flex, Text, VisuallyHidden } from "@radix-ui/themes"
import {
  IBuildingOther,
  Identifier,
  IOther,
  IOtherVariation,
  IOtherSize,
  IOtherExtra,
} from "@td/types"
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { Bottom } from "./Bottom"
import { groupSelectedOthers, name, objToString } from "@td/functions"
import { useInputAnywhere } from "@/app/util/hooks/inputAnywhere"
import { useFuncAnywhere } from "@/app/util/hooks/funcAnywhere"
import { useCurrentWindowSetter } from "@/app/util/hooks/currentWindowSetter"
import { useCurrentWindow } from "@/app/context/CurrentWindow"
import { ContrDialog } from "../../../ControlledDialog"
import { useOtherBuilder } from "@/app/context/itemBuilder/Other"
// import { Options } from "./Options"
import { v4 as uuidv4 } from "uuid"
import { useAddSubtractAnywhere } from "@/app/util/hooks/addSubtractAnywhere"
import { useArrowAnywhere } from "@/app/util/hooks/arrowAnywhere"
import { useSelectItem } from "@/app/util/hooks/selectItem"
import { Multiply } from "../../../MultiplyItem"
import { ItemSearch } from "../../Search"
import { SetState } from "@/app/infra/types/setState"
import { Ref, RefButton, RefDiv, RefInput } from "@/app/infra/types/ref"
import { Sizes } from "./Sizes"
import { Variations } from "./Variations"
import { Extras } from "./Extras"
import { SelectedOthers } from "../SelectedOthers"

export const SelectOptions = ({
  children,
  other,
}: {
  children: (props: { onClick: () => void }) => ReactNode
  other: IOther
}) => {
  const { otherClick, selectOptionsId, setSelectOptionsId } = useOtherBuilder()
  // return children({ onClick: () => otherClick(other) })

  return other.variations?.length ? (
    <SelectOptionProvider
      // other={other as IBuildingOther & { options: IOtherOption[] }}
      other={other as IBuildingOther}
      open={selectOptionsId === other.id}
      setOpen={(e) => setSelectOptionsId(e ? other.id : undefined)}
    >
      <>
        {children({
          onClick: () => otherClick(other),
        })}
      </>
    </SelectOptionProvider>
  ) : (
    <>
      {children({
        onClick: () => otherClick(other),
      })}
    </>
  )
}

interface ISelectOptionContext {
  other: IOther

  currentSize: IOtherSize | undefined
  groupedOptions: IBuildingOther[][]
  setCurrentSize: SetState<IOtherSize | undefined>
  addOptions: (size: IOtherSize, variations: IOtherVariation[]) => void
  removeOption: (variationCode: string) => void
  searchVariations: string
  setSearchVariations: SetState<string>
  searchVariationsRef: RefInput
  filteredVariations: IOtherVariation[]
  nextButtonRef: RefButton
  hoveredSizeRef: RefDiv
  hoveredVariationRef: RefDiv
  sizesListRef: RefDiv
  variationsListRef: RefDiv
  hoveredSize: IOtherSize | undefined
  setHoveredSize: SetState<IOtherSize | undefined>
  hoveredVariation: IOtherVariation | undefined
  setHoveredVariation: SetState<IOtherVariation | undefined>
  currentOptions: IBuildingOther[]
  setCurrentOptions: SetState<IBuildingOther[]>
  extras: IOtherExtra[]
  setExtras: SetState<IOtherExtra[]>
}
const SelectOptionContext = createContext<ISelectOptionContext>(
  {} as ISelectOptionContext,
)

export const SelectOptionProvider = ({
  children,
  other,
  open,
  setOpen,
}: {
  children: ReactNode
  // other: IBuildingOther & { options: IOtherOption[] }
  other: IBuildingOther
  open: boolean
  setOpen: SetState<boolean>
}) => {
  const [currentOptions, setCurrentOptions] = useState<IBuildingOther[]>([])
  const [currentSize, setCurrentSize] = useState<IOtherSize | undefined>(
    undefined,
  )

  const [searchVariations, setSearchVariations] = useState("")
  const searchVariationsRef = useRef<HTMLInputElement>()
  const nextButtonRef = useRef<HTMLButtonElement>()

  const [hoveredSize, setHoveredSize] = useState<IOtherSize | undefined>()
  const [hoveredVariation, setHoveredVariation] = useState<
    IOtherVariation | undefined
  >()

  const [extras, setExtras] = useState<IOtherExtra[]>([])

  const hoveredSizeRef = useRef<HTMLDivElement>()
  const hoveredVariationRef = useRef<HTMLDivElement>()
  const sizesListRef = useRef<HTMLDivElement>()
  const variationsListRef = useRef<HTMLDivElement>()

  const filteredVariations =
    other.variations?.length && searchVariations
      ? other.variations.filter((variation) => {
          const o = objToString(variation, []).toLowerCase()
          return o.includes(searchVariations.toLowerCase())
        })
      : other.variations ?? []

  const groupedOptions = currentOptions?.length
    ? groupSelectedOthers(
        currentOptions.map((x) => ({ ...x, finalExtras: extras })),
      )
    : []

  const addOptions = (size: IOtherSize, variations: IOtherVariation[]) => {
    const _options = variations.map((variation) => ({
      ...other,
      size,
      variation,
      extras,
      imageUrl: variation.imageUrl || other.imageUrl,
      code: uuidv4(),
      otherId: other.id,
    }))

    setCurrentOptions((prev) => [...prev, ..._options])
  }

  const removeOption = (variationCode: string) =>
    setCurrentOptions((prev) => prev.filter((x) => x.code !== variationCode))

  return (
    <SelectOptionContext.Provider
      value={{
        other,
        groupedOptions,
        currentSize,
        setCurrentSize,
        addOptions,
        removeOption,
        searchVariations,
        setSearchVariations,
        searchVariationsRef,
        filteredVariations,
        nextButtonRef,
        hoveredSizeRef,
        hoveredVariationRef,
        sizesListRef,
        variationsListRef,
        hoveredSize,
        setHoveredSize,
        hoveredVariation,
        setHoveredVariation,
        currentOptions,
        setCurrentOptions,
        extras,
        setExtras,
      }}
    >
      <ContrDialog open={open} setOpen={setOpen}>
        {children}
        <VisuallyHidden>
          <Dialog.Title>Build Item</Dialog.Title>
          <Dialog.Description>Build item</Dialog.Description>
        </VisuallyHidden>

        <Dialog.Content
          aria-describedby={undefined}
          minWidth={{ initial: "80svw", lg: "30svw" }}
          maxWidth={{ initial: "80svw", lg: "200px" }}
          minHeight={"80svh"}
          maxHeight={"95svh"}
          className="flex"
        >
          <SelectOptionComponent />
        </Dialog.Content>
      </ContrDialog>
    </SelectOptionContext.Provider>
  )
}

const SelectOptionComponent = () => {
  const {
    other,
    searchVariationsRef,
    nextButtonRef,
    currentOptions,
    setCurrentOptions,
    groupedOptions,
    filteredVariations,
    hoveredVariation,
    setHoveredVariation,
    hoveredVariationRef,
    variationsListRef,
    searchVariations,
    setSearchVariations,
    addOptions,
    removeOption,
    currentSize,
    setCurrentSize,
    setHoveredSize,
    hoveredSize,
    hoveredSizeRef,
    sizesListRef,
    setExtras,
  } = useSelectOptions()

  const { currentWindow } = useCurrentWindow()
  const THIS_WINDOW = "select-options-other-builder"
  const SEARCH_ID = "search-other-options"
  useCurrentWindowSetter(THIS_WINDOW)

  useInputAnywhere(THIS_WINDOW, searchVariationsRef, "#" + SEARCH_ID)

  useFuncAnywhere(
    THIS_WINDOW,
    () => {
      nextButtonRef?.current?.click()
    },
    undefined,
    undefined,
    undefined,
    [currentWindow],
  )

  useEffect(() => setCurrentOptions([]), []) //eslint-disable-line

  const { nextItem: nextVariation, previousItem: previousVariation } =
    useSelectItem(
      filteredVariations.filter(Boolean) as Identifier[],
      hoveredVariation,
      setHoveredVariation as SetState<Identifier | undefined>,
      hoveredVariationRef,
      variationsListRef,
      searchVariations,
    )

  const { nextItem: nextSize, previousItem: previousSize } = useSelectItem(
    (other.sizes ?? []).filter(Boolean) as Identifier[],
    hoveredSize,
    setHoveredSize as SetState<Identifier | undefined>,
    hoveredSizeRef,
    sizesListRef,
    "",
  )

  useArrowAnywhere(
    THIS_WINDOW,
    () => (!!currentSize ? previousVariation : previousSize)(),

    () => (!!currentSize ? nextVariation : nextSize)(),

    () => {
      if (hoveredVariation && currentSize) {
        addOptions(currentSize, [hoveredVariation])
      } else if (hoveredSize && other.variations.length === 1) {
        addOptions(hoveredSize, [other.variations[0]])
      } else if (hoveredSize) {
        setCurrentSize(hoveredSize)
      }
    },
    [searchVariationsRef.current],
    [
      filteredVariations,
      currentSize,
      currentOptions,
      hoveredVariation,
      hoveredSize,
      currentWindow,
    ],
  )

  const [multiplyOpen, setMultiplyOpen] = useState(false)

  const openMultiply = () => {
    if (hoveredVariation) {
      setMultiplyOpen(true)
    }
  }

  useAddSubtractAnywhere(
    THIS_WINDOW,
    () => openMultiply(),
    () => openMultiply(),
    [searchVariationsRef?.current],
    [filteredVariations, currentOptions, hoveredVariation, currentWindow],
  )

  useEffect(() => {
    setCurrentSize(other.sizes?.length === 1 ? other.sizes[0] : undefined)
    setCurrentOptions([])
    setExtras([])
  }, []) //eslint-disable-line

  useEffect(() => {
    setHoveredSize(undefined)
  }, [currentSize]) //eslint-disable-line

  return (
    <Flex direction={"column"} gap={"2"} className="flex-1 overflow-x-hidden">
      <Flex direction={"column"} align={"center"}>
        <Text>{name(other)}</Text>
        <Text size={"1"} color="gray">
          Selecione o tamanho / variação:
        </Text>
      </Flex>
      <ItemSearch
        id={SEARCH_ID}
        search={searchVariations}
        setSearch={setSearchVariations}
        searchRef={searchVariationsRef}
      />
      <Sizes />
      <Variations />
      <Extras />
      <SelectedOthers
        groups={groupedOptions as IBuildingOther[][]}
        onlyVariation
        removeOther={removeOption}
      />
      <Bottom />

      <Multiply
        isOpen={multiplyOpen}
        setIsOpen={setMultiplyOpen}
        onNext={(value) => {
          if (hoveredVariation) {
            const arr: IOtherVariation[] = new Array(value)
            arr.fill(hoveredVariation)
            currentSize && addOptions(currentSize, arr)
          }
        }}
      />
    </Flex>
  )
}

export const useSelectOptions = () => useContext(SelectOptionContext)
