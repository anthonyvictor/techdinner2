import { ButtonProps, IconButton } from "@radix-ui/themes";
import { MutableRefObject } from "react";
import { CgClose } from "react-icons/cg";

export const CloseButton = (
  props: ButtonProps & { ref?: MutableRefObject<HTMLButtonElement | undefined> }
) => {
  return (
    <IconButton
      variant={props.variant ?? "outline"}
      color={props.color ?? "crimson"}
      size={props.size ?? "3"}
    >
      <CgClose />
    </IconButton>
  );
};
