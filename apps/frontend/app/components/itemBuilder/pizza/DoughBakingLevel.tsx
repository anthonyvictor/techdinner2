import { usePizzaBuilder } from "@/app/context/itemBuilder/Pizza";
import { Flex, Text, Select } from "@radix-ui/themes";
import { name } from "@td/functions";
import { IPizzaDoughBakingLevel } from "@td/types";

export const DoughBakingLevel = () => {
  const { builder, currentPizza, setDoughBakingLevel } = usePizzaBuilder();

  return (
    <Flex direction={"column"}>
      <Text size="1">Ponto da massa:</Text>
      <Select.Root
        value={currentPizza.dough?.bakingLevel?.id as string | undefined}
        onValueChange={(e) => {
          setDoughBakingLevel(
            builder.doughBakingLevels.find(
              (x) => x.id === e
            ) as IPizzaDoughBakingLevel
          );
        }}
      >
        <Select.Trigger />
        <Select.Content>
          {builder.doughBakingLevels.map((bakingLevel) => (
            <Select.Item key={bakingLevel.id} value={bakingLevel.id as string}>
              {name(bakingLevel)}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};
