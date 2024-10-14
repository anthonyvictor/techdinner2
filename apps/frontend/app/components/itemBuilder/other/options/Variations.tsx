import { Box, Card, ContextMenu, Flex, Text } from "@radix-ui/themes"
import {
  currency,
  getOtherVariationStock,
  getStockInfo,
  initials,
  name,
} from "@td/functions"
import React, { useEffect } from "react"
import { Ref } from "@/app/infra/types/ref"
import { useSelectOptions } from "."
import { ItemCategory } from "../../Category"
import { MyAvatar } from "@/app/components/MyAvatar"
import { useOtherBuilder } from "@/app/context/itemBuilder/Other"
import { Components } from "../components/Components"
import { Stock } from "@/app/components/Stock"

export const Variations = () => {
  const {
    currentSize,
    hoveredSize,
    variationsListRef,
    hoveredVariation,
    hoveredVariationRef,
    setSearchVariations,
    filteredVariations,
    addOptions,
    currentOptions,
    other,
  } = useSelectOptions()

  const { currentOthers, setSelectComponentsId } = useOtherBuilder()

  useEffect(() => {
    setSearchVariations("")
  }, [currentOptions]) //eslint-disable-line

  return (
    <>
      <ItemCategory category="Variações" />
      <Flex
        className={`w-full flex-1 flex-col min-h-0 basis-1 gap-1 
          ${!currentSize ? "opacity-45 pointer-events-none select-none" : ""}`}
      >
        <Flex
          direction={"column"}
          ref={variationsListRef as Ref<HTMLDivElement>}
          className="w-full min-h-72 flex-1
            basis-1 overflow-y-auto gap-2
            items-start content-start"
        >
          <div
            className="flex flex-wrap
      w-full
       gap-2
      items-start content-start"
          >
            {filteredVariations.map((variation) => {
              return (
                <ContextMenu.Root key={variation.id}>
                  <ContextMenu.Trigger>
                    <Card
                      // key={variation.id}
                      variant="surface"
                      id={`variation=${variation.id}`}
                      ref={
                        hoveredVariation?.id === variation.id
                          ? (hoveredVariationRef as Ref<HTMLDivElement>)
                          : undefined
                      }
                      asChild
                      className={`shrink-0 w-[100%] p-2 ${
                        hoveredVariation?.id === variation.id
                          ? "bg-yellow-8"
                          : ""
                      }`}
                    >
                      <button
                        onClick={() => {
                          currentSize && addOptions(currentSize, [variation])
                        }}
                      >
                        <Flex gap="2">
                          <MyAvatar
                            src={variation.imageUrl ?? ""}
                            fallback={initials(variation)}
                          />
                          <Box>
                            <Text truncate as="p">
                              {name(variation)}
                            </Text>
                            <Flex gap="1">
                              {(() => {
                                const variationValues = Array.from(
                                  new Set(
                                    variation.values
                                      .filter((x) =>
                                        currentSize?.id || hoveredSize?.id
                                          ? [
                                              currentSize?.id,
                                              hoveredSize?.id,
                                            ].includes(x.size.id)
                                          : true,
                                      )
                                      .map((x) => x.value ?? 0),
                                  ),
                                )

                                const minVal = Math.min(...variationValues)

                                return (
                                  <Text truncate as="p" size={"1"} color="gray">
                                    {`${currency(minVal)} ${variationValues.length > 1 ? "+" : ""}`}
                                  </Text>
                                )
                              })()}
                              <Text truncate as="p" size={"1"} color="gray">
                                {" | "}
                              </Text>
                              {(() => {
                                const variationStock = getOtherVariationStock(
                                  variation,
                                  hoveredSize ?? currentSize,
                                  [...currentOthers, ...currentOptions],
                                )

                                const { color, label } = getStockInfo(
                                  variationStock,
                                  currentSize || hoveredSize ? "" : "*",
                                )

                                return (
                                  <React.Fragment>
                                    <Text
                                      truncate
                                      as="p"
                                      size={"1"}
                                      color={color}
                                    >
                                      {label}
                                    </Text>
                                    <Stock
                                      stock={variationStock}
                                      label={label}
                                    />
                                  </React.Fragment>
                                )
                              })()}
                            </Flex>
                          </Box>
                        </Flex>
                      </button>
                    </Card>
                  </ContextMenu.Trigger>
                  <ContextMenu.Content>
                    <ContextMenu.Item
                      onClick={() => setSelectComponentsId(other.id)}
                      disabled={other.variations.length === 1}
                    >
                      Modificar componentes
                    </ContextMenu.Item>
                  </ContextMenu.Content>
                </ContextMenu.Root>
              )
            })}
          </div>
        </Flex>
      </Flex>
    </>
  )
}
