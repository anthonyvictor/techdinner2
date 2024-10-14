import { ContrDialog } from "@/app/components/ControlledDialog"
import { DrinkBuilder } from "@/app/components/itemBuilder/drink"
import { ItemBuilder } from "@/app/components/itemBuilder/ItemBuilder"
import { MyAvatar } from "@/app/components/MyAvatar"
import { useHome } from "@/app/context/Home"
import { Avatar, Card, Flex, Strong, Text } from "@radix-ui/themes"
import { getDrinkStock, getDrinkValue } from "@td/functions"
import { currency, name } from "@td/functions/src/format"
import { IBuildingDrink, IOrderItemDrink } from "@td/types"
import { FaWineBottle } from "react-icons/fa"

export const Drink = ({
  drink,
}: {
  drink: IBuildingDrink | IOrderItemDrink
}) => {
  const { currentOrder, addMultipleItems } = useHome()
  return (
    <ContrDialog
      trigger={
        <Card key={drink.id} asChild className="p-2 shrink-0">
          <button>
            <Flex
              className="shrink-0 min-w-max
              items-center gap-2 h-12"
            >
              <MyAvatar
                src={drink.imageUrl}
                fallback={<FaWineBottle />}
                style={{
                  height: "100%",
                  minHeight: "0",
                }}
              />
              <Flex
                direction={"column"}
                gap="1"
                flexGrow={"0"}
                maxWidth={"100%"}
                minWidth={"0"}
              >
                <Text>
                  <Strong>{name(drink)}</Strong>
                </Text>
                <Text size="1" color="gray">
                  {drink.flavor && `${name(drink.flavor)} | `}
                  {currency(getDrinkValue(drink))}
                  {` | `}
                  {(() => {
                    const stock = getDrinkStock(drink)
                    return (
                      <Text
                        color={
                          stock === 0 ? "red" : stock < 3 ? "orange" : undefined
                        }
                      >
                        {stock} und
                      </Text>
                    )
                  })()}
                </Text>
              </Flex>
            </Flex>
          </button>
        </Card>
      }
    >
      <ItemBuilder>
        <DrinkBuilder
          drink={drink}
          orderId={currentOrder ?? ""}
          addMultipleItems={addMultipleItems}
        />
      </ItemBuilder>
    </ContrDialog>
  )
}
