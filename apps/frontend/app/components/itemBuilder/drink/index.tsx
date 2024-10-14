import { useDrinkBuilder } from "@/app/context/itemBuilder/Drink"
import { Button, Flex, Separator } from "@radix-ui/themes"
import {
  IBuildingDrink,
  Identifier,
  IDrink,
  IOrderItem,
  IOrderItemDrink,
} from "@td/types"
import { Bottom } from "./Bottom"
import { useEffect, useState } from "react"
import { useInputAnywhere } from "@/app/util/hooks/inputAnywhere"
import { Drinks } from "./Drinks"
import { useFuncAnywhere } from "@/app/util/hooks/funcAnywhere"
import { useCurrentWindow } from "@/app/context/CurrentWindow"
import { useCurrentWindowSetter } from "@/app/util/hooks/currentWindowSetter"
import { useItemBuilder } from "../ItemBuilder"
import { DrinkBuilderProvider } from "@/app/context/itemBuilder/Drink"
import { useAddSubtractAnywhere } from "@/app/util/hooks/addSubtractAnywhere"
import { useSelectItem } from "@/app/util/hooks/selectItem"
import { useArrowAnywhere } from "@/app/util/hooks/arrowAnywhere"
import { Multiply } from "../../MultiplyItem"
import { ItemDiscount } from "../Discount"
import { ItemObservations } from "../Observations"
import { ItemSearch } from "../Search"
import { SetState } from "@/app/infra/types/setState"

export const DrinkBuilder = ({
  drink,
  addMultipleItems,
  orderId,
}: {
  drink?: IBuildingDrink | IOrderItemDrink
  addMultipleItems: (items: IOrderItem[]) => void
  orderId: string
}) => {
  return (
    <DrinkBuilderProvider
      defaultDrink={{ ...drink, type: "drink" } as IOrderItemDrink}
      addMultipleItems={addMultipleItems}
      orderId={orderId}
    >
      <DrinkBuilderContent />
    </DrinkBuilderProvider>
  )
}
export const DrinkBuilderContent = () => {
  const {
    currentDrinks,
    drinksListRef,
    filteredCategories,
    hoveredDrink,
    discount,
    setDiscount,
    observations,
    setObservations,
    builder,
    searchDrinks,
    hoveredDrinkRef,
    searchDrinkRef,
    setSearchDrinks,
    addDrinks,
    drinkClick,
    setHoveredDrink,
    isOptionsOpen,
    setIsOptionsOpen,
    nextButtonRef,
  } = useDrinkBuilder()

  const { currentWindow } = useCurrentWindow()

  const THIS_WINDOW = "drink-builder"
  const SEARCH_ID = "search-drinks"
  useCurrentWindowSetter(THIS_WINDOW)

  useInputAnywhere(THIS_WINDOW, searchDrinkRef, "#" + SEARCH_ID)

  const { nextItem, previousItem } = useSelectItem(
    filteredCategories
      .map((x) => x.drinks)
      .flat()
      .filter(Boolean) as Identifier[],
    hoveredDrink,
    setHoveredDrink as SetState<Identifier | undefined>,
    hoveredDrinkRef,
    drinksListRef,
    searchDrinks,
  )

  useArrowAnywhere(
    THIS_WINDOW,
    () => previousItem(),
    () => nextItem(),
    () => drinkClick(hoveredDrink),
    [searchDrinkRef.current],
    [filteredCategories, currentDrinks, hoveredDrink, currentWindow],
  )

  const [multiplyOpen, setMultiplyOpen] = useState(false)

  const openMultiply = () => {
    if (hoveredDrink && !hoveredDrink.flavors?.length) {
      setMultiplyOpen(true)
    }
  }

  useAddSubtractAnywhere(
    THIS_WINDOW,
    () => openMultiply(),
    () => openMultiply(),
    [searchDrinkRef?.current],
    [filteredCategories, currentDrinks, hoveredDrink, currentWindow],
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

  const { setAskToClose, setAskToCloseTitle } = useItemBuilder()

  useEffect(() => {
    setAskToClose(true)
    setAskToCloseTitle("Cancelar adição / edição deste item?")
  }, []) //eslint-disable-line

  return (
    <>
      <div
        className="flex flex-col
      lg:grid grid-cols-[1fr,2px,200px] min-h-0 flex-1 gap-2 select-none"
      >
        <Flex
          direction={"column"}
          gap={"2"}
          flexGrow={"1"}
          minHeight={"0"}
          flexShrink={"1"}
        >
          <ItemSearch
            id={SEARCH_ID}
            search={searchDrinks}
            setSearch={setSearchDrinks}
            searchRef={searchDrinkRef}
          />
          <Drinks />
        </Flex>
        <Separator
          size={"4"}
          orientation={{ initial: "horizontal", lg: "vertical" }}
        />
        <Flex direction={"column"} gap="2">
          <Button
            className={"lg:hidden"}
            variant="ghost"
            onClick={() => setIsOptionsOpen((prev) => !prev)}
          >
            Opções {}
          </Button>
          <Flex
            className={isOptionsOpen ? "" : "max-md:hidden"}
            direction={"column"}
            gap="2"
            flexGrow={"1"}
            flexShrink={"1"}
          >
            <ItemDiscount
              discountString={discount}
              setDiscountString={setDiscount}
              preDiscounts={builder.discounts}
            />
            <ItemObservations
              observations={observations}
              setObservations={setObservations}
              preObservations={["Mandar copos", "Já levou"]}
            />
          </Flex>
          <Bottom />
        </Flex>

        <Multiply
          isOpen={multiplyOpen}
          setIsOpen={setMultiplyOpen}
          onNext={(value) => {
            if (hoveredDrink) {
              const arr: IDrink[] = new Array(value)
              arr.fill(hoveredDrink)
              addDrinks(arr)
            }
          }}
        />
      </div>
    </>
  )
}
