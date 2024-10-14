import { Card, Flex, IconButton, Text } from "@radix-ui/themes"
import {
  currency,
  getFlavorsValueBySize,
  getPizzaFlavorDescription,
} from "@td/functions"
import { MdClose } from "react-icons/md"
import { usePizzaBuilder } from "@/app/context/itemBuilder/Pizza"
import { SelectIngredients } from "./ingredients"

export const SelectedFlavors = () => {
  const { currentPizza, removeFlavor } = usePizzaBuilder()
  return (
    <Card className="py-2">
      <Flex className="gap-3" justify={"center"}>
        {currentPizza.flavors.map((flavor, i) => {
          const { ingredients, name } = getPizzaFlavorDescription(flavor)
          return (
            <Flex
              align={"center"}
              className="bg-gray-5 p-2 rounded-2 gap-2 min-w-28"
              key={flavor.code}
            >
              <SelectIngredients defaultFlavor={flavor}>
                <Flex
                  direction={"column"}
                  align={"start"}
                  justify={"start"}
                  flexGrow={"1"}
                  className="group hover:text-orange-11 "
                >
                  <Text>{name}</Text>
                  <Text
                    className="text-grass-11 group-hover:text-orange-11 scale-75 origin-left"
                    size={"1"}
                  >
                    {!!ingredients?.length && " "}
                    {ingredients?.length ? ` (${ingredients.join(", ")})` : ""}
                  </Text>
                  <Text size={"1"} className="scale-75 origin-left">
                    {currency(
                      getFlavorsValueBySize([flavor], currentPizza.size),
                    )}
                  </Text>
                </Flex>
              </SelectIngredients>
              <IconButton
                size={"1"}
                variant="outline"
                color="red"
                className=""
                onClick={() => removeFlavor(flavor.code)}
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
