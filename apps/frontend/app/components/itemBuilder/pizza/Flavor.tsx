import { Box, Card, Flex, IconButton, Text } from "@radix-ui/themes"
import { IPizzaFlavor } from "@td/types"
import { SelectIngredients } from "./ingredients"
import { CgMenuGridO } from "react-icons/cg"
import { currency, getValueBySize, name } from "@td/functions"
import { usePizzaBuilder } from "@/app/context/itemBuilder/Pizza"
import { Ref } from "@/app/infra/types/ref"

export const Flavor = ({ flavor }: { flavor: IPizzaFlavor }) => {
  const { hoveredFlavor, hoveredFlavorRef, currentPizza, addFlavor } =
    usePizzaBuilder()
  return (
    <Card
      key={flavor.id}
      variant="surface"
      id={`flavor-${flavor.id}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          addFlavor({ ...flavor, modifications: [] })
        }
      }}
      ref={
        hoveredFlavor?.id === flavor.id
          ? (hoveredFlavorRef as Ref<HTMLDivElement>)
          : undefined
      }
      className={`shrink-0 border-2 border-transparent hover:border-gray-6
                          w-[100%] md:w-[31.99%] lg:ww-[23.99%] lg:w-[18.99%] p-2 ${
                            hoveredFlavor?.id === flavor.id
                              ? "bg-yellow-5"
                              : currentPizza.flavors.find(
                                    (x) => x.id === flavor.id,
                                  )
                                ? "bg-orange-5 "
                                : ""
                          }`}
    >
      <Flex
        align={"center"}
        gap="2"
        flexShrink={"0"}
        className="pointer-events-none"
      >
        <SelectIngredients defaultFlavor={flavor}>
          <IconButton
            size={"2"}
            variant="surface"
            color="blue"
            className="pointer-events-auto"
          >
            <CgMenuGridO />
          </IconButton>
        </SelectIngredients>
        <Box
          flexGrow={"1"}
          flexBasis={"1"}
          flexShrink={"1"}
          overflow={"hidden"}
        >
          <Text truncate as="p">
            {name(flavor)}
          </Text>
          <Text truncate as="p" size={"1"} color="gray">
            {flavor.ingredients.map((x) => name(x)).join(", ")}
          </Text>
          <Text truncate as="p" size={"1"} color="gray">
            {currentPizza?.size?.id
              ? currency(getValueBySize(currentPizza.size, flavor.values))
              : flavor.values
                  .sort((a, b) => (a.value > b.value ? 1 : -1))
                  .map((x, i) =>
                    i === 0 || i + 1 === flavor.values.length
                      ? currency(x.value)
                      : "",
                  )
                  .filter(Boolean)
                  .join(" a ")}
          </Text>
        </Box>
      </Flex>
    </Card>
  )
}
