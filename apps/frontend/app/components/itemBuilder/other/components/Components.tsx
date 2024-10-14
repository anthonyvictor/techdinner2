import { Card, Text } from "@radix-ui/themes"
import { useSelectComponents } from "."
import { name } from "@td/functions"

export const Components = () => {
  const { other } = useSelectComponents()
  return (
    <>
      {(other.components ?? []).map((component) => (
        <Card key={component.id}>
          <Text>{name(component)}</Text>
        </Card>
      ))}
    </>
  )
}
