import { useCurrentWindow } from "@/app/context/CurrentWindow";
import { Identifier } from "@td/types";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
} from "react";

export function useAddSubtractAnywhere(
  THIS_WINDOW: string,
  searchRef: MutableRefObject<HTMLInputElement | undefined>,
  items: Identifier[],
  currentItem: Identifier | undefined,
  setCurrentItem: (
    item: Identifier | undefined
  ) => void | Dispatch<SetStateAction<Identifier | undefined>>,
  currentItemRef: MutableRefObject<any | undefined>,
  dependencies: any[]
  // id: string
) {
  const { currentWindow } = useCurrentWindow();

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (
        currentWindow !== THIS_WINDOW ||
        (document.activeElement !== searchRef?.current &&
          (document.activeElement instanceof HTMLInputElement ||
            document.activeElement instanceof HTMLTextAreaElement))
      )
        return;

      if (!items.length) return;
      const index = items.findIndex((item) => item.id === currentItem?.id);
      switch (e.key) {
        case "+":
          if (currentItem?.id) {
            if (index + 1 < items.length) setCurrentItem(items[index + 1]);
          } else {
            setCurrentItem(items[0]);
          }

          break;
        case "-":
          if (currentItem?.id) {
            if (index - 1 > -1) setCurrentItem(items[index - 1]);
          }

          break;
        default:
      }
    },
    dependencies //eslint-disable-line
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, dependencies); //eslint-disable-line

  useEffect(() => {
    if (currentItemRef?.current)
      currentItemRef.current.scrollIntoView({ behavior: "smooth" });
  }, [currentItemRef?.current]); //eslint-disable-line
}
