import { usePizzaBuilder } from "@/app/context/itemBuilder/Pizza"
import { Flex, Text, CheckboxGroup } from "@radix-ui/themes"
import { name } from "@td/functions"

export const Extras = () => {
  const { builder, currentPizza, setExtras } = usePizzaBuilder()

  return (
    <>
      <Text size="1">Extras:</Text>
      <CheckboxGroup.Root
        value={currentPizza.extras?.map((x) => x.id as string)}
        className="flex-1 overflow-y-auto"
        onValueChange={(e) =>
          setExtras(builder.extras.filter((x) => e.includes(x.id as string)))
        }
      >
        <Flex gap="2">
          {builder.extras.map((extra) => (
            <CheckboxGroup.Item key={extra.id} value={extra.id as string}>
              <Text truncate>{name(extra)}</Text>
            </CheckboxGroup.Item>
          ))}
        </Flex>
      </CheckboxGroup.Root>
    </>
  )
}
