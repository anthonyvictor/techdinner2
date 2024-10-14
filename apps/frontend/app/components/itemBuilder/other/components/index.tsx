import { Dialog, Flex, Text, VisuallyHidden } from "@radix-ui/themes"
import {
  IBuildingOther,
  Identifier,
  IOther,
  IOtherComponent,
  IOtherModification,
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
import { name, objToString } from "@td/functions"
import { useInputAnywhere } from "@/app/util/hooks/inputAnywhere"
import { useFuncAnywhere } from "@/app/util/hooks/funcAnywhere"
import { useCurrentWindowSetter } from "@/app/util/hooks/currentWindowSetter"
import { useCurrentWindow } from "@/app/context/CurrentWindow"
import { ContrDialog } from "../../../ControlledDialog"
import { useOtherBuilder } from "@/app/context/itemBuilder/Other"
import { useArrowAnywhere } from "@/app/util/hooks/arrowAnywhere"
import { useSelectItem } from "@/app/util/hooks/selectItem"
import { ItemSearch } from "../../Search"
import { SetState } from "@/app/infra/types/setState"
import { RefButton, RefDiv, RefInput } from "@/app/infra/types/ref"
import { Components } from "./Components"

export const SelectComponents = ({
  //   children,
  other,
}: {
  //   children: (props: { onClick: () => void }) => ReactNode
  //   children: ReactNode
  other: IOther
}) => {
  const { selectComponentsId, setSelectComponentsId } = useOtherBuilder()

  return other.components?.length ? (
    <SelectComponentsProvider
      other={other as IBuildingOther}
      open={selectComponentsId === other.id}
      setOpen={(e) => setSelectComponentsId(e ? other.id : undefined)}
    >
      {/* <>{children}</> */}
    </SelectComponentsProvider>
  ) : (
    <></>
  )
  //   : (
  //     children
  //   )
}

interface ISelectComponentsContext {
  other: IOther
  addModification: (modification: IOtherModification) => void
  removeModification: (modificationId: string) => void
  searchComponents: string
  setSearchComponents: SetState<string>
  searchComponentsRef: RefInput
  filteredComponents: IOtherComponent[]
  nextButtonRef: RefButton
  hoveredComponentRef: RefDiv
  componentsListRef: RefDiv
  hoveredComponent: IOtherComponent | undefined
  setHoveredComponent: SetState<IOtherComponent | undefined>
  currentModifications: IOtherModification[]
  setCurrentModifications: SetState<IOtherModification[]>
}
const SelectComponentsContext = createContext<ISelectComponentsContext>(
  {} as ISelectComponentsContext,
)

export const SelectComponentsProvider = ({
  //   children,
  other,
  open,
  setOpen,
}: {
  //   children: ReactNode
  other: IBuildingOther
  open: boolean
  setOpen: SetState<boolean>
}) => {
  const [currentModifications, setCurrentModifications] = useState<
    IOtherModification[]
  >([])

  const [searchComponents, setSearchComponents] = useState("")
  const searchComponentsRef = useRef<HTMLInputElement>()
  const nextButtonRef = useRef<HTMLButtonElement>()

  const [hoveredComponent, setHoveredComponent] = useState<
    IOtherComponent | undefined
  >()

  const hoveredComponentRef = useRef<HTMLDivElement>()
  const componentsListRef = useRef<HTMLDivElement>()

  const filteredComponents =
    other.components?.length && searchComponents
      ? other.components.filter((component) => {
          const o = objToString(component, []).toLowerCase()
          return o.includes(searchComponents.toLowerCase())
        })
      : other.components ?? []

  const addModification = (modification: IOtherModification) => {
    // const _options = components.map((component) => ({
    //   ...other,
    //   size,
    //   component,
    //   extras,
    //   imageUrl: component.imageUrl || other.imageUrl,
    //   code: uuidv4(),
    //   otherId: other.id,
    // }))
    // setCurrentOptions((prev) => [...prev, ..._options])
  }

  const removeModification = (modificationId: string) => {
    //   setCurrentOptions((prev) => prev.filter((x) => x.code !== componentCode))
  }

  return (
    <SelectComponentsContext.Provider
      value={{
        other,
        addModification,
        removeModification,
        searchComponents,
        setSearchComponents,
        searchComponentsRef,
        filteredComponents,
        nextButtonRef,
        hoveredComponentRef,
        componentsListRef,
        hoveredComponent,
        setHoveredComponent,
        currentModifications,
        setCurrentModifications,
      }}
    >
      <ContrDialog open={open} setOpen={setOpen}>
        {/* {children} */}
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
    </SelectComponentsContext.Provider>
  )
}

const SelectOptionComponent = () => {
  const {
    other,
    searchComponentsRef,
    nextButtonRef,
    currentModifications,
    setCurrentModifications,
    filteredComponents,
    hoveredComponent,
    setHoveredComponent,
    hoveredComponentRef,
    componentsListRef,
    searchComponents,
    setSearchComponents,
    addModification,
  } = useSelectComponents()

  const { currentWindow } = useCurrentWindow()
  const THIS_WINDOW = "select-components-other-builder"
  const SEARCH_ID = "search-other-components"
  useCurrentWindowSetter(THIS_WINDOW)

  useInputAnywhere(THIS_WINDOW, searchComponentsRef, "#" + SEARCH_ID)

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

  useEffect(() => setCurrentModifications([]), []) //eslint-disable-line

  const { nextItem: nextComponent, previousItem: previousComponent } =
    useSelectItem(
      filteredComponents.filter(Boolean) as Identifier[],
      hoveredComponent,
      setHoveredComponent as SetState<Identifier | undefined>,
      hoveredComponentRef,
      componentsListRef,
      searchComponents,
    )

  useArrowAnywhere(
    THIS_WINDOW,
    () => previousComponent(),

    () => nextComponent(),

    () => {
      if (hoveredComponent) {
        // addModification(hoveredComponent)
      }
    },
    [searchComponentsRef.current],
    [filteredComponents, currentModifications, hoveredComponent, currentWindow],
  )

  useEffect(() => {
    // setCurrentOptions([])
  }, []) //eslint-disable-line

  return (
    <Flex direction={"column"} gap={"2"} className="flex-1 overflow-x-hidden">
      <Flex direction={"column"} align={"center"}>
        <Text>{name(other)}</Text>
        <Text size={"1"} color="gray">
          Componentes:
        </Text>
      </Flex>
      <ItemSearch
        id={SEARCH_ID}
        search={searchComponents}
        setSearch={setSearchComponents}
        searchRef={searchComponentsRef}
      />
      <Components />
      <Bottom />
    </Flex>
  )
}

export const useSelectComponents = () => useContext(SelectComponentsContext)
