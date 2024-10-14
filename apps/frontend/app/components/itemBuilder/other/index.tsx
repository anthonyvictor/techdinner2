import {
  useOtherBuilder,
  OtherBuilderProvider,
} from "@/app/context/itemBuilder/Other"
import { Button, Flex, Separator } from "@radix-ui/themes"
import {
  IBuildingOther,
  Identifier,
  IOther,
  IOrderItem,
  IOrderItemOther,
} from "@td/types"
import { Bottom } from "./Bottom"
import { useEffect, useState } from "react"
import { useInputAnywhere } from "@/app/util/hooks/inputAnywhere"
import { Others } from "./Others"
import { useFuncAnywhere } from "@/app/util/hooks/funcAnywhere"
import { useCurrentWindow } from "@/app/context/CurrentWindow"
import { useCurrentWindowSetter } from "@/app/util/hooks/currentWindowSetter"
import { useItemBuilder } from "../ItemBuilder"
import { useAddSubtractAnywhere } from "@/app/util/hooks/addSubtractAnywhere"
import { useSelectItem } from "@/app/util/hooks/selectItem"
import { useArrowAnywhere } from "@/app/util/hooks/arrowAnywhere"
import { Multiply } from "../../MultiplyItem"
import { ItemDiscount } from "../Discount"
import { ItemObservations } from "../Observations"
import { ItemSearch } from "../Search"
import { SetState } from "@/app/infra/types/setState"

export const OtherBuilder = ({
  other,
  addMultipleItems,
  orderId,
}: {
  other?: IBuildingOther | IOrderItemOther
  addMultipleItems: (items: IOrderItem[]) => void
  orderId: string
}) => {
  return (
    <OtherBuilderProvider
      defaultOther={{ ...other, type: "other" } as IOrderItemOther}
      addMultipleItems={addMultipleItems}
      orderId={orderId}
    >
      <OtherBuilderContent />
    </OtherBuilderProvider>
  )
}
export const OtherBuilderContent = () => {
  const {
    currentOthers,
    othersListRef,
    filteredCategories,
    hoveredOther,
    discount,
    setDiscount,
    observations,
    setObservations,
    builder,
    searchOthers,
    hoveredOtherRef,
    searchOtherRef,
    setSearchOthers,
    addOthers,
    otherClick,
    setHoveredOther,
    isOptionsOpen,
    setIsOptionsOpen,
    nextButtonRef,
  } = useOtherBuilder()

  const { currentWindow } = useCurrentWindow()

  const THIS_WINDOW = "other-builder"
  const SEARCH_ID = "search-others"
  useCurrentWindowSetter(THIS_WINDOW)

  useInputAnywhere(THIS_WINDOW, searchOtherRef, "#" + SEARCH_ID)

  const { nextItem, previousItem } = useSelectItem(
    filteredCategories
      .map((x) => x.others)
      .flat()
      .filter(Boolean) as Identifier[],
    hoveredOther,
    setHoveredOther as SetState<Identifier | undefined>,
    hoveredOtherRef,
    othersListRef,
    searchOthers,
  )

  useArrowAnywhere(
    THIS_WINDOW,
    () => previousItem(),
    () => nextItem(),
    () => otherClick(hoveredOther),
    [searchOtherRef.current],
    [filteredCategories, currentOthers, hoveredOther, currentWindow],
  )

  const [multiplyOpen, setMultiplyOpen] = useState(false)

  const openMultiply = () => {
    if (hoveredOther && !hoveredOther.variations?.length) {
      setMultiplyOpen(true)
    }
  }

  useAddSubtractAnywhere(
    THIS_WINDOW,
    () => openMultiply(),
    () => openMultiply(),
    [searchOtherRef?.current],
    [filteredCategories, currentOthers, hoveredOther, currentWindow],
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
      <Flex
        direction={"column"}
        className="max-w-full min-h-0 flex-1 gap-2 select-none
        lg:grid grid-cols-[1fr,2px,200px]"
      >
        <Flex className="flex-col gap-2 flex-1 min-h-0 min-w-0">
          <ItemSearch
            id={SEARCH_ID}
            search={searchOthers}
            setSearch={setSearchOthers}
            searchRef={searchOtherRef}
          />
          <Others />
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
            if (hoveredOther) {
              const arr: IOther[] = new Array(value)
              arr.fill(hoveredOther)
              addOthers(arr)
            }
          }}
        />
      </Flex>
    </>
  )
}
