import {
  AlertDialog,
  Button,
  Dialog,
  Flex,
  IconButton,
} from "@radix-ui/themes";
import { MutableRefObject, ReactNode, RefObject } from "react";
import { CgClose } from "react-icons/cg";
import { useContrDialog } from "./ControlledDialog";

export const ModalBottom = ({
  type,
  nextRef,
  beforeCancel,
  beforeNext,
  onNext,
}: {
  type: "dialog" | "alert";
  nextRef: MutableRefObject<HTMLButtonElement | undefined>;
  beforeCancel?: () => boolean;
  beforeNext?: () => boolean;
  onNext?: () => void;
}) => {
  const { setOpen } = useContrDialog();

  return (
    <Flex gap="2" justify={"center"}>
      <IconButton
        variant="outline"
        color="crimson"
        size={"3"}
        onClick={() => {
          if ((beforeCancel && beforeCancel()) || !beforeCancel) {
            setOpen(false);
          }
        }}
      >
        <CgClose />
      </IconButton>
      <Button
        color="green"
        size={"3"}
        className="flex-1"
        ref={nextRef as RefObject<HTMLButtonElement>}
        onClick={() => {
          if ((beforeNext && beforeNext()) || !beforeNext) {
            onNext?.();
            setOpen(false);
          }
        }}
      >
        Avançar
      </Button>
    </Flex>
  );
};
