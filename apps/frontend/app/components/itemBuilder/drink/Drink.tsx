import { Avatar, Box, Card, Flex, Separator, Text } from "@radix-ui/themes"
import { currency, getDrinkStock, initials, litter, name } from "@td/functions"
import { IDrink } from "@td/types"
import { SelectFlavor } from "./flavors"
import { useDrinkBuilder } from "@/app/context/itemBuilder/Drink"
import { Ref } from "@/app/infra/types/ref"
import { MyAvatar } from "../../MyAvatar"

export const Drink = ({ drink }: { drink: IDrink }) => {
  const { hoveredDrink, hoveredDrinkRef, currentDrinks } = useDrinkBuilder()

  return (
    <SelectFlavor key={drink.id} drink={drink}>
      {({ onClick }) => (
        <Card
          variant="surface"
          id={`drink-${drink.id}`}
          onClick={onClick}
          onContextMenu={(e) => {
            e.preventDefault()
          }}
          onDoubleClick={() => {}}
          ref={
            hoveredDrink?.id === drink.id
              ? (hoveredDrinkRef as Ref<HTMLDivElement>)
              : undefined
          }
          className={`border-2 border-transparent hover:border-gray-6 
                      min-h-[4.5rem] flex p-1 relative shrink-0
                      w-[100%] md:w-[31.99%] lg:ww-[23.99%] lg:w-[18.99%] ${
                        hoveredDrink?.id === drink.id
                          ? "bg-yellow-5"
                          : currentDrinks.map((x) => x.id).includes(drink.id)
                            ? "bg-orange-5 "
                            : ""
                      }`}
        >
          <Flex align={"center"} gap="2" flexGrow={"1"} className="max-w-full ">
            <MyAvatar
              className="h-full"
              src={drink.imageUrl}
              fallback={initials(drink)}
            />
            <Box
              flexGrow={"1"}
              flexBasis={"1"}
              flexShrink={"1"}
              className="min-w-0 max-w-full"
            >
              <Text truncate as="p">
                {name(drink)}
              </Text>
              {drink.flavors?.length && (
                <Flex gap="1" className="overflow-x-auto">
                  <Text truncate as="p" size={"1"} color="gray">
                    {drink.flavors.map((x) => name(x)).join(", ")}
                  </Text>
                </Flex>
              )}
              {(() => {
                const flavorsValues = Array.from(
                  new Set(
                    (drink.flavors ?? []).map((x) => {
                      return x.originalValue || drink.originalValue
                    }),
                  ),
                )

                const flavorsValue =
                  flavorsValues.length > 1 ? Math.min(...flavorsValues) : 0

                const value = flavorsValue
                  ? `${currency(flavorsValue)} +`
                  : currency(drink.originalValue)

                const stock = getDrinkStock(drink)

                return (
                  <Flex gap="1">
                    <Text truncate as="p" size={"1"} color="gray">
                      {value}
                    </Text>
                    <Separator orientation={"vertical"} />
                    <Text truncate as="p" size={"1"} color={"gray"}>
                      {litter(drink.sizeInMl)}
                    </Text>
                    <Separator orientation={"vertical"} />
                    <Text
                      truncate
                      as="p"
                      size={"1"}
                      color={stock < 1 ? "red" : "gray"}
                    >
                      {stock > 0 ? `${stock} und` : "Em falta"}
                    </Text>
                  </Flex>
                )
              })()}
            </Box>
          </Flex>
        </Card>
      )}
    </SelectFlavor>
  )
}
