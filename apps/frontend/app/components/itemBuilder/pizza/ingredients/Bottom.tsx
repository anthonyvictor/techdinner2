import { usePizzaBuilder } from "@/app/context/itemBuilder/Pizza"
import { Flex } from "@radix-ui/themes"

import { useSelectIngredients } from "."
import { ModalBottom } from "@/app/components/ModalBottom"

export const Bottom = () => {
  const { addFlavor } = usePizzaBuilder()
  const { flavor, nextButtonRef } = useSelectIngredients()

  return (
    <Flex direction={"column"} gap="2">
      <ModalBottom
        type="dialog"
        nextRef={nextButtonRef}
        onNext={() => addFlavor(flavor)}
      />
    </Flex>
  )
}
