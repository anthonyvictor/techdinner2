import { Item } from "@/app/components/order/Item"
import { useHome } from "@/app/context/Home"
import { Box, Flex } from "@radix-ui/themes"
import { getCustomerName } from "@td/functions"
import { applyDiscount, toPositive } from "@td/functions/src/calc"
import { currency } from "@td/functions/src/format"
import { IBuildingPizzaFlavor, IOrderItem } from "@td/types"
import { useEffect, useState } from "react"

export const ItemsBox = () => {
  const { currentOrder } = useHome()

  // const [groupedItems, setGroupedItems] = useState<IOrderItem[][]>([]);

  // useEffect(() => {
  //   const _groupedItems: IOrderItem[][] = [];

  //   currentOrder.items.forEach((x) => {
  //     let i = _groupedItems.findIndex(([y]) => {
  //       const arr = [
  //         x.type === y.type,
  //         y.comboId === x.comboId,
  //         toPositive(y.createdAt.getTime() - x.createdAt.getTime()) /
  //           1000 /
  //           60 <
  //           2,
  //         y.discount === x.discount,
  //         y.initialValue === x.initialValue,
  //         (y.observations ?? "").trim().toUpperCase() ===
  //           (x.observations ?? "").trim().toUpperCase(),
  //         y.steps?.length === x.steps?.length,
  //       ];
  //       return arr.every(Boolean);
  //     });
  //     if (i > -1) {
  //       _groupedItems[i].push(x);
  //     } else {
  //       _groupedItems.push([x]);
  //     }
  //   });

  //   setGroupedItems(_groupedItems);
  // }, []); //eslint-disable-line

  // const groupedItems:IOrderItem[][] = currentOrder.items.length ?
  // currentOrder.items.reduce(() => {
  //   let i = _groupedItems.findIndex(([y]) => {
  //     const arr = [
  //       x.type === y.type,
  //       y.comboId === x.comboId,
  //       toPositive(y.createdAt.getTime() - x.createdAt.getTime()) /
  //         1000 /
  //         60 <
  //         2,
  //       y.discount === x.discount,
  //       y.initialValue === x.initialValue,
  //       (y.observations ?? "").trim().toUpperCase() ===
  //         (x.observations ?? "").trim().toUpperCase(),
  //       y.steps?.length === x.steps?.length,
  //     ];
  //     return arr.every(Boolean);
  //   });
  //   if (i > -1) {
  //     _groupedItems[i].push(x);
  //   } else {
  //     _groupedItems.push([x]);
  //   }
  // });
  // : []

  // const groupedItems: IOrderItem[][] = currentOrder.items.length
  //   ? currentOrder.items.reduce((acc: IOrderItem, x) => {
  //       let i = acc.findIndex(([y]) => {
  //         const arr = [
  //           x.type === y.type,
  //           y.comboId === x.comboId,
  //           toPositive(y.createdAt.getTime() - x.createdAt.getTime()) /
  //             1000 /
  //             60 <
  //             2,
  //           y.discount === x.discount,
  //           y.initialValue === x.initialValue,
  //           (y.observations ?? "").trim().toUpperCase() ===
  //             (x.observations ?? "").trim().toUpperCase(),
  //           y.steps?.length === x.steps?.length,
  //         ];
  //         return arr.every(Boolean);
  //       });
  //       if (i > -1) {
  //         acc[i].push(x);
  //       } else {
  //         acc.push([x]);
  //       }

  //       return acc;
  //     })
  //   : [];

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
          y.initialValue === x.initialValue,
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
    <div className="no-scroll flex flex-col gap-2 overflow-auto px-1 min-h-0 max-h-full flex-1">
      {groupedItems.map((x) => (
        <Item key={x[0].id} items={x} />
      ))}
    </div>
  )
}
