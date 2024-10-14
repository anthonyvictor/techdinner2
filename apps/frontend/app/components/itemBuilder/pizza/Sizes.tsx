import { usePizzaBuilder } from "@/app/context/itemBuilder/Pizza"
import { Ref } from "@/app/infra/types/ref"
import { Flex, RadioCards, Text } from "@radix-ui/themes"
import { name } from "@td/functions"
import { IPizzaSize } from "@td/types"

export const Sizes = () => {
  const { builder, currentPizza, setSize, hoveredFlavor, currentSizeRef } =
    usePizzaBuilder()

  return (
    <Flex
      gap="2"
      className="overflow-x-auto"
      overflowX={"auto"}
      py={{ initial: "0", lg: "1" }}
    >
      <RadioCards.Root
        value={currentPizza.size?.id as string | undefined}
        className="flex overflow-x-auto w-full"
        onValueChange={(e) => {
          setSize(builder.sizes.find((x) => x.id === e) as IPizzaSize)
        }}
      >
        <div className="flex-1 lg:hidden" />
        {builder.sizes.map((size) => (
          <RadioCards.Item
            key={size.id}
            value={size.id as string}
            ref={
              currentPizza.size?.id === size.id
                ? (currentSizeRef as Ref<HTMLButtonElement>)
                : undefined
            }
            className={`shrink-0 ${currentPizza.size?.id === size.id ? " bg-orange-3" : ""}`}
          >
            <Flex direction={"column"}>
              <Text as="p" className="lg:hidden">
                {name(size)}
              </Text>
              <Text as="p" className="hidden lg:inline">
                {size.fullName}
              </Text>
              <Text size={"1"} as="p" color="gray" className="hidden lg:inline">
                {size.approximateCm}cm {size.pieces} fatias {size.maxflavors}{" "}
                sab
              </Text>
            </Flex>
          </RadioCards.Item>
        ))}
        <div className="flex-1 lg:hidden" />
      </RadioCards.Root>
    </Flex>
  )
}
