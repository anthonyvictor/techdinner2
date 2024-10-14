import { Text } from "@radix-ui/themes"
import { name } from "@td/functions"
import { NamedData } from "@td/types"

export const Extras = ({ extras }: { extras: NamedData[] | undefined }) => {
  return !!extras?.length ? (
    <Text
      as="p"
      color="yellow"
      size={"1"}
      align={"left"}
      className="scale-90 origin-left h-3"
    >
      {"Extras: "}
      {(extras ?? []).map((x) => name(x)).join(", ")}
    </Text>
  ) : (
    <></>
  )
}
