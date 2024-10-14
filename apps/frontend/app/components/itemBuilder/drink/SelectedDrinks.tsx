import { Avatar, Card, Flex, IconButton, Text } from "@radix-ui/themes"
import { currency, getDrinkValue, initials, name } from "@td/functions"
import { IBuildingDrink } from "@td/types"
import { MdClose } from "react-icons/md"
import { MyAvatar } from "../../MyAvatar"

export const SelectedDrinks = ({
  groups,
  removeDrink,
  onlyFlavor,
}: {
  groups: IBuildingDrink[][]
  removeDrink: (drinkCode: string) => void
  onlyFlavor?: boolean
}) => {
  return (
    <Card className="py-2" size={"1"}>
      <Flex className="gap-3" justify={"center"} overflowX={"auto"}>
        {groups.map((group) => {
          const drink = group[0]
          return (
            <Flex
              align={"center"}
              className="bg-gray-5 p-2 rounded-2 gap-2 min-w-28 whitespace-nowrap"
              key={drink.code}
            >
              <MyAvatar
                className="h-full"
                src={drink.imageUrl}
                fallback={initials(drink)}
              />
              <Flex
                direction={"column"}
                align={"start"}
                justify={"start"}
                flexGrow={"1"}
                className="group hover:text-orange-11 "
              >
                {!onlyFlavor && (
                  <Text>
                    {group.length > 1 ? `${group.length}x - ` : ""}
                    {name(drink)}
                  </Text>
                )}
                {drink.flavor && (
                  <Text
                    className="text-grass-11 group-hover:text-orange-11 scale-75 origin-left"
                    size={onlyFlavor ? "3" : "1"}
                  >
                    {onlyFlavor && group.length > 1
                      ? `${group.length}x - `
                      : ""}
                    {name(drink.flavor)}
                  </Text>
                )}
                <Text size={"1"} className="scale-75 origin-left">
                  {currency(getDrinkValue(drink) * group.length)}
                </Text>
              </Flex>
              <IconButton
                size={"1"}
                variant="outline"
                color="red"
                className=""
                onClick={() => {
                  removeDrink(drink.code)
                }}
              >
                <MdClose />
              </IconButton>
            </Flex>
          )
        })}
      </Flex>
    </Card>
  )
}
