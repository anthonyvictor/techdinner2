import { ContrDialog } from "@/app/components/ControlledDialog"
import { ItemBuilderPage } from "@/app/components/itemBuilder/ItemBuilder"
import { IItemMenu } from "@/app/infra/types/itemMenu"
import { Button, Flex, Text } from "@radix-ui/themes"
import { IOrderItem } from "@td/types"

export const ItemPanelButton = ({
  item,
  orderId,
}: {
  item: IItemMenu
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
      <ItemBuilderPage>
        {<item.component item={item} orderId={orderId} />}
      </ItemBuilderPage>
    </ContrDialog>
  )
}
