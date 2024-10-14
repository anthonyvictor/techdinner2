import { Flex, Text, Select } from "@radix-ui/themes"
import { name } from "@td/functions"
import { NamedData } from "@td/types"

export const ItemSelect = ({
  value,
  setValue,
  items,
  label,
}: {
  label: string
  value: string | undefined
  setValue: (value: string | undefined) => void
  items: NamedData[]
}) => {
  return (
    <Flex direction={"column"}>
      <Text size="1">{label}:</Text>
      <Select.Root value={value} onValueChange={setValue}>
        <Select.Trigger />
        <Select.Content>
          {items.map((item) => (
            <Select.Item key={item.id} value={item.id as string}>
              {name(item)}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Flex>
  )
}
