import { ContrDialog } from "@/app/components/ControlledDialog"
import { ItemBuilder } from "@/app/components/itemBuilder/ItemBuilder"
import { IItemMenu } from "@/app/infra/types/itemMenu"
import { Button, Flex, Text } from "@radix-ui/themes"
import { IOrderItem } from "@td/types"

export const ItemPanelButton = ({
  item,
  addMultipleItems,
  orderId,
}: {
  item: IItemMenu
  addMultipleItems: (items: IOrderItem[]) => void
  orderId: string
}) => {
  return (
    <ContrDialog
      key={item.name}
      trigger={
        <Button variant="surface" color={item.color}>
          <Flex align={"center"} gap="1">
            <Text>{<item.icon />}</Text>
            <Text className="lg:hidden">{item.shortLabel}</Text>
            <Text className="hidden lg:inline">{item.label}</Text>
          </Flex>
        </Button>
      }
    >
      <ItemBuilder>
        {
          <item.component
            item={item}
            addMultipleItems={addMultipleItems}
            orderId={orderId}
          />
        }
      </ItemBuilder>
    </ContrDialog>
  )
}
