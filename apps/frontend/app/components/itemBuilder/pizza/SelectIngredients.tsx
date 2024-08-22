import {
  AlertDialog,
  Dialog,
  Flex,
  Separator,
  VisuallyHidden,
} from "@radix-ui/themes"
import {
  IBuildingPizzaFlavor,
  IBuildingPizzaFlavorIngredientType,
  Identifier,
  IPizzaFlavor,
  IPizzaFlavorIngredient,
} from "@td/types"
import { Bottom } from "./Bottom"
import { Ingredients } from "./Ingredients"
import { SearchIngredients } from "./SearchIngredients"
import {
  createContext,
  Dispatch,
  MutableRefObject,
  ReactNode,
  RefObject,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { BottomIngredients } from "./BottomIngredients"
import { usePizzaBuilder } from "@/app/context/itemBuilder/Pizza"
import {
  getPizzaIngredientModificationIs,
  getValueBySize,
  objToString,
} from "@td/functions"
import { ascii } from "@/app/infra/data/ascii"
import { useInputAnywhere } from "@/app/util/hooks/inputAnywhere"
import { useFuncAnywhere } from "@/app/util/hooks/funcAnywhere"
import { useMoveAnywhere } from "@/app/util/hooks/moveAnywhere"
import { useCurrentWindowSetter } from "@/app/util/hooks/currentWindowSetter"
import { useCurrentWindow } from "@/app/context/CurrentWindow"
import { ContrDialog, useContrDialog } from "../../ControlledDialog"

interface ISelectIngredientsContext {
  flavor: IBuildingPizzaFlavor
  setFlavor: Dispatch<SetStateAction<IBuildingPizzaFlavor>>

  searchIngredients: string
  setSearchIngredients: Dispatch<SetStateAction<string>>
  searchIngredientsRef: MutableRefObject<HTMLInputElement | undefined>

  setIngredient: (ingredient: IPizzaFlavorIngredient) => void

  nextButtonRef: MutableRefObject<HTMLButtonElement | undefined>
  hoveredIngredient: IPizzaFlavorIngredient | undefined
  setHoveredIngredient: Dispatch<
    SetStateAction<IPizzaFlavorIngredient | undefined>
  >
  hoveredIngredientRef: MutableRefObject<HTMLDivElement | undefined>
  ingredientsListRef: MutableRefObject<HTMLDivElement | undefined>

  filteredIngredients: IPizzaFlavorIngredient[]

  resetFlavor: () => IBuildingPizzaFlavor
}
const SelectIngredientsContext = createContext<ISelectIngredientsContext>(
  {} as ISelectIngredientsContext,
)

export const SelectIngredients = ({
  children,
  defaultFlavor,
}: {
  children: ReactNode
  defaultFlavor: IPizzaFlavor | IBuildingPizzaFlavor
}) => {
  const resetFlavor = () => {
    return {
      ...defaultFlavor,
      code: (defaultFlavor as IBuildingPizzaFlavor)?.code ?? "",
      modifications:
        (defaultFlavor as IBuildingPizzaFlavor).modifications ?? [],
    }
  }

  const [flavor, setFlavor] = useState<IBuildingPizzaFlavor>(resetFlavor())

  const { builder, currentPizza } = usePizzaBuilder()

  const [searchIngredients, setSearchIngredients] = useState("")
  const searchIngredientsRef = useRef<HTMLInputElement>()
  const nextButtonRef = useRef<HTMLButtonElement>()

  const [hoveredIngredient, setHoveredIngredient] = useState<
    IPizzaFlavorIngredient | undefined
  >()
  const hoveredIngredientRef = useRef<HTMLDivElement>()
  const ingredientsListRef = useRef<HTMLDivElement>()

  const setIngredient = (ingredient: IPizzaFlavorIngredient) => {
    const { isDefault, isWith, isWithout, isLess, isQuite, isModification } =
      getPizzaIngredientModificationIs(
        flavor.ingredients,
        flavor.modifications,
        ingredient,
      )

    let modifications = flavor.modifications
    if (isDefault) {
      modifications = [
        ...(flavor.modifications?.length
          ? flavor.modifications.filter((y) => y.id !== ingredient.id)
          : []),
      ]
      if (!isWithout)
        modifications.push({
          ...ingredient,
          is: "without",
          finalValue: 0,
        })
    } else if (!isDefault && !isModification) {
      modifications = [
        ...(flavor.modifications?.length
          ? flavor.modifications.filter((y) => y.id !== ingredient.id)
          : []),
        {
          ...ingredient,
          is: "with",
          finalValue: getValueBySize(currentPizza?.size, ingredient.values),
        },
      ]
    } else if (!isDefault && isModification) {
      modifications = [
        ...(flavor.modifications ?? []).filter((y) => y.id !== ingredient.id),
      ]
    }
    setFlavor((prev) => ({ ...prev, modifications }))
  }

  const filteredIngredients =
    builder.ingredients?.length && searchIngredients
      ? builder.ingredients.filter((ingredient) => {
          const o = objToString(ingredient, []).toLowerCase()
          return o.includes(searchIngredients.toLowerCase())
        })
      : builder.ingredients

  // onOpenChange={(e) => {
  //   if (e.valueOf()) {
  //     setFlavor({
  //       ...defaultFlavor,
  //       code: (defaultFlavor as IBuildingPizzaFlavor)?.code ?? "",
  //     });
  //   }
  // }}
  return (
    <SelectIngredientsContext.Provider
      value={{
        flavor,
        setFlavor,
        searchIngredients,
        setSearchIngredients,
        searchIngredientsRef,
        filteredIngredients,
        setIngredient,
        nextButtonRef,
        hoveredIngredientRef,
        ingredientsListRef,
        hoveredIngredient,
        setHoveredIngredient,
        resetFlavor,
      }}
    >
      <ContrDialog trigger={children}>
        <VisuallyHidden>
          <Dialog.Title>Build Item</Dialog.Title>
          <Dialog.Description>Build item</Dialog.Description>
        </VisuallyHidden>

        <Dialog.Content aria-describedby={undefined}>
          <SelectIngredientsComponent />
        </Dialog.Content>

        {/* <Dialog.Root
        onOpenChange={(e) => {
          if (e.valueOf()) {
            setFlavor({
              ...defaultFlavor,
              code: (defaultFlavor as IBuildingPizzaFlavor)?.code ?? "",
            });
          }
        }}
        >
        <VisuallyHidden>
          <Dialog.Title>Select ingredients</Dialog.Title>
          <Dialog.Description>Select ingredients</Dialog.Description>
        </VisuallyHidden>
        <Dialog.Trigger>{children}</Dialog.Trigger>
        <Dialog.Content aria-describedby={undefined}>
          <SelectIngredientsComponent />
        </Dialog.Content>
      </Dialog.Root> */}
      </ContrDialog>
    </SelectIngredientsContext.Provider>
  )
}

const SelectIngredientsComponent = () => {
  const {
    searchIngredients,
    searchIngredientsRef,
    filteredIngredients,
    hoveredIngredient,
    setHoveredIngredient,
    hoveredIngredientRef,
    ingredientsListRef,
    setIngredient,
    flavor,
    setFlavor,
    nextButtonRef,
    resetFlavor,
  } = useSelectIngredients()

  const { currentWindow } = useCurrentWindow()
  const THIS_WINDOW = "select-ingredients-pizza-builder"
  useCurrentWindowSetter(THIS_WINDOW)

  useInputAnywhere(
    THIS_WINDOW,
    searchIngredientsRef,
    "#search-pizza-ingredients-builder",
  )

  useMoveAnywhere(
    THIS_WINDOW,
    searchIngredients,
    searchIngredientsRef,
    filteredIngredients,
    hoveredIngredient,
    setHoveredIngredient as Dispatch<SetStateAction<Identifier | undefined>>,
    hoveredIngredientRef,
    ingredientsListRef,
    setIngredient as (item: Identifier) => void,
    [filteredIngredients, flavor, hoveredIngredient, currentWindow],
  )

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

  const { open } = useContrDialog()

  useEffect(() => {
    if (open) {
      setFlavor(resetFlavor())
    }
  }, []) //eslint-disable-line

  return (
    <Flex direction={"column"} gap={"2"} flexGrow={"1"} flexShrink={"1"}>
      <SearchIngredients />
      <Ingredients />
      <BottomIngredients />
    </Flex>
  )
}

export const useSelectIngredients = () => useContext(SelectIngredientsContext)
