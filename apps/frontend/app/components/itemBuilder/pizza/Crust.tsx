import { usePizzaBuilder } from "@/app/context/itemBuilder/Pizza";
import { Flex, Text, Select } from "@radix-ui/themes";
import { name } from "@td/functions";
import { IPizzaCrust } from "@td/types";

export const Crust = () => {
  const { builder, currentPizza, setCrust } = usePizzaBuilder();

  return (
    <Flex direction={"column"}>
      <Text size="1">Borda:</Text>
      <Select.Root
        value={currentPizza.crust?.id as string | undefined}
        onValueChange={(e) => {
          setCrust(builder.crusts.find((x) => x.id === e) as IPizzaCrust);
        }}
      >
        <Select.Trigger />
        <Select.Content>
          {builder.crusts.map((crust) => (
            <Select.Item key={crust.id} value={crust.id as string}>
              {name(crust)}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};
