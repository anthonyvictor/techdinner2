import { ContrDialog } from "@/app/components/ControlledDialog"
import { ItemBuilderPage } from "@/app/components/itemBuilder/ItemBuilder"
import { PizzaBuilder } from "@/app/components/itemBuilder/pizza"
import { Name } from "@/app/components/order/item/Name"
import { Price } from "@/app/components/order/item/Price"
import { PizzaOptions } from "@/app/components/pizza/Options"
import { useOrders } from "@/app/context/Orders"
import { Card, Flex, Text } from "@radix-ui/themes"
import { getPizzaValue } from "@td/functions"
import { getDiscountValue } from "@td/functions/src/calc"
import { name } from "@td/functions/src/format"
import { IOrderItemPizza } from "@td/types"

export const Pizza = ({ pizzas }: { pizzas: IOrderItemPizza[] }) => {
  const { currentOrder } = useOrders()

  const pizza = pizzas[0]

  const value = getPizzaValue(pizza)
  const discount = getDiscountValue(value, pizza.discount)

  return (
    <ContrDialog
      trigger={
        <Card key={pizza.id} asChild className={`p-2 py-3 shrink-0`}>
          <button>
            <Flex
              className={`shrink-0 grow items-center gap-2 min-h-full ${pizza.flavors.length >= 3 ? "min-w-48" : "min-w-32"}`}
            >
              <Flex direction={"column"} flexGrow={"1"}>
                <Text trim={"both"}>
                  <Name
                    item={`Pizza ${pizza.size.fullName}`}
                    amount={pizzas.length}
                  />
                  <Text as="p" size={"1"} weight={"light"} color="gray">
                    {pizza.flavors
                      .map((flavor) => `${name(flavor)}`)
                      .join(", ")}
                  </Text>
                  <PizzaOptions pizza={pizza} />

                  <Price value={value} discount={discount} />
                </Text>
              </Flex>
            </Flex>
          </button>
        </Card>
      }
    >
      <ItemBuilderPage>
        <PizzaBuilder pizza={pizza} orderId={currentOrder ?? ""} />
      </ItemBuilderPage>
    </ContrDialog>
  )
}
