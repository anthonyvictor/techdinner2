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
import { IOther } from "@td/types";
import { FaHotdog } from "react-icons/fa";

export const Other = ({ other }: { other: IOther }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Card
          key={other.id}
          asChild
          style={{
            flexShrink: "0",
            padding: "8px",
          }}
        >
          <button>
            <Flex
              className="shrink-0 min-w-max
              items-center gap-2 "
            >
              <Avatar
                src={other.imageUrl}
                fallback={<FaHotdog />}
                // style={{
                //   height: "100%",
                //   width: "100%",
                //   aspectRatio: "1",
                //   minHeight: "0",
                // }}
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
                  <Strong>{name(other)}</Strong>
                </Text>
                {/* {other.flavors?.length && (
            <Flex
              gap="2"
              flexShrink={"1"}
              overflowX={"auto"}
              flexGrow={"0"}
              maxWidth={"100%"}
              minWidth={"0"}
              className="no-scroll"
            >
              {other.flavors.map((flavor) => (
                <Badge key={flavor.id}>{name(flavor)}</Badge>
              ))}
            </Flex>
          )} */}
                <Text size="1">
                  {currency(other.originalValue)}
                  {` - `}
                  {other.stock} und
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
