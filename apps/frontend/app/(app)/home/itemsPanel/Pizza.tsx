import { ContrDialog } from "@/app/components/ControlledDialog";
import { ItemBuilder } from "@/app/components/itemBuilder/ItemBuilder";
import { PizzaBuilder } from "@/app/components/itemBuilder/pizza";
import { Card, Flex, Strong, Text } from "@radix-ui/themes";
import { getPizzaValue } from "@td/functions";
import { currency, name } from "@td/functions/src/format";
import { IBuildingPizza, IPizza, IPizzaSize } from "@td/types";

export const Pizza = ({ pizza }: { pizza: IBuildingPizza }) => {
  return (
    <ContrDialog
      trigger={
        <Card
          key={pizza.id}
          asChild
          style={{
            flexShrink: "0",
            flexGrow: "1",
            padding: "8px",
          }}
        >
          <button>
            <Flex
              flexGrow={"1"}
              flexShrink={"0"}
              style={{ flexShrink: "0" }}
              className={`shrink-0 ${pizza.flavors.length >= 3 ? "min-w-48" : "min-w-32"} 
                      items-center gap-2 min-h-full`}
            >
              <Flex direction={"column"} flexGrow={"1"}>
                <Text size={"2"}>
                  <Strong>{`Pizza ${name(pizza.size as IPizzaSize)}`}</Strong>
                </Text>

                <Text size={"1"} weight={"light"} trim={"start"}>
                  {pizza.flavors.map((flavor) => `${name(flavor)}`).join(", ")}
                </Text>

                <Flex align={"center"} justify={"between"}>
                  <Text size={"1"}>
                    <Strong>{currency(getPizzaValue(pizza))}</Strong>
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </button>
        </Card>
      }
    >
      <ItemBuilder>{<PizzaBuilder pizza={pizza as IPizza} />}</ItemBuilder>
    </ContrDialog>
  );
};
