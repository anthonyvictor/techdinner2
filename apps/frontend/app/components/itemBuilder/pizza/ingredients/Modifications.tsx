import { Strong, Text } from "@radix-ui/themes"
import { getComponentTypeLabel, name } from "@td/functions"
import { useSelectIngredients } from "."

export const Modifications = () => {
  const { flavor } = useSelectIngredients()
  return (
    <Text align={"center"}>
      Modificações:{" "}
      <Strong>
        {(flavor.modifications ?? [])
          .map((x) => `${getComponentTypeLabel(x)} ${name(x)}`)
          .join(", ")}
      </Strong>
    </Text>
  )
}
