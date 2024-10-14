import { Flex } from "@radix-ui/themes"
import { ModalBottom } from "../../../ModalBottom"
// import { useOtherBuilder } from "@/app/context/itemBuilder/Other"
import { useSelectComponents } from "."

export const Bottom = () => {
  const { nextButtonRef } = useSelectComponents()
  // const { addOthers } = useOtherBuilder()

  return (
    <Flex direction={"column"} gap="2">
      <ModalBottom
        type="dialog"
        nextRef={nextButtonRef}
        onNext={() => {
          // addOthers(currentOptions.map((x) => ({ ...x, finalExtras: extras })))
        }}
      />
    </Flex>
  )
}
