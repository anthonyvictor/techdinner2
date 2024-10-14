import { Text } from "@radix-ui/themes"
import { currency } from "@td/functions"
import { applyDiscount } from "@td/functions/src/calc"

export const Price = ({
  value,
  discount,
}: {
  value: number
  discount: number
}) => {
  return (
    <Text as="p" size={"1"} align={"left"}>
      <Text size={"1"}>{currency(applyDiscount(value))} </Text>
      <Text size={"1"} color="grass">
        {discount > 0 ? `- (${currency(discount)} desc.)` : ""}
      </Text>
    </Text>
  )
}
