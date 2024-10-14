import { Box, Card, ContextMenu, Flex, Separator, Text } from "@radix-ui/themes"
import {
  currency,
  getOtherStock,
  getStockInfo,
  initials,
  name,
} from "@td/functions"
import { IOther } from "@td/types"
import { SelectOptions } from "./options"
import { useOtherBuilder } from "@/app/context/itemBuilder/Other"
import { Ref } from "@/app/infra/types/ref"
import { MyAvatar } from "../../MyAvatar"
import { SelectComponents } from "./components"

export const Other = ({ other }: { other: IOther }) => {
  const {
    hoveredOther,
    hoveredOtherRef,
    currentOthers,
    setSelectComponentsId,
  } = useOtherBuilder()

  return (
    <>
      <SelectOptions key={other.id} other={other}>
        {({ onClick }) => (
          <>
            <ContextMenu.Root>
              <ContextMenu.Trigger>
                <Card
                  variant="surface"
                  id={`other-${other.id}`}
                  onClick={onClick}
                  onDoubleClick={() => {}}
                  ref={
                    hoveredOther?.id === other.id
                      ? (hoveredOtherRef as Ref<HTMLDivElement>)
                      : undefined
                  }
                  className={`border-2 border-transparent hover:border-gray-6 
                      min-h-[4.5rem] flex p-1 relative shrink-0
                      w-[100%] md:w-[31.99%] lg:ww-[23.99%] lg:w-[18.99%] ${
                        hoveredOther?.id === other.id
                          ? "bg-yellow-5"
                          : currentOthers.map((x) => x.id).includes(other.id)
                            ? "bg-orange-5 "
                            : ""
                      }`}
                >
                  <Flex
                    align={"center"}
                    gap="2"
                    flexGrow={"1"}
                    className="max-w-full "
                  >
                    <MyAvatar
                      size={"5"}
                      src={other.imageUrl}
                      fallback={initials(other)}
                    />
                    <Box
                      flexGrow={"1"}
                      flexBasis={"1"}
                      flexShrink={"1"}
                      className="min-w-0 max-w-full"
                    >
                      <Text truncate as="p">
                        {name(other)}
                      </Text>
                      {other.variations?.length > 1 && (
                        <Flex gap="1" className="overflow-x-auto">
                          <Text truncate as="p" size={"1"} color="gray">
                            {other.variations.map((x) => name(x)).join(", ")}
                          </Text>
                        </Flex>
                      )}
                      {(() => {
                        const variationsValues = Array.from(
                          new Set(
                            (other.variations ?? [])
                              .map((x) => {
                                return x.values.map((y) => y.value)
                              })
                              .flat(),
                          ),
                        )

                        const variationsValue = Math.min(...variationsValues)

                        const value = `${currency(variationsValue)} ${variationsValues.length > 1 ? "+" : ""}`

                        const stock = getOtherStock(
                          other,
                          undefined,
                          undefined,
                          currentOthers,
                        )

                        return (
                          <Flex gap="1">
                            <Text truncate as="p" size={"1"} color="gray">
                              {value}
                            </Text>
                            <Separator orientation={"vertical"} />
                            {/* <Text truncate as="p" size={"1"} color={"gray"}>
                      {litter(other.sizeInMl)}
                    </Text> */}
                            {/* <Separator orientation={"vertical"} /> */}
                            {(() => {
                              const { color, label } = getStockInfo(stock)
                              return (
                                <Text truncate as="p" size={"1"} color={color}>
                                  {label}
                                </Text>
                              )
                            })()}
                          </Flex>
                        )
                      })()}
                    </Box>
                  </Flex>
                </Card>
              </ContextMenu.Trigger>
              <ContextMenu.Content>
                <ContextMenu.Item
                  onClick={() => setSelectComponentsId(other.id)}
                  disabled={other.variations.length > 1}
                >
                  Modificar componentes
                </ContextMenu.Item>
              </ContextMenu.Content>
            </ContextMenu.Root>
          </>
        )}
      </SelectOptions>
      <SelectComponents other={other} />
    </>
  )
}
