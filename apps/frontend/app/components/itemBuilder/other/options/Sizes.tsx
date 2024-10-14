import { Box, Card, Flex, Text } from "@radix-ui/themes"
import { getOtherSizeStock, getOtherStock, name } from "@td/functions"
import { Ref } from "@/app/infra/types/ref"
import { useSelectOptions } from "."
import { ItemCategory } from "../../Category"
import { useOtherBuilder } from "@/app/context/itemBuilder/Other"

export const Sizes = () => {
  const {
    other,
    hoveredSize,
    currentSize,
    setCurrentSize,
    hoveredSizeRef,
    sizesListRef,
    addOptions,
    currentOptions,
  } = useSelectOptions()

  const { currentOthers } = useOtherBuilder()

  if (other.sizes?.length === 1) return <></>

  return (
    <>
      <ItemCategory category="Tamanhos" />
      <Flex direction={"column"} className="w-full gap-1">
        <Flex
          ref={sizesListRef as Ref<HTMLDivElement>}
          className="w-full overflow-x-auto gap-2 items-start content-start"
        >
          <div
            className="flex flex-wrap
      w-full
       gap-2
      items-start content-start"
          >
            {(other.sizes ?? []).map((size) => {
              return (
                <Card
                  key={size.id}
                  variant="surface"
                  id={`option=${size.id}`}
                  ref={
                    hoveredSize?.id === size.id
                      ? (hoveredSizeRef as Ref<HTMLDivElement>)
                      : undefined
                  }
                  asChild
                  className={`shrink-0 min-w-28 p-2 ${
                    hoveredSize?.id === size.id
                      ? "bg-yellow-8"
                      : currentSize?.id === size.id
                        ? "bg-orange-8"
                        : ""
                  }`}
                >
                  <button
                    onClick={() => {
                      if (other.variations.length > 1) {
                        setCurrentSize(size)
                      } else {
                        addOptions(size, [other.variations[0]])
                      }
                    }}
                  >
                    <Flex gap="2">
                      <Box>
                        <Text truncate as="p">
                          {name(size)}
                        </Text>
                        <Flex gap="1">
                          {/* <Text truncate as="p" size={"1"} color="gray">
                            {currency(
                              size.originalValue ?? other.originalValue ?? 0,
                            )}
                          </Text>
                          <Text truncate as="p" size={"1"} color="gray">
                            {" | "}
                          </Text> */}
                          {(() => {
                            const stock = getOtherSizeStock(other, size, [
                              ...currentOthers,
                              ...currentOptions,
                            ])
                            return (
                              <Text
                                truncate
                                as="p"
                                size={"1"}
                                color={stock < 1 ? "red" : "gray"}
                              >
                                {stock > 0 ? `${stock} und` : "Em falta"}
                              </Text>
                            )
                          })()}
                        </Flex>
                      </Box>
                    </Flex>
                  </button>
                </Card>
              )
            })}
          </div>
        </Flex>

        {/* <SelectedOthers
        groups={groupedOptions as IBuildingOther[][]}
        onlyOption
        removeOther={removeOption}
      /> */}
      </Flex>
    </>
  )
}
