"use client"
import { itemsMenu } from "@/app/infra/data/itemsMenu"
import {
  AlertDialog,
  Button,
  Dialog,
  Flex,
  Text,
  VisuallyHidden,
} from "@radix-ui/themes"
import {
  IDrink,
  IPizza,
  IOther,
  ICombo,
  IBuildingPizza,
  IOrderItem,
  IBuildingDrink,
  IBuildingOther,
  IBuildingPromo,
} from "@td/types"
import { ReactNode, useEffect, useState } from "react"
import { ItemsContainer } from "./Container"
import { Drink } from "./Drink"
import { Pizza } from "./Pizza"
import { Other } from "./Other"
import { Promo } from "./Promo"
import { api } from "@/app/infra/util/api"
import { ItemBuilder } from "@/app/components/itemBuilder/ItemBuilder"
import { ContrDialog } from "@/app/components/ControlledDialog"
import { ItemPanelButton } from "./ItemPanelButton"

interface IItems {
  pizzas: IBuildingPizza[]
  drinks: IBuildingDrink[]
  others: IBuildingOther[]
  promos: IBuildingPromo[]
}
export const ItemsPanel = ({
  orderId,
  addMultipleItems,
}: {
  addMultipleItems: (items: IOrderItem[]) => void
  orderId: string
}) => {
  const [items, setItems] = useState<IItems>({
    pizzas: [],
    drinks: [],
    others: [],
    promos: [],
  })

  useEffect(() => {
    ;(async () => {
      const result = await api(`items-panel`)
      // fetch("/api/items-panel");
      if (result.ok) {
        const data = await result.json()
        setItems(data)
      }
    })()
  }, [])
  return (
    <div
      className="flex flex-col 
    flex-grow shrink w-0 gap-2"
    >
      <Flex
        id="menus"
        gap={"2"}
        p={"1"}
        justify={"center"}
        overflowX={"auto"}
        overflowY={"hidden"}
      >
        {itemsMenu.map((item) => (
          <ItemPanelButton
            key={item.name}
            item={item}
            orderId={orderId}
            addMultipleItems={addMultipleItems}
          />
        ))}
      </Flex>
      <ItemsContainer>
        {(
          items.pizzas.map((pizza, i) => {
            const r = i % 2 === 0 ? [pizza, items.pizzas[i + 1]] : []
            return r
          }, [] as IBuildingPizza[]) as unknown as IBuildingPizza[][]
        )
          .filter((x) => {
            return x.length > 0
          })
          .map((pizzas) => {
            const Wrapper = ({ children }: { children: ReactNode[] }) =>
              pizzas[1]?.id ? (
                <Flex direction={"column"} gap="2">
                  {children}
                </Flex>
              ) : (
                <Flex
                  direction={"column"}
                  gap="2"
                  flexGrow={"0"}
                  height={"50%"}
                >
                  {children}
                </Flex>
              )

            return (
              <Wrapper
                key={pizzas.reduce(
                  (acc, pizza) => `${acc}-${pizza?.id ?? "x"}`,
                  "",
                )}
              >
                <Pizza key={pizzas[0].id} pizza={pizzas[0]} />
                {pizzas[1] && <Pizza key={pizzas[1].id} pizza={pizzas[1]} />}
              </Wrapper>
            )
          })}
      </ItemsContainer>
      <ItemsContainer>
        {(
          items.drinks.map((drink, i) => {
            const r = i % 2 === 0 ? [drink, items.drinks[i + 1]] : []
            return r
          }, [] as IBuildingDrink[]) as unknown as IBuildingDrink[][]
        )
          .filter((x) => {
            return x.length > 0
          })
          .map((drinks) => (
            <Flex
              direction={"column"}
              gap="2"
              key={drinks.reduce(
                (acc, drink) => `${acc}-${drink?.id ?? "x"}`,
                "",
              )}
            >
              <Drink key={drinks[0].id} drink={drinks[0]} />
              {drinks[1] && <Drink key={drinks[1].id} drink={drinks[1]} />}
            </Flex>
          ))}
      </ItemsContainer>
      <ItemsContainer>
        {(
          items.others.map((other, i) => {
            const r = i % 2 === 0 ? [other, items.others[i + 1]] : []
            return r
          }, [] as IBuildingOther[]) as unknown as IBuildingOther[][]
        )
          .filter((x) => {
            return x.length > 0
          })
          .map((others) => (
            <Flex
              direction={"column"}
              gap="2"
              key={others.reduce(
                (acc, other) => `${acc}-${other?.id ?? "x"}`,
                "",
              )}
            >
              <Other key={others[0].id} other={others[0]} />
              {others[1] && <Other key={others[1].id} other={others[1]} />}
            </Flex>
          ))}
      </ItemsContainer>
      <ItemsContainer>
        {items.promos.map((promo) => (
          <Promo key={promo.id} promo={promo} />
        ))}
      </ItemsContainer>
      {/* <ItemsContainer></ItemsContainer> */}
      {/* <ItemsContainer></ItemsContainer> */}
    </div>
  )
}
