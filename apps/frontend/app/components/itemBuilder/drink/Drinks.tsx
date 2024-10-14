import { Flex } from "@radix-ui/themes"
import { groupSelectedDrinks } from "@td/functions"
import { Fragment } from "react"
import { useDrinkBuilder } from "@/app/context/itemBuilder/Drink"
import { IBuildingDrink } from "@td/types"
import { SelectedDrinks } from "./SelectedDrinks"
import { Drink } from "./Drink"
import { ItemCategory } from "../Category"
import { Ref } from "@/app/infra/types/ref"

export const Drinks = () => {
  const { currentDrinks, removeDrink, filteredCategories, drinksListRef } =
    useDrinkBuilder()

  const groupedDrinks = currentDrinks?.length
    ? groupSelectedDrinks(currentDrinks)
    : []

  return (
    <Flex
      direction={"column"}
      className="w-full min-h-0 flex-1  
      basis-1 gap-1"
    >
      <Flex
        direction={"column"}
        ref={drinksListRef as Ref<HTMLDivElement>}
        className="w-full min-h-0 flex-1 
            basis-1 overflow-y-auto gap-2
            items-start content-start"
      >
        {filteredCategories.map((category) => (
          <Fragment key={category.id}>
            <ItemCategory category={category.fullName} />
            <div className="flex flex-wrap w-full gap-2 items-start content-start ">
              {(category.drinks ?? []).map((drink) => (
                <Drink key={drink.id} drink={drink} />
              ))}
            </div>
          </Fragment>
        ))}
      </Flex>

      <SelectedDrinks
        groups={groupedDrinks as IBuildingDrink[][]}
        removeDrink={removeDrink}
      />
    </Flex>
  )
}
