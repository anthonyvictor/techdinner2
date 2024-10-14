import { MyAvatar } from "@/app/components/MyAvatar"
import { Button, Card, Dialog, Flex, Strong, Text } from "@radix-ui/themes"
import { name } from "@td/functions/src/format"
import { IBuildingPromo } from "@td/types"
import { FaHotdog } from "react-icons/fa"

export const Promo = ({ promo }: { promo: IBuildingPromo }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Card
          key={promo.id}
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
              <MyAvatar
                src={promo.imageUrl}
                fallback={<FaHotdog />}
                size={"8"}
              />
              <Flex
                direction={"column"}
                gap="1"
                flexGrow={"0"}
                maxWidth={"100%"}
                minWidth={"0"}
              >
                <Text>
                  <Strong>{name(promo)}</Strong>
                </Text>
                {promo.description && (
                  <Text size={"1"} weight={"light"}>
                    {promo.description}
                  </Text>
                )}
                <Text size="1">
                  {/* {(promo as IBuildingPromo)?.fixedValue &&
                    currency((promo as IPromo).fixedValue as number)} */}
                  {/* {(promo as IBuildingPromo)?.fixedValue && ` - `} */}
                  {promo.stock && `${promo.stock} und`}
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
  )
}
