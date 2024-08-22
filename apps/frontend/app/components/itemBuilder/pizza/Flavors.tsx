import { usePizzaBuilder } from "@/app/context/itemBuilder/Pizza"
import {
  Box,
  Button,
  Card,
  ContextMenu,
  DropdownMenu,
  Flex,
  IconButton,
  Strong,
  Text,
} from "@radix-ui/themes"
import {
  currency,
  getFlavorsValueBySize,
  getPizzaFlavorDescription,
  getValueBySize,
  name,
} from "@td/functions"
import { CgMenuGridO } from "react-icons/cg"
import { FaPlus } from "react-icons/fa"
import { SelectIngredients } from "./SelectIngredients"
import React, { RefObject } from "react"
import { MdClose } from "react-icons/md"

export const Flavors = () => {
  const {
    currentPizza,
    filteredGroups,
    addFlavor,
    removeFlavor,
    hoveredFlavor,
    flavorsListRef,
    hoveredFlavorRef,
  } = usePizzaBuilder()

  return (
    <Flex
      direction={"column"}
      className="w-full min-h-0 flex-1 
      basis-1 gap-1"
    >
      <Flex
        direction={"column"}
        ref={flavorsListRef as RefObject<HTMLDivElement>}
        className="w-full min-h-0 flex-1 
            basis-1 overflow-y-auto gap-2
            items-start content-start"
      >
        {filteredGroups.map((group) => (
          <React.Fragment key={group.id}>
            <Text size={"1"}>
              {"> "}
              {group.fullName}
            </Text>
            <>
              <div
                className="flex flex-wrap 
            w-full  
             gap-2
            items-start content-start"
              >
                {group.flavors.map((flavor) => (
                  <Card
                    key={flavor.id}
                    variant="surface"
                    id={`flavor-${flavor.id}`}
                    ref={
                      hoveredFlavor?.id === flavor.id
                        ? (hoveredFlavorRef as RefObject<HTMLDivElement>)
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
                    <Flex align={"center"} gap="2" flexShrink={"0"}>
                      <Flex direction={"column"} gap="2">
                        <IconButton
                          size={"1"}
                          variant="surface"
                          onClick={() => {
                            addFlavor({ ...flavor, modifications: [] })
                          }}
                        >
                          <FaPlus />
                        </IconButton>
                        <SelectIngredients defaultFlavor={flavor}>
                          <IconButton size={"1"} variant="surface" color="blue">
                            <CgMenuGridO />
                          </IconButton>
                        </SelectIngredients>
                      </Flex>
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
                            ? currency(
                                getValueBySize(
                                  currentPizza.size,
                                  flavor.values,
                                ),
                              )
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
                ))}
              </div>
            </>
          </React.Fragment>
        ))}
      </Flex>

      <Flex className="gap-3" justify={"center"}>
        {currentPizza.flavors.map((flavor, i) => {
          const { ingredients, name } = getPizzaFlavorDescription(flavor)
          return (
            <Flex
              align={"center"}
              className="bg-gray-3 p-2 rounded-2 gap-2 min-w-28"
              key={flavor.code}
            >
              <SelectIngredients defaultFlavor={flavor}>
                <Flex
                  direction={"column"}
                  align={"start"}
                  justify={"start"}
                  flexGrow={"1"}
                  className="group hover:text-orange-11 "
                >
                  <Text>{name}</Text>
                  <Text
                    className="text-grass-11 group-hover:text-orange-11 scale-75 origin-left"
                    size={"1"}
                  >
                    {!!ingredients?.length && " "}
                    {ingredients?.length ? ` (${ingredients.join(", ")})` : ""}
                  </Text>
                  <Text size={"1"} className="scale-75 origin-left">
                    {currency(
                      getFlavorsValueBySize([flavor], currentPizza.size),
                    )}
                  </Text>
                  {/* <Text size={"1"} className="scale-75 origin-left">
                    {flavor.modifications.map((x) => x.fullName).join(", ")}
                  </Text> */}
                </Flex>
              </SelectIngredients>
              <IconButton
                size={"1"}
                variant="outline"
                color="red"
                className=""
                onClick={() => removeFlavor(flavor.code)}
              >
                <MdClose />
              </IconButton>
            </Flex>
          )
        })}
      </Flex>
    </Flex>
  )
}

{
  /* <DropdownMenu.Root key={x.code}>
                <DropdownMenu.Trigger>
                  <Button variant="soft">
                    <Flex gap="1">
                      <Text>{name}</Text>
                      <Text color="grass">
                        {!!ingredients && " "}
                        {ingredients ? ` (${ingredients.join(", ")})` : ""}
                      </Text>
                    </Flex>
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Item>Modificar</DropdownMenu.Item>
                  <DropdownMenu.Item color="red">Remover</DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root> */
}
