import { Dialog, Flex, VisuallyHidden } from "@radix-ui/themes"
import {
  IBuildingPizzaFlavor,
  Identifier,
  IPizzaFlavor,
  IPizzaFlavorIngredient,
} from "@td/types"
import { Ingredients } from "./Ingredients"
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { Bottom } from "./Bottom"
import { usePizzaBuilder } from "@/app/context/itemBuilder/Pizza"
import {
  getPizzaIngredientModificationIs,
  getValueBySize,
  objToString,
} from "@td/functions"
import { useInputAnywhere } from "@/app/util/hooks/inputAnywhere"
import { useFuncAnywhere } from "@/app/util/hooks/funcAnywhere"
import { useCurrentWindowSetter } from "@/app/util/hooks/currentWindowSetter"
import { useCurrentWindow } from "@/app/context/CurrentWindow"
import { useArrowAnywhere } from "@/app/util/hooks/arrowAnywhere"
import { useSelectItem } from "@/app/util/hooks/selectItem"
import { SetState } from "@/app/infra/types/setState"
import { Ref } from "@/app/infra/types/ref"
import { ContrDialog, useContrDialog } from "@/app/components/ControlledDialog"
import { ItemSearch } from "@/app/components/itemBuilder/Search"

interface ISelectIngredientsContext {
  flavor: IBuildingPizzaFlavor
  setFlavor: SetState<IBuildingPizzaFlavor>

  searchIngredients: string
  setSearchIngredients: SetState<string>
  searchIngredientsRef: Ref<HTMLInputElement | undefined>

  setIngredient: (ingredient: IPizzaFlavorIngredient) => void

  nextButtonRef: Ref<HTMLButtonElement | undefined>
  hoveredIngredient: IPizzaFlavorIngredient | undefined
  setHoveredIngredient: SetState<IPizzaFlavorIngredient | undefined>

  hoveredIngredientRef: Ref<HTMLDivElement | undefined>
  ingredientsListRef: Ref<HTMLDivElement | undefined>

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
    const { isDefault, isWithout, isModification } =
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
      </ContrDialog>
    </SelectIngredientsContext.Provider>
  )
}

const SelectIngredientsComponent = () => {
  const {
    searchIngredients,
    setSearchIngredients,
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
  const SEARCH_ID = "search-pizza-ingredients"
  useCurrentWindowSetter(THIS_WINDOW)

  useInputAnywhere(THIS_WINDOW, searchIngredientsRef, "#" + SEARCH_ID)

  const { nextItem: nextIngredient, previousItem: previousIngredient } =
    useSelectItem(
      filteredIngredients.filter(Boolean) as Identifier[],
      hoveredIngredient,
      setHoveredIngredient as SetState<Identifier | undefined>,
      hoveredIngredientRef,
      ingredientsListRef,
      searchIngredients,
    )

  useArrowAnywhere(
    THIS_WINDOW,
    () => previousIngredient(),
    () => nextIngredient(),
    () => {
      if (hoveredIngredient) setIngredient(hoveredIngredient)
    },
    [searchIngredientsRef.current],
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

  useEffect(() => {
    setSearchIngredients("")
  }, [flavor]) //eslint-disable-line

  return (
    <Flex direction={"column"} gap={"2"} flexGrow={"1"} flexShrink={"1"}>
      <ItemSearch
        id={SEARCH_ID}
        search={searchIngredients}
        setSearch={setSearchIngredients}
        searchRef={searchIngredientsRef}
      />
      <Ingredients />
      <Bottom />
    </Flex>
  )
}

export const useSelectIngredients = () => useContext(SelectIngredientsContext)
