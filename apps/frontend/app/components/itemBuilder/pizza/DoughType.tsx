import { usePizzaBuilder } from "@/app/context/itemBuilder/Pizza";
import { Flex, Text, Select } from "@radix-ui/themes";
import { name } from "@td/functions";
import { IPizzaCrust } from "@td/types";

export const DoughType = () => {
  const { builder, currentPizza, setDoughType } = usePizzaBuilder();

  return (
    <Flex direction={"column"}>
      <Text size="1">Tipo da massa:</Text>
      <Select.Root
        value={currentPizza.dough?.type?.id as string | undefined}
        onValueChange={(e) => {
          setDoughType(
            builder.doughTypes.find((x) => x.id === e) as IPizzaCrust
          );
        }}
      >
        <Select.Trigger />
        <Select.Content>
          {builder.doughTypes.map((type) => (
            <Select.Item key={type.id} value={type.id as string}>
              {name(type)}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};
