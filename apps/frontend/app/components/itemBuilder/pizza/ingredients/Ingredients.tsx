import { Flex } from "@radix-ui/themes"
import { useSelectIngredients } from "."
import { useEffect } from "react"
import { Ref } from "@/app/infra/types/ref"
import { Ingredient } from "./Ingredient"
import { Modifications } from "./Modifications"

export const Ingredients = () => {
  const { filteredIngredients, ingredientsListRef } = useSelectIngredients()

  return (
    <Flex direction={"column"} className="w-full flex-1 basis-52 gap-1">
      <Flex
        direction={"column"}
        ref={ingredientsListRef as Ref<HTMLDivElement>}
        className="w-full min-h-72 flex-1 
            basis-1 overflow-y-auto gap-2
            items-start content-start"
      >
        <div className="flex flex-wrap w-full gap-2 items-start content-start">
          {filteredIngredients.map((ingredient) => (
            <Ingredient key={ingredient.id} ingredient={ingredient} />
          ))}
        </div>
      </Flex>
      <Modifications />
    </Flex>
  )
}
