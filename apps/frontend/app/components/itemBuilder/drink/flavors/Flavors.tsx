import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes"
import { currency, groupSelectedDrinks, initials, name } from "@td/functions"
import { useSelectFlavor } from "."
import { useEffect } from "react"
import { IBuildingDrink } from "@td/types"
import { SelectedDrinks } from "../SelectedDrinks"
import { Ref } from "@/app/infra/types/ref"
import { MyAvatar } from "@/app/components/MyAvatar"
import { useDrinkBuilder } from "@/app/context/itemBuilder/Drink"

export const Flavors = () => {
  const {
    drink,
    currentFlavors,
    addFlavors,
    removeFlavor,
    filteredFlavors,
    setSearchFlavors,
    hoveredFlavor,
    hoveredFlavorRef,
    flavorsListRef,
  } = useSelectFlavor()

  const { promoItems } = useDrinkBuilder()

  useEffect(() => {
    setSearchFlavors("")
  }, [currentFlavors]) //eslint-disable-line

  const groupedFlavors = currentFlavors?.length
    ? groupSelectedDrinks(currentFlavors)
    : []

  return (
    <Flex direction={"column"} className="w-full flex-1 basis-1 gap-1">
      <Flex
        direction={"column"}
        ref={flavorsListRef as Ref<HTMLDivElement>}
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
          {filteredFlavors
            .filter((x) => {
              if (!promoItems?.length) return true
              return (
                !promoItems.find((y) => y.drinkId === x.id)?.flavors?.length ||
                promoItems
                  .find((y) => y.drinkId === x.id)
                  ?.flavors?.some((y) => y.id === x.id)
              )
            })
            .map((flavor) => {
              return (
                <Card
                  key={flavor.id}
                  variant="surface"
                  id={`flavor=${flavor.id}`}
                  ref={
                    hoveredFlavor?.id === flavor.id
                      ? (hoveredFlavorRef as Ref<HTMLDivElement>)
                      : undefined
                  }
                  asChild
                  className={`shrink-0 
                    w-[100%] md:w-[23.99%] p-2 ${
                      hoveredFlavor?.id === flavor.id ? "bg-yellow-8" : ""
                    }`}
                >
                  <button
                    onClick={() => {
                      addFlavors([flavor])
                    }}
                  >
                    <Flex gap="2">
                      <MyAvatar
                        src={flavor.imageUrl ?? ""}
                        fallback={initials(flavor)}
                      />
                      <Box>
                        <Text truncate as="p">
                          {name(flavor)}
                        </Text>
                        <Flex gap="1">
                          <Text truncate as="p" size={"1"} color="gray">
                            {currency(
                              flavor.originalValue ?? drink.originalValue ?? 0,
                            )}
                          </Text>
                          <Text truncate as="p" size={"1"} color="gray">
                            {" | "}
                          </Text>
                          <Text
                            truncate
                            as="p"
                            size={"1"}
                            color={flavor.stock < 1 ? "red" : "gray"}
                          >
                            {flavor.stock > 0
                              ? `${flavor.stock} und`
                              : "Em falta"}
                          </Text>
                        </Flex>
                      </Box>
                    </Flex>
                  </button>
                </Card>
              )
            })}
        </div>
      </Flex>

      <SelectedDrinks
        groups={groupedFlavors as IBuildingDrink[][]}
        onlyFlavor
        removeDrink={removeFlavor}
      />
    </Flex>
  )
}
