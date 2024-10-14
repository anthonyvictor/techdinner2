import { Flex } from "@radix-ui/themes"
import { groupSelectedOthers } from "@td/functions"
import { Fragment } from "react"
import { useOtherBuilder } from "@/app/context/itemBuilder/Other"
import { IBuildingOther } from "@td/types"
import { SelectedOthers } from "./SelectedOthers"
import { Other } from "./Other"
import { ItemCategory } from "../Category"
import { Ref } from "@/app/infra/types/ref"

export const Others = () => {
  const {
    currentOthers,
    removeOther,
    filteredCategories,
    othersListRef,
    groupedOthers,
  } = useOtherBuilder()

  return (
    <Flex
      direction={"column"}
      className="w-full min-h-0 flex-1  
      basis-1 gap-1"
    >
      <Flex
        direction={"column"}
        ref={othersListRef as Ref<HTMLDivElement>}
        className="w-full min-h-0 flex-1 
            basis-1 overflow-y-auto gap-2
            items-start content-start"
      >
        {filteredCategories.map((category) => (
          <Fragment key={category.id}>
            <ItemCategory category={category.fullName} />
            <div className="flex flex-wrap w-full gap-2 items-start content-start ">
              {(category.others ?? []).map((other) => (
                <Other key={other.id} other={other} />
              ))}
            </div>
          </Fragment>
        ))}
      </Flex>

      <SelectedOthers
        groups={groupedOthers as IBuildingOther[][]}
        removeOther={removeOther}
      />
    </Flex>
  )
}
