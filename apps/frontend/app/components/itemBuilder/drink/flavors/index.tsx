import { Dialog, Flex, Text, VisuallyHidden } from "@radix-ui/themes"
import { IBuildingDrink, Identifier, IDrink, IDrinkFlavor } from "@td/types"
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { Bottom } from "./Bottom"
import { name, objToString } from "@td/functions"
import { useInputAnywhere } from "@/app/util/hooks/inputAnywhere"
import { useFuncAnywhere } from "@/app/util/hooks/funcAnywhere"
import { useCurrentWindowSetter } from "@/app/util/hooks/currentWindowSetter"
import { useCurrentWindow } from "@/app/context/CurrentWindow"
import { ContrDialog } from "../../../ControlledDialog"
import { useDrinkBuilder } from "@/app/context/itemBuilder/Drink"
import { Flavors } from "./Flavors"
import { v4 as uuidv4 } from "uuid"
import { useAddSubtractAnywhere } from "@/app/util/hooks/addSubtractAnywhere"
import { useArrowAnywhere } from "@/app/util/hooks/arrowAnywhere"
import { useSelectItem } from "@/app/util/hooks/selectItem"
import { Multiply } from "../../../MultiplyItem"
import { ItemSearch } from "../../Search"
import { SetState } from "@/app/infra/types/setState"
import { Ref } from "@/app/infra/types/ref"

export const SelectFlavor = ({
  children,
  drink,
}: {
  children: (props: { onClick: () => void }) => ReactNode
  drink: IDrink
}) => {
  const { drinkClick, selectFlavorId, setSelectFlavorId } = useDrinkBuilder()

  return drink.flavors?.length ? (
    <SelectFlavorProvider
      drink={drink as IBuildingDrink & { flavors: IDrinkFlavor[] }}
      open={selectFlavorId === drink.id}
      setOpen={(e) => setSelectFlavorId(e ? drink.id : undefined)}
    >
      <>
        {children({
          onClick: () => drinkClick(drink),
        })}
      </>
    </SelectFlavorProvider>
  ) : (
    <>
      {children({
        onClick: () => drinkClick(drink),
      })}
    </>
  )
}

interface ISelectFlavorContext {
  drink: IDrink
  searchFlavors: string
  setSearchFlavors: SetState<string>
  searchFlavorsRef: Ref<HTMLInputElement | undefined>

  nextButtonRef: Ref<HTMLButtonElement | undefined>
  hoveredFlavor: IDrinkFlavor | undefined
  setHoveredFlavor: SetState<IDrinkFlavor | undefined>
  hoveredFlavorRef: Ref<HTMLDivElement | undefined>
  flavorsListRef: Ref<HTMLDivElement | undefined>

  filteredFlavors: IDrinkFlavor[]

  currentFlavors: IBuildingDrink[]
  setCurrentFlavors: SetState<IBuildingDrink[]>

  addFlavors: (flavors: IDrinkFlavor[]) => void
  removeFlavor: (flavorId: string) => void
}
const SelectFlavorContext = createContext<ISelectFlavorContext>(
  {} as ISelectFlavorContext,
)

export const SelectFlavorProvider = ({
  children,
  drink,
  open,
  setOpen,
}: {
  children: ReactNode
  drink: IBuildingDrink & { flavors: IDrinkFlavor[] }
  open: boolean
  setOpen: SetState<boolean>
}) => {
  const [currentFlavors, setCurrentFlavors] = useState<IBuildingDrink[]>([])
  const [searchFlavors, setSearchFlavors] = useState("")
  const searchFlavorsRef = useRef<HTMLInputElement>()
  const nextButtonRef = useRef<HTMLButtonElement>()

  const [hoveredFlavor, setHoveredFlavor] = useState<IDrinkFlavor | undefined>()
  const hoveredFlavorRef = useRef<HTMLDivElement>()
  const flavorsListRef = useRef<HTMLDivElement>()

  const filteredFlavors =
    drink.flavors?.length && searchFlavors
      ? drink.flavors.filter((flavor) => {
          const o = objToString(flavor, []).toLowerCase()
          return o.includes(searchFlavors.toLowerCase())
        })
      : drink.flavors

  const addFlavors = (flavors: IDrinkFlavor[]) => {
    const _flavors = flavors.map((flavor) => ({
      ...drink,
      flavor,
      imageUrl: flavor.imageUrl || drink.imageUrl,
      code: uuidv4(),
      drinkId: drink.id,
    }))

    setCurrentFlavors((prev) => [...prev, ..._flavors])
  }

  const removeFlavor = (flavorCode: string) =>
    setCurrentFlavors((prev) => prev.filter((x) => x.code !== flavorCode))

  return (
    <SelectFlavorContext.Provider
      value={{
        drink,
        currentFlavors,
        setCurrentFlavors,
        addFlavors,
        removeFlavor,
        searchFlavors,
        setSearchFlavors,
        searchFlavorsRef,
        filteredFlavors,
        nextButtonRef,
        hoveredFlavorRef,
        flavorsListRef: flavorsListRef,
        hoveredFlavor,
        setHoveredFlavor,
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
          minWidth={"60svw"}
          minHeight={"70svh"}
        >
          <SelectFlavorComponent />
        </Dialog.Content>
      </ContrDialog>
    </SelectFlavorContext.Provider>
  )
}

const SelectFlavorComponent = () => {
  const {
    drink,
    searchFlavors,
    searchFlavorsRef,
    filteredFlavors,
    hoveredFlavor,
    setHoveredFlavor,
    hoveredFlavorRef,
    flavorsListRef,
    currentFlavors,
    setCurrentFlavors,
    addFlavors,
    nextButtonRef,
    setSearchFlavors,
  } = useSelectFlavor()

  const { currentWindow } = useCurrentWindow()
  const THIS_WINDOW = "select-flavors-drink-builder"
  const SEARCH_ID = "search-drink-flavors"
  useCurrentWindowSetter(THIS_WINDOW)

  useInputAnywhere(THIS_WINDOW, searchFlavorsRef, "#" + SEARCH_ID)

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

  useEffect(() => setCurrentFlavors([]), []) //eslint-disable-line

  const { nextItem, previousItem } = useSelectItem(
    filteredFlavors.filter(Boolean) as Identifier[],
    hoveredFlavor,
    setHoveredFlavor as SetState<Identifier | undefined>,
    hoveredFlavorRef,
    flavorsListRef,
    searchFlavors,
  )

  useArrowAnywhere(
    THIS_WINDOW,
    () => previousItem(),
    () => nextItem(),
    () => {
      hoveredFlavor && addFlavors([hoveredFlavor])
    },
    [searchFlavorsRef.current],
    [filteredFlavors, currentFlavors, hoveredFlavor, currentWindow],
  )

  const [multiplyOpen, setMultiplyOpen] = useState(false)

  const openMultiply = () => {
    if (hoveredFlavor) {
      setMultiplyOpen(true)
    }
  }

  useAddSubtractAnywhere(
    THIS_WINDOW,
    () => openMultiply(),
    () => openMultiply(),
    [searchFlavorsRef?.current],
    [filteredFlavors, currentFlavors, hoveredFlavor, currentWindow],
  )

  return (
    <Flex direction={"column"} gap={"2"} minHeight={"70svh"}>
      <Flex direction={"column"} align={"center"}>
        <Text>{name(drink)}</Text>
        <Text size={"1"} color="gray">
          Selecione o sabor:
        </Text>
      </Flex>
      <ItemSearch
        id={SEARCH_ID}
        search={searchFlavors}
        setSearch={setSearchFlavors}
        searchRef={searchFlavorsRef}
      />
      <Flavors />
      <Bottom />

      <Multiply
        isOpen={multiplyOpen}
        setIsOpen={setMultiplyOpen}
        onNext={(value) => {
          if (hoveredFlavor) {
            const arr: IDrinkFlavor[] = new Array(value)
            arr.fill(hoveredFlavor)
            addFlavors(arr)
          }
        }}
      />
    </Flex>
  )
}

export const useSelectFlavor = () => useContext(SelectFlavorContext)
