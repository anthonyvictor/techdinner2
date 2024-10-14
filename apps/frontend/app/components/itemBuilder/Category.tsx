import { Text } from "@radix-ui/themes"

export const ItemCategory = ({ category }: { category: string }) => {
  return (
    <Text size={"1"}>
      {"> "}
      {category}
    </Text>
  )
}
