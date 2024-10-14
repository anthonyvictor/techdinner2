import { ContrDialog } from "@/app/components/ControlledDialog"
import { ItemBuilder } from "@/app/components/itemBuilder/ItemBuilder"
import { OtherBuilder } from "@/app/components/itemBuilder/other"
import { MyAvatar } from "@/app/components/MyAvatar"
import { useHome } from "@/app/context/Home"
import {
  Avatar,
  Button,
  Card,
  Dialog,
  Flex,
  Strong,
  Text,
} from "@radix-ui/themes"
import { getOtherStock, getOtherValue } from "@td/functions"
import { currency, name } from "@td/functions/src/format"
import { IBuildingOther, IOrderItemOther } from "@td/types"
import { FaHotdog } from "react-icons/fa"

export const Other = ({
  other,
}: {
  other: IBuildingOther | IOrderItemOther
}) => {
  const { currentOrder, addMultipleItems } = useHome()

  return (
    <ContrDialog
      trigger={
        <Card
          key={other.id}
          asChild
          style={{
            flexShrink: "0",
            padding: "8px",
          }}
        >
          <button>
            <Flex
              className="shrink-0 min-w-max
          items-center gap-2 "
            >
              <MyAvatar
                src={other.imageUrl}
                fallback={<FaHotdog />}
                // style={{
                //   height: "100%",
                //   width: "100%",
                //   aspectRatio: "1",
                //   minHeight: "0",
                // }}
              />
              <Flex
                direction={"column"}
                gap="1"
                flexGrow={"0"}
                maxWidth={"100%"}
                minWidth={"0"}
              >
                <Text>
                  <Strong>{name(other)}</Strong>
                </Text>
                <Text size="1" color="gray">
                  {other.variations?.length > 1 &&
                    `${name(other.variation)} | `}
                  {currency(getOtherValue(other))}
                  {` | `}
                  {getOtherStock(other)} und
                </Text>
              </Flex>
            </Flex>
          </button>
        </Card>
      }
    >
      <ItemBuilder>
        <OtherBuilder
          other={other}
          orderId={currentOrder ?? ""}
          addMultipleItems={addMultipleItems}
        />
      </ItemBuilder>
    </ContrDialog>
  )
}
