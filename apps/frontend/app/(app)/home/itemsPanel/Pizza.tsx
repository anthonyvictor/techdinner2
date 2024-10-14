import { ContrDialog } from "@/app/components/ControlledDialog"
import { ItemBuilder } from "@/app/components/itemBuilder/ItemBuilder"
import { PizzaBuilder } from "@/app/components/itemBuilder/pizza"
import { PizzaOptions } from "@/app/components/pizza/Options"
import { useHome } from "@/app/context/Home"
import { Card, Flex, Strong, Text } from "@radix-ui/themes"
import { getPizzaValue, getValueBySize } from "@td/functions"
import { currency, name } from "@td/functions/src/format"
import { IBuildingPizza, IOrderItemPizza, IPizzaSize } from "@td/types"

export const Pizza = ({
  pizza,
}: {
  pizza: IBuildingPizza | IOrderItemPizza
}) => {
  const { addMultipleItems, currentOrder } = useHome()

  return (
    <ContrDialog
      trigger={
        <Card key={pizza.id} asChild className={`p-2 shrink-0 grow`}>
          <button>
            <Flex
              className={`shrink-0 grow items-center gap-2 min-h-full ${pizza.flavors.length >= 3 ? "min-w-48" : "min-w-32"}`}
            >
              <Flex direction={"column"} flexGrow={"1"}>
                <Text size={"2"}>
                  <Strong>{`Pizza ${name(pizza.size as IPizzaSize)}`}</Strong>
                </Text>
                <Text size={"1"} weight={"light"} trim={"start"} color="gray">
                  <Text>{currency(getPizzaValue(pizza))}</Text>
                  {" | "}
                  <Text>
                    {pizza.flavors
                      .map((flavor) => `${name(flavor)}`)
                      .join(", ")}
                  </Text>
                </Text>
                <Flex gap="1" wrap={"nowrap"}>
                  <PizzaOptions pizza={pizza} />
                </Flex>
              </Flex>
            </Flex>
          </button>
        </Card>
      }
    >
      <ItemBuilder>
        <PizzaBuilder
          pizza={pizza}
          orderId={currentOrder ?? ""}
          addMultipleItems={addMultipleItems}
        />
      </ItemBuilder>
    </ContrDialog>
  )
}
