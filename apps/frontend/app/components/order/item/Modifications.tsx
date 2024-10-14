import { Text } from "@radix-ui/themes"
import { name } from "@td/functions"
import { ItemModification } from "@td/types"

export const Modifications = ({
  modifications,
}: {
  modifications: ItemModification[] | undefined
}) => {
  return !!modifications?.length ? (
    <Text
      as="p"
      color="yellow"
      size={"1"}
      align={"left"}
      className="scale-90 origin-left h-3"
    >
      {(modifications ?? []).map((x) => name(x)).join(", ")}
    </Text>
  ) : (
    <></>
  )
}
