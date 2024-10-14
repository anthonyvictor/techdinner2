import { Text } from "@radix-ui/themes"
import { name } from "@td/functions"
import { IBuildingPizza } from "@td/types"

export const PizzaOptions = ({ pizza }: { pizza: IBuildingPizza }) => {
  const arr = [
    !pizza.crust.isDefault ? `${name(pizza.crust)}` : "",
    !pizza.dough.thickness.isDefault ? `${name(pizza.dough.thickness)}` : "",
    !pizza.dough.type.isDefault ? `${name(pizza.dough.type)}` : "",
    !pizza.dough.bakingLevel.isDefault
      ? `${name(pizza.dough.bakingLevel)}`
      : "",
    pizza.extras?.length
      ? `Extras: ${pizza.extras.map((x) => name(x)).join(", ")}`
      : "",
  ].filter(Boolean)
  return (
    <Text size={"1"} color="gray" wrap={"nowrap"}>
      {arr.join(" | ")}
    </Text>
  )
}
