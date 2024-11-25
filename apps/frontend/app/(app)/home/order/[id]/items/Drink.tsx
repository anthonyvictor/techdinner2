import { ContrDialog } from "@/app/components/ControlledDialog"
import { DrinkBuilder } from "@/app/components/itemBuilder/drink"
import { ItemBuilderPage } from "@/app/components/itemBuilder/ItemBuilder"
import { MyAvatar } from "@/app/components/MyAvatar"
import { MyCard } from "@/app/components/MyCard"
import { Name } from "@/app/components/order/item/Name"
import { Observations } from "@/app/components/order/item/Observations"
import { Price } from "@/app/components/order/item/Price"
import { useOrders } from "@/app/context/Orders"
import { Flex, Text } from "@radix-ui/themes"
import { getDrinkValue } from "@td/functions"
import { getDiscountValue } from "@td/functions/src/calc"
import { name } from "@td/functions/src/format"
import { IOrderItemDrink } from "@td/types"
import { FaWineBottle } from "react-icons/fa"

export const Drink = ({ drinks }: { drinks: IOrderItemDrink[] }) => {
  const { currentOrder } = useOrders()

  const drink = drinks[0]
  return (
    <ContrDialog
      trigger={
        <>
          <MyCard>
            <Flex className="shrink-0 min-w-max items-center gap-2 h-12">
              <MyAvatar
                src={drink.imageUrl}
                fallback={<FaWineBottle />}
                className="h-full min-h-0"
              />
              <Flex
                direction={"column"}
                align={"start"}
                flexGrow={"0"}
                maxWidth={"100%"}
                minWidth={"0"}
              >
                <Name item={drink} amount={drinks.length} />
                <Text size="1" color="gray" align={"left"}>
                  {!!drink.flavor && <Text>{`${name(drink.flavor)}`}</Text>}
                  <Observations item={drink} />
                  <Price
                    value={getDrinkValue(drink) * drinks.length}
                    discount={drinks.reduce(
                      (acc, curr) =>
                        acc +
                        getDiscountValue(getDrinkValue(curr), curr.discount),
                      0,
                    )}
                  />
                </Text>
              </Flex>
            </Flex>
          </MyCard>
        </>
      }
    >
      <ItemBuilderPage>
        <DrinkBuilder drink={drink} orderId={currentOrder ?? ""} />
      </ItemBuilderPage>
    </ContrDialog>
  )
}
