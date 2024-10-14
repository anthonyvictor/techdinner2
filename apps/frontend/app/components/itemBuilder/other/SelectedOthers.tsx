import { useHorizontalScroll } from "@/app/util/hooks/horizontalScroll"
import { Avatar, Card, Flex, IconButton, Text } from "@radix-ui/themes"
import { currency, getOtherValue, initials, name } from "@td/functions"
import { IBuildingOther } from "@td/types"
import { RefObject } from "react"
import { MdClose } from "react-icons/md"
import { MyAvatar } from "../../MyAvatar"

export const SelectedOthers = ({
  groups,
  removeOther,
  onlyVariation,
}: {
  groups: IBuildingOther[][]
  removeOther: (otherCode: string) => void
  onlyVariation?: boolean
}) => {
  const ref = useHorizontalScroll()

  return (
    <Card className="py-2 max-w-full min-w-0 w-full" size={"1"}>
      <Flex
        className="gap-3 overflow-x-auto max-w-full min-w-0 w-full  no-scroll"
        ref={ref as RefObject<HTMLDivElement>}
      >
        <div className="flex-1 min-w-0 basis-0" />
        {groups.map((group) => {
          const other = group[0]

          const _amount = group.length > 1 ? `${group.length}x - ` : ""
          const _size =
            other.size && other.sizes.length > 1 ? name(other.size) : ""
          const _extras = (other.finalExtras ?? [])
            .map((x) => name(x))
            .join(", ")
          const _variation =
            other.variations.length > 1 ? `${name(other.variation)}` : ""

          return (
            <Flex
              align={"center"}
              className="bg-gray-5 p-2 rounded-2 gap-1 min-w-max whitespace-nowrap select-none"
              key={other.code}
            >
              <MyAvatar src={other.imageUrl} fallback={initials(other)} />
              <Flex
                direction={"column"}
                align={"start"}
                justify={"start"}
                flexGrow={"1"}
                className="group hover:text-orange-11"
              >
                {!onlyVariation && (
                  <Text trim={"both"}>
                    {_amount}
                    {name(other)}
                    {!!_size && ` (${_size})`}
                  </Text>
                )}
                {onlyVariation && other.size && other.sizes.length > 1 && (
                  <Text className="group-hover:text-orange-11" trim={"both"}>
                    {onlyVariation && _amount}
                    {name(other.size)}
                  </Text>
                )}
                {other.variation && other.variations.length > 1 && (
                  <Text
                    className="text-grass-11 group-hover:text-orange-11 scale-90 origin-left"
                    size={onlyVariation ? "3" : "1"}
                    trim={"end"}
                  >
                    {other.sizes.length === 1 && _amount}
                    {_variation}
                  </Text>
                )}
                {!!other.finalExtras?.length && (
                  <Text
                    size={"1"}
                    color="orange"
                    className="scale-90 origin-left"
                  >
                    Com {_extras}
                  </Text>
                )}
                <Text size={"1"} className="scale-75 origin-left">
                  {currency(getOtherValue(other) * group.length)}
                </Text>
              </Flex>
              <IconButton
                size={"1"}
                variant="outline"
                color="red"
                className=""
                onClick={() => {
                  removeOther(other.code)
                }}
              >
                <MdClose />
              </IconButton>
            </Flex>
          )
        })}
        <div className="flex-1 min-w-0 basis-0" />
      </Flex>
    </Card>
  )
}
