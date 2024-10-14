import { Text } from "@radix-ui/themes"
import { IOrderItem } from "@td/types"

export const Observations = ({ item }: { item: IOrderItem }) => {
  return !!item.observations?.length ? (
    <Text
      as="p"
      color="orange"
      size={"1"}
      align={"left"}
      weight={"bold"}
      className="scale-75 origin-left h-3"
    >
      {item.observations.trim().toUpperCase()}
    </Text>
  ) : (
    <></>
  )
}
