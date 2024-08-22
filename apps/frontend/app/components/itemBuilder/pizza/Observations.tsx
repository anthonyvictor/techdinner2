import { usePizzaBuilder } from "@/app/context/itemBuilder/Pizza";
import { DropdownMenu, Flex, IconButton, TextArea } from "@radix-ui/themes";
import { FaCommentDots } from "react-icons/fa";

export const Observations = () => {
  const { currentPizza, setObservations } = usePizzaBuilder();

  const Item = ({ label }: { label: string }) => {
    const addText = () => {
      setObservations(
        currentPizza.observations
          ? `${currentPizza.observations}, ${label}`
          : label
      );
    };
    return <DropdownMenu.Item onClick={addText}>{label}</DropdownMenu.Item>;
  };

  return (
    <Flex className="relative">
      <TextArea
        id="observations-pizza-builder"
        className="flex-1"
        placeholder="Observações..."
        value={currentPizza.observations}
        onChange={(e) => setObservations(e.target.value)}
        onBlur={() => setObservations(currentPizza.observations?.trim())}
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
          <Item label="Cortar em + fatias" />
          <Item label="Mandar condimentos" />
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
  );
};
