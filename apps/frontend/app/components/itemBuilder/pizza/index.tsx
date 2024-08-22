import {
  PizzaBuilderProvider,
  usePizzaBuilder,
} from "@/app/context/itemBuilder/Pizza"
import { Button, Flex, Separator, Text } from "@radix-ui/themes"
import {
  IBuildingPizza,
  IBuildingPizzaFlavor,
  Identifier,
  IOrderItemPizza,
  IPizza,
} from "@td/types"
import { Crust } from "./Crust"
import { DoughThickness } from "./DoughThickness"
import { DoughType } from "./DoughType"
import { Extras } from "./Extras"
import { Bottom } from "./Bottom"
import { Observations } from "./Observations"
import { Sizes } from "./Sizes"
import { SearchFlavors } from "./SearchFlavors"
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
} from "react"
import { useInputAnywhere } from "@/app/util/hooks/inputAnywhere"
import { Flavors } from "./Flavors"
import { useMoveAnywhere } from "@/app/util/hooks/moveAnywhere"
import { useAddSubtractAnywhere } from "@/app/util/hooks/addSubtractAnywhere"
import { useFuncAnywhere } from "@/app/util/hooks/funcAnywhere"
import { useCurrentWindow } from "@/app/context/CurrentWindow"
import { useCurrentWindowSetter } from "@/app/util/hooks/currentWindowSetter"
import { Discount } from "./Discount"
import { useItemBuilder } from "../ItemBuilder"
import { DoughBakingLevel } from "./DoughBakingLevel"

export const PizzaBuilder = ({ pizza }: { pizza?: IBuildingPizza }) => {
  return (
    <PizzaBuilderProvider
      defaultPizza={{ ...pizza, type: "pizza" } as IOrderItemPizza}
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
    searchFlavors,
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
  } = usePizzaBuilder()

  const { currentWindow } = useCurrentWindow()

  const THIS_WINDOW = "pizza-builder"
  useCurrentWindowSetter(THIS_WINDOW)

  useInputAnywhere(
    THIS_WINDOW,
    searchFlavorRef,
    "#search-pizza-flavors-builder",
  )

  useMoveAnywhere(
    THIS_WINDOW,
    searchFlavors,
    searchFlavorRef,
    filteredGroups.map((x) => x.flavors).flat(),
    hoveredFlavor,
    setHoveredFlavor as Dispatch<SetStateAction<Identifier | undefined>>,
    hoveredFlavorRef,
    flavorsListRef,
    addFlavor as (item: Identifier) => void,
    [filteredGroups, currentPizza, hoveredFlavor, currentWindow],
  )

  useAddSubtractAnywhere(
    THIS_WINDOW,
    searchFlavorRef,
    builder.sizes,
    currentPizza.size,
    setSize as (item: Identifier | undefined) => void,
    currentSizeRef,
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

  const { setAskToClose, setAskToCloseTitle } = useItemBuilder()

  useEffect(() => {
    setAskToClose(true)
    setAskToCloseTitle("Cancelar adição / edição desta pizza?")
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
          <Sizes />
          <SearchFlavors />
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
            <Crust />
            <DoughBakingLevel />
            <DoughThickness />
            <DoughType />
            <Text size="1">Extras:</Text>
            <Extras />
            <Discount />
            <Observations />
          </Flex>
          <Bottom />
        </Flex>
      </div>
    </>
  )
}
