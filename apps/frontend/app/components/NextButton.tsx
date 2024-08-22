import { Button, ButtonProps } from "@radix-ui/themes";
import { ForwardedRef, forwardRef, MutableRefObject, RefObject } from "react";

export const NextButtonComponent = (
  props: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) => {
  return (
    <Button
      color={props.color ?? "green"}
      size={props.size ?? "3"}
      className={props.className ?? "flex-1"}
      ref={ref as RefObject<HTMLButtonElement>}
    >
      Avançar
    </Button>
  );
};

export const NextButton = forwardRef(NextButtonComponent);
