import { usePizzaBuilder } from "@/app/context/itemBuilder/Pizza"
import { Box, Card, ContextMenu, Text } from "@radix-ui/themes"
import {
  getPizzaIngredientModificationIs,
  getValueBySize,
  name,
} from "@td/functions"
import { ItemComponentType, IPizzaFlavorIngredient } from "@td/types"
import { useSelectIngredients } from "."
import { Ref } from "@/app/infra/types/ref"

export const Ingredient = ({
  ingredient,
}: {
  ingredient: IPizzaFlavorIngredient
}) => {
  const { currentPizza } = usePizzaBuilder()
  const {
    flavor,
    setFlavor,
    hoveredIngredient,
    hoveredIngredientRef,
    setIngredient,
  } = useSelectIngredients()

  const { isDefault, isWith, isWithout, isLess, isQuite } =
    getPizzaIngredientModificationIs(
      flavor.ingredients,
      flavor.modifications,
      ingredient,
    )

  const Item = ({
    label,
    ingredient,
    is,
  }: {
    label: string
    ingredient: IPizzaFlavorIngredient
    is: ItemComponentType
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
      }))
    }
    return (
      <ContextMenu.Item onClick={setIngredientWithSpecialIs}>
        {label}
      </ContextMenu.Item>
    )
  }

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <Card
          variant="surface"
          id={`ingredient=${ingredient.id}`}
          ref={
            hoveredIngredient?.id === ingredient.id
              ? (hoveredIngredientRef as Ref<HTMLDivElement>)
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
  )
}
