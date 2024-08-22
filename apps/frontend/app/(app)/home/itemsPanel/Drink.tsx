import {
  Avatar,
  Badge,
  Button,
  Card,
  Dialog,
  Flex,
  Strong,
  Text,
} from "@radix-ui/themes";
import { currency, name } from "@td/functions/src/format";
import { IDrink } from "@td/types";
import { FaWineBottle } from "react-icons/fa";

export const Drink = ({ drink }: { drink: IDrink }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Card
          key={drink.id}
          asChild
          style={{
            flexShrink: "0",
            padding: "8px",
          }}
        >
          <button>
            <Flex
              className="shrink-0 min-w-max
              items-center gap-2 h-12"
            >
              <Avatar
                src={drink.imageUrl}
                fallback={<FaWineBottle />}
                style={{
                  height: "100%",
                  minHeight: "0",
                }}
                fetchPriority="high"
              />
              <Flex
                direction={"column"}
                gap="1"
                flexGrow={"0"}
                maxWidth={"100%"}
                minWidth={"0"}
              >
                <Text>
                  <Strong>{name(drink)}</Strong>
                </Text>
                {/* {drink.flavors?.length && (
            <Flex
              gap="2"
              flexShrink={"1"}
              overflowX={"auto"}
              flexGrow={"0"}
              maxWidth={"100%"}
              minWidth={"0"}
              className="no-scroll"
            >
              {drink.flavors.map((flavor) => (
                <Badge key={flavor.id}>{name(flavor)}</Badge>
              ))}
            </Flex>
          )} */}
                <Text size="1">
                  {currency(drink.originalValue)}
                  {` - `}
                  {drink.stock} und
                </Text>
              </Flex>
            </Flex>
          </button>
        </Card>
      </Dialog.Trigger>

      <Dialog.Content size={"1"}>
        <Dialog.Title>Adicionar bebida</Dialog.Title>
        <Dialog.Description>Selecione as opções</Dialog.Description>
        <Flex>akmkasdmsakmdmsaksad</Flex>
        <Flex>akmkasdmsakmdmsaksad</Flex>
        <Flex>akmkasdmsakmdmsaksad</Flex>
        <Flex align={"center"} gap="2">
          <Dialog.Close>
            <Button variant="soft" color="red">
              Cancelar
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button>Salvar</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
