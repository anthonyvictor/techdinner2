import { Flex } from "@radix-ui/themes"

import { useSelectFlavor } from "."
import { ModalBottom } from "../../../ModalBottom"
import { useDrinkBuilder } from "@/app/context/itemBuilder/Drink"

export const Bottom = () => {
  const { currentFlavors, nextButtonRef } = useSelectFlavor()
  const { addDrinks } = useDrinkBuilder()

  return (
    <Flex direction={"column"} gap="2">
      <ModalBottom
        type="dialog"
        nextRef={nextButtonRef}
        onNext={() => addDrinks(currentFlavors)}
      />
    </Flex>
  )
}
