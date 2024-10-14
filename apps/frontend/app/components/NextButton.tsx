import { Button, ButtonProps } from "@radix-ui/themes"
import { ForwardedRef, forwardRef } from "react"
import { Ref } from "../infra/types/ref"

export const NextButtonComponent = (
  props: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) => {
  return (
    <Button
      color={props.color ?? "green"}
      size={props.size ?? "3"}
      className={props.className ?? "flex-1"}
      ref={ref as Ref<HTMLButtonElement>}
    >
      Avançar
    </Button>
  )
}

export const NextButton = forwardRef(NextButtonComponent)
