import {
  Box,
  Card,
  ContextMenu,
  Flex,
  IconButton,
  Strong,
  Text,
} from "@radix-ui/themes";
import {
  getIngredientModifType,
  getPizzaIngredientModificationIs,
  getValueBySize,
  name,
} from "@td/functions";
import {
  IBuildingPizzaFlavor,
  IBuildingPizzaFlavorIngredient,
  IBuildingPizzaFlavorIngredientType,
  IPizzaFlavorIngredient,
} from "@td/types";
import { FaPlus } from "react-icons/fa";
import { useSelectIngredients } from "./SelectIngredients";
import { RefObject, useEffect } from "react";
import { usePizzaBuilder } from "@/app/context/itemBuilder/Pizza";

export const Ingredients = () => {
  const {
    flavor,
    setFlavor,
    filteredIngredients,
    setSearchIngredients,
    setIngredient,
    hoveredIngredient,
    hoveredIngredientRef,
    ingredientsListRef,
  } = useSelectIngredients();

  const { currentPizza } = usePizzaBuilder();

  useEffect(() => {
    setSearchIngredients("");
  }, [flavor]); //eslint-disable-line

  const Item = ({
    label,
    ingredient,
    is,
  }: {
    label: string;
    ingredient: IPizzaFlavorIngredient;
    is: IBuildingPizzaFlavorIngredientType;
  }) => {
    const setIngredientWithSpecialIs = () => {
      setFlavor((prev) => ({
        ...prev,
        modifications: [
          ...(prev.modifications ?? []).filter((x) => x.id !== ingredient.id),
          {
            ...ingredient,
            is,
            finalValue: ["with", "quite"].some((y) => is === y)
              ? getValueBySize(currentPizza.size, ingredient.values)
              : 0,
          },
        ],
      }));
    };
    return (
      <ContextMenu.Item onClick={setIngredientWithSpecialIs}>
        {label}
      </ContextMenu.Item>
    );
  };

  return (
    <Flex direction={"column"} className="w-full flex-1 basis-52 gap-1">
      <Flex
        direction={"column"}
        ref={ingredientsListRef as RefObject<HTMLDivElement>}
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
          {filteredIngredients.map((ingredient) => {
            const { isDefault, isWith, isWithout, isLess, isQuite } =
              getPizzaIngredientModificationIs(
                flavor.ingredients,
                flavor.modifications,
                ingredient
              );

            return (
              <ContextMenu.Root key={ingredient.id}>
                <ContextMenu.Trigger>
                  <Card
                    variant="surface"
                    id={`ingredient=${ingredient.id}`}
                    ref={
                      hoveredIngredient?.id === ingredient.id
                        ? (hoveredIngredientRef as RefObject<HTMLDivElement>)
                        : undefined
                    }
                    asChild
                    className={`shrink-0 
                    w-[100%] md:w-[31.99%] p-2 ${
                      hoveredIngredient?.id === ingredient.id
                        ? "bg-yellow-8"
                        : isWith
                          ? "bg-green-5"
                          : isWithout
                            ? "bg-red-5"
                            : isLess
                              ? "bg-blue-5"
                              : isQuite
                                ? "bg-yellow-5"
                                : isDefault
                                  ? "bg-orange-5"
                                  : ""
                    }`}
                  >
                    <button onClick={() => setIngredient(ingredient)}>
                      <Box width={"100%"}>
                        <Text truncate as="p">
                          {name(ingredient)}
                        </Text>
                        <Text size={"1"} color="gray" truncate as="p">
                          {ingredient.fullName}
                        </Text>
                      </Box>
                    </button>
                  </Card>
                </ContextMenu.Trigger>
                <ContextMenu.Content>
                  <Item label="Bastante" ingredient={ingredient} is="quite" />
                  <Item label="Pouco" ingredient={ingredient} is="less" />
                </ContextMenu.Content>
              </ContextMenu.Root>
            );
          })}
        </div>
      </Flex>
      <Text align={"center"}>
        Modificações:{" "}
        <Strong>
          {(flavor.modifications ?? [])
            .map((x) => `${getIngredientModifType(x)} ${name(x)}`)
            .join(", ")}
        </Strong>
      </Text>
    </Flex>
  );
};
