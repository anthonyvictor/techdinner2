import { usePizzaBuilder } from "@/app/context/itemBuilder/Pizza";
import { Flex, Text, Select } from "@radix-ui/themes";
import { name } from "@td/functions";
import { IPizzaDoughThickness } from "@td/types";

export const DoughThickness = () => {
  const { builder, currentPizza, setDoughThickness } = usePizzaBuilder();

  return (
    <Flex direction={"column"}>
      <Text size="1">Grossura da massa:</Text>
      <Select.Root
        value={currentPizza.dough?.thickness?.id as string | undefined}
        onValueChange={(e) => {
          setDoughThickness(
            builder.doughThicknesses.find(
              (x) => x.id === e
            ) as IPizzaDoughThickness
          );
        }}
      >
        <Select.Trigger />
        <Select.Content>
          {builder.doughThicknesses.map((thickness) => (
            <Select.Item key={thickness.id} value={thickness.id as string}>
              {name(thickness)}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};
