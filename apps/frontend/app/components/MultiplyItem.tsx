import { Dialog, Flex, Text, TextField, VisuallyHidden } from "@radix-ui/themes"
import { ContrDialog } from "./ControlledDialog"
import { createRef, useState } from "react"
import { ModalBottom } from "./ModalBottom"
import { SetState } from "../infra/types/setState"
import { Ref } from "../infra/types/ref"

export const Multiply = ({
  isOpen,
  setIsOpen,
  onNext,
}: {
  isOpen: boolean
  setIsOpen: SetState<boolean>
  onNext: (value: number) => void
}) => {
  const [value, setValue] = useState(1)

  const nextRef = createRef<HTMLButtonElement>()

  return (
    <ContrDialog open={isOpen} setOpen={setIsOpen}>
      <>
        <VisuallyHidden>
          <Dialog.Title>Build Item</Dialog.Title>
          <Dialog.Description>Build item</Dialog.Description>
        </VisuallyHidden>

        <Dialog.Content aria-describedby={undefined}>
          <Flex direction={"column"} gap={"2"}>
            <TextField.Root
              placeholder="10"
              type="number"
              value={value}
              min={0}
              max={99}
              onChange={(e) => {
                setValue(Number(e.target.value.replace(/[^0-9]/g, "")))
              }}
              onKeyDown={(e) => {
                if (
                  ![..."0123456789".split(""), "Backspace", "Enter"].includes(
                    e.key,
                  )
                ) {
                  e.preventDefault()
                } else if (e.key === "Enter") {
                  if (value > 0) nextRef.current?.click()
                }
              }}
            />
            <Text size={"1"}>
              Pressione {`"Enter"`} após digitar a quantidade desejada
            </Text>
            <ModalBottom
              nextRef={nextRef as Ref<HTMLButtonElement>}
              onNext={() => {
                if (value > 0) {
                  onNext(Number(value))
                  setValue(1)
                }
              }}
              type="dialog"
            />
          </Flex>
        </Dialog.Content>
      </>
    </ContrDialog>
  )
}
