import { usePizzaBuilder } from "@/app/context/itemBuilder/Pizza"
import { Flex } from "@radix-ui/themes"
import { ItemCategory } from "../Category"
import { Flavor } from "./Flavor"
import { SelectedFlavors } from "./SelectedFlavors"
import { Fragment } from "react"
import { Ref } from "@/app/infra/types/ref"

export const Flavors = () => {
  const { filteredGroups, flavorsListRef } = usePizzaBuilder()

  return (
    <Flex
      direction={"column"}
      className="w-full min-h-0 flex-1 
      basis-1 gap-1"
    >
      <Flex
        direction={"column"}
        ref={flavorsListRef as Ref<HTMLDivElement>}
        className="w-full min-h-0 flex-1 no-scroll
            basis-1 overflow-y-auto gap-2
            items-start content-start"
      >
        {filteredGroups
          .filter((x) => x.flavors.length)
          .map((group) => (
            <Fragment key={group.id}>
              <ItemCategory category={group.fullName} />
              <>
                <div
                  className="flex flex-wrap 
            w-full  
             gap-2
            items-start content-start"
                >
                  {group.flavors.map((flavor) => (
                    <Flavor key={flavor.id} flavor={flavor} />
                  ))}
                </div>
              </>
            </Fragment>
          ))}
      </Flex>

      <SelectedFlavors />
    </Flex>
  )
}
