import { DropdownMenu, Flex, IconButton, TextArea } from "@radix-ui/themes"
import { FaCommentDots } from "react-icons/fa"

export const ItemObservations = ({
  setObservations,
  observations,
  preObservations,
}: {
  setObservations: (value: string) => void
  observations: string | undefined
  preObservations: string[]
}) => {
  const Item = ({ label }: { label: string }) => {
    const addText = () => {
      setObservations(observations ? `${observations}, ${label}` : label)
    }
    return <DropdownMenu.Item onClick={addText}>{label}</DropdownMenu.Item>
  }

  return (
    <Flex className="relative">
      <TextArea
        id="observations-builder"
        className="flex-1"
        tabIndex={3}
        placeholder="Observações..."
        value={observations ?? ""}
        onChange={(e) => setObservations(e.target.value)}
        onBlur={() => {
          if (observations) {
            setObservations(observations?.trim())
          }
        }}
      />
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton
            size={"1"}
            className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2"
          >
            <FaCommentDots />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {preObservations.map((x, i) => (
            <Item key={i} label={x} />
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
  )
}
