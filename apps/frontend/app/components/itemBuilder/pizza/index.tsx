import {
  PizzaBuilderProvider,
  usePizzaBuilder,
} from "@/app/context/itemBuilder/Pizza"
import { Button, Flex, Separator } from "@radix-ui/themes"
import {
  IBuildingPizza,
  Identifier,
  IOrderItem,
  IOrderItemPizza,
  IPizzaCrust,
  IPizzaDoughBakingLevel,
  IPizzaDoughThickness,
  IPizzaDoughType,
} from "@td/types"
import { Extras } from "./Extras"
import { Bottom } from "./Bottom"
import { Sizes } from "./Sizes"
import { useEffect } from "react"
import { useInputAnywhere } from "@/app/util/hooks/inputAnywhere"
import { Flavors } from "./Flavors"
import { useFuncAnywhere } from "@/app/util/hooks/funcAnywhere"
import { useCurrentWindow } from "@/app/context/CurrentWindow"
import { useCurrentWindowSetter } from "@/app/util/hooks/currentWindowSetter"
import { useItemBuilderPage } from "../ItemBuilder"
import { useSelectItem } from "@/app/util/hooks/selectItem"
import { useArrowAnywhere } from "@/app/util/hooks/arrowAnywhere"
import { useAddSubtractAnywhere } from "@/app/util/hooks/addSubtractAnywhere"
import { ItemDiscount } from "../Discount"
import { ItemObservations } from "../Observations"
import { ItemSearch } from "../Search"
import { SetState } from "@/app/infra/types/setState"
import { ItemSelect } from "../Select"
import { IPromoItem, IPromoItemPizza } from "@td/types/src/promo"
import { useItemBuilder } from "@/app/context/itemBuilder"

export const PizzaBuilder = ({
  pizza,
  orderId,
}: {
  pizza?: IBuildingPizza
  orderId: string
}) => {
  return (
    <PizzaBuilderProvider
      defaultPizza={{ ...pizza, type: "pizza" } as IOrderItemPizza}
      orderId={orderId}
    >
      <PizzaBuilderContent />
    </PizzaBuilderProvider>
  )
}
export const PizzaBuilderContent = () => {
  const {
    setSize,
    builder,
    currentPizza,
    sizesListRef,
    searchFlavors,
    setSearchFlavors,
    searchFlavorRef,
    hoveredFlavor,
    filteredGroups,
    setHoveredFlavor,
    hoveredFlavorRef,
    flavorsListRef,
    currentSizeRef,
    addFlavor,
    isOptionsOpen,
    setIsOptionsOpen,
    nextButtonRef,
    setObservations,
    setDiscount,
    setCrust,
    setDoughBakingLevel,
    setDoughThickness,
    setDoughType,
  } = usePizzaBuilder()

  const { currentWindow } = useCurrentWindow()

  const THIS_WINDOW = "pizza-builder"
  const SEARCH_ID = "search-pizza-flavors"
  useCurrentWindowSetter(THIS_WINDOW)

  useInputAnywhere(THIS_WINDOW, searchFlavorRef, "#" + SEARCH_ID)

  useAddSubtractAnywhere(
    THIS_WINDOW,
    () => nextSize(),
    () => previousSize(),
    [searchFlavorRef?.current],
    [currentPizza.size, builder.sizes, currentWindow],
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

  const { nextItem: nextFlavor, previousItem: previousFlavor } = useSelectItem(
    filteredGroups
      .map((x) => x.flavors)
      .flat()
      .filter(Boolean) as Identifier[],
    hoveredFlavor,
    setHoveredFlavor as SetState<Identifier | undefined>,
    hoveredFlavorRef,
    flavorsListRef,
    searchFlavors,
  )

  const { nextItem: nextSize, previousItem: previousSize } = useSelectItem(
    builder.sizes.filter(Boolean) as Identifier[],
    currentPizza.size,
    setSize as SetState<Identifier | undefined>,
    currentSizeRef,
    sizesListRef,
    "",
  )

  useArrowAnywhere(
    THIS_WINDOW,
    () => previousFlavor(),
    () => nextFlavor(),
    () => {
      if (hoveredFlavor) addFlavor(hoveredFlavor)
    },
    [searchFlavorRef.current],
    [filteredGroups, currentPizza, hoveredFlavor, currentWindow],
  )

  const { setAskToClose, setAskToCloseTitle } = useItemBuilderPage()
  const { currentPromoBuilder } = useItemBuilder()

  useEffect(() => {
    if (!currentPromoBuilder) {
      setAskToClose(true)
      setAskToCloseTitle("Cancelar adição / edição deste item?")
    }
  }, []) //eslint-disable-line

  return (
    <>
      <div
        className="flex flex-col flex-1 gap-2 select-none
        lg:grid grid-cols-[1fr,2px,200px] min-h-0"
      >
        <Flex
          direction={"column"}
          gap={"2"}
          flexGrow={"1"}
          minHeight={"0"}
          flexShrink={"1"}
        >
          <Sizes />
          <ItemSearch
            id={SEARCH_ID}
            search={searchFlavors}
            setSearch={setSearchFlavors}
            searchRef={searchFlavorRef}
          />
          <Flavors />
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
            <ItemSelect
              label="Borda"
              items={builder.crusts}
              value={currentPizza.crust?.id}
              setValue={(value) =>
                setCrust(
                  builder.crusts.find((x) => x.id === value) as IPizzaCrust,
                )
              }
            />

            <ItemSelect
              label="Ponto da massa"
              items={builder.doughBakingLevels}
              value={currentPizza.dough?.bakingLevel?.id}
              setValue={(value) =>
                setDoughBakingLevel(
                  builder.doughBakingLevels.find(
                    (x) => x.id === value,
                  ) as IPizzaDoughBakingLevel,
                )
              }
            />

            <ItemSelect
              label="Grossura da massa"
              items={builder.doughThicknesses}
              value={currentPizza.dough?.thickness?.id}
              setValue={(value) =>
                setDoughThickness(
                  builder.doughThicknesses.find(
                    (x) => x.id === value,
                  ) as IPizzaDoughThickness,
                )
              }
            />

            <ItemSelect
              label="Tipo da massa"
              items={builder.doughTypes}
              value={currentPizza.dough?.type?.id}
              setValue={(value) =>
                setDoughType(
                  builder.doughTypes.find(
                    (x) => x.id === value,
                  ) as IPizzaDoughType,
                )
              }
            />

            <Extras />
            <ItemDiscount
              discountString={currentPizza.discount}
              setDiscountString={setDiscount}
              preDiscounts={builder.discounts}
            />
            <ItemObservations
              observations={currentPizza.observations}
              setObservations={setObservations}
              preObservations={["Cortar em + fatias", "Mandar condimentos"]}
            />
          </Flex>
          <Bottom />
        </Flex>
      </div>
    </>
  )
}
