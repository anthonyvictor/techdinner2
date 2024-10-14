import { Flex } from "@radix-ui/themes"
import { ModalBottom } from "../../../ModalBottom"
import { useOtherBuilder } from "@/app/context/itemBuilder/Other"
import { useSelectOptions } from "."

export const Bottom = () => {
  const { currentOptions, extras, nextButtonRef } = useSelectOptions()
  const { addOthers } = useOtherBuilder()

  return (
    <Flex direction={"column"} gap="2">
      <ModalBottom
        type="dialog"
        nextRef={nextButtonRef}
        onNext={() => {
          addOthers(currentOptions.map((x) => ({ ...x, finalExtras: extras })))
        }}
      />
    </Flex>
  )
}
