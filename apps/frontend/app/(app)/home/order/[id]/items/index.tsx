import { useHome } from "@/app/context/Home"
import { itemsMenu } from "@/app/infra/data/itemsMenu"
import { Flex } from "@radix-ui/themes"
import {
  IBuildingPizzaFlavor,
  IOrderItem,
  IOrderItemDrink,
  IOrderItemOther,
  IOrderItemPizza,
} from "@td/types"
import { Fragment } from "react"
import { ItemPanelButton } from "../../../itemsPanel/ItemPanelButton"
import { Pizza } from "./Pizza"
import { Drink } from "./Drink"
import { toPositive } from "@td/functions/src/calc"
import { getItemValue } from "@td/functions"
import { Other } from "./Other"

export const ItemsBox = () => {
  const {
    currentOrder: currOrderId,
    getCurrentOrder,
    addMultipleItems,
  } = useHome()

  const currentOrder = currOrderId ? getCurrentOrder() : undefined

  if (!currentOrder) return <></>

  const groupItems = () => {
    const _groupedItems: IOrderItem[][] = []

    currentOrder.items.forEach((x) => {
      let i = _groupedItems.findIndex(([y]) => {
        const arr = [
          x.type === y.type,
          y.comboId === x.comboId,
          toPositive(y.createdAt.getTime() - x.createdAt.getTime()) /
            1000 /
            60 <
            2,
          y.discount === x.discount,
          getItemValue(y) === getItemValue(x),
          (y.observations ?? "").trim().toUpperCase() ===
            (x.observations ?? "").trim().toUpperCase(),
          y.steps?.length === x.steps?.length,
        ]

        if (x.type === "pizza" && y.type === "pizza") {
          const formatFlavor = (flavor: IBuildingPizzaFlavor) =>
            `${flavor.id}, ${flavor.modifications
              .map((o) => o.id)
              .sort()
              .join(", ")}`
          const joinFlavors = (flavors: IBuildingPizzaFlavor[]) =>
            flavors.map(formatFlavor).sort().join(", ")
          const xf = joinFlavors(x.flavors)
          const yf = joinFlavors(y.flavors)

          arr.push(xf === yf)
        } else if (x.type === "drink" && y.type === "drink") {
          const sameFlavor = x.flavor?.id === y.flavor?.id
          arr.push(sameFlavor)
        }
        return arr.every(Boolean)
      })

      if (i > -1) {
        _groupedItems[i].push(x)
      } else {
        _groupedItems.push([x])
      }
    })
    return _groupedItems
  }

  const groupedItems: IOrderItem[][] = currentOrder.items.length
    ? groupItems()
    : []

  return (
    <div className="no-scroll flex flex-col gap-1 overflow-auto min-h-0 max-h-full flex-1">
      <Flex
        id="menus"
        gap={"1"}
        justify={"center"}
        overflowX={"auto"}
        className="lg:hidden"
      >
        {itemsMenu.map((item) => (
          <ItemPanelButton
            key={item.name}
            item={item}
            orderId={currentOrder.id}
            addMultipleItems={addMultipleItems}
          />
        ))}
      </Flex>
      {groupedItems.map((x) => (
        // <Item key={x[0].id} items={x} />
        <Fragment key={x[0].id}>
          {x[0].type === "pizza" ? (
            <Pizza pizzas={x as IOrderItemPizza[]} />
          ) : x[0].type === "drink" ? (
            <Drink drinks={x as IOrderItemDrink[]} />
          ) : x[0].type === "other" ? (
            <Other others={x as IOrderItemOther[]} />
          ) : (
            <p>{JSON.stringify(x[0])}</p>
          )}
        </Fragment>
      ))}
    </div>
  )
}
