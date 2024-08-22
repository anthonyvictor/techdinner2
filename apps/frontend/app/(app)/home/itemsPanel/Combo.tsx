import {
  Avatar,
  Button,
  Card,
  Dialog,
  Flex,
  Strong,
  Text,
} from "@radix-ui/themes";
import { currency, name } from "@td/functions/src/format";
import { ICombo } from "@td/types";
import Image from "next/image";
import { FaHotdog } from "react-icons/fa";

export const Combo = ({ combo }: { combo: ICombo }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Card
          key={combo.id}
          asChild
          style={{
            flexShrink: "0",
            padding: "8px",
            maxWidth: "350px",
          }}
        >
          <button>
            <Flex
              className="shrink-0 
              items-center gap-2 relative"
            >
              <Avatar
                src={combo.imageUrl}
                fallback={<FaHotdog />}
                size={"8"}
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
                  <Strong>{name(combo)}</Strong>
                </Text>
                {combo.description && (
                  <Text size={"1"} weight={"light"}>
                    {combo.description}
                  </Text>
                )}
                {/* {combo.flavors?.length && (
            <Flex
              gap="2"
              flexShrink={"1"}
              overflowX={"auto"}
              flexGrow={"0"}
              maxWidth={"100%"}
              minWidth={"0"}
              className="no-scroll"
            >
              {combo.flavors.map((flavor) => (
                <Badge key={flavor.id}>{name(flavor)}</Badge>
              ))}
            </Flex>
          )} */}
                <Text size="1">
                  {(combo as ICombo)?.fixedValue &&
                    currency((combo as ICombo).fixedValue as number)}
                  {(combo as ICombo)?.fixedValue && ` - `}
                  {combo.stock} und
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
