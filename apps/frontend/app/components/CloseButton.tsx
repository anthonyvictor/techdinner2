import { ButtonProps, IconButton } from "@radix-ui/themes"
import { CgClose } from "react-icons/cg"
import { Ref } from "../infra/types/ref"

export const CloseButton = (
  props: ButtonProps & { ref?: Ref<HTMLButtonElement | undefined> },
) => {
  return (
    <IconButton
      variant={props.variant ?? "outline"}
      color={props.color ?? "crimson"}
      size={props.size ?? "3"}
    >
      <CgClose />
    </IconButton>
  )
}
