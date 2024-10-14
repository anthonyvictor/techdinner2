import { Strong, Text } from "@radix-ui/themes"
import { name } from "@td/functions"
import { NamedData } from "@td/types"

export const Name = ({
  item,
  amount,
}: {
  item: NamedData | string
  amount: number
}) => {
  return (
    <Text>
      <Strong>
        <Text color="amber">{amount > 1 ? `x${amount} ` : ""}</Text>
        {typeof item === "string" ? item : name(item)}
      </Strong>
    </Text>
  )
}
