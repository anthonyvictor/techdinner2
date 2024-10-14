import { Flex, Text, CheckboxGroup } from "@radix-ui/themes"
import { name } from "@td/functions"
import { NamedData } from "@td/types"

export const Extras = ({
  preExtras,
  extras,
  setExtras,
}: {
  preExtras: NamedData[]
  extras: NamedData[]
  setExtras: (extras: NamedData[]) => void
}) => {
  return (
    <>
      <Text size="1">Extras:</Text>
      <CheckboxGroup.Root
        value={extras?.map((x) => x.id as string)}
        className="flex-1 overflow-y-auto"
        onValueChange={(e) =>
          setExtras(preExtras.filter((x) => e.includes(x.id as string)))
        }
      >
        <Flex gap="2">
          {preExtras.map((preExtra) => (
            <CheckboxGroup.Item key={preExtra.id} value={preExtra.id as string}>
              <Text truncate>{name(preExtra)}</Text>
            </CheckboxGroup.Item>
          ))}
        </Flex>
      </CheckboxGroup.Root>
    </>
  )
}
