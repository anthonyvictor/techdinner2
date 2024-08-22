import { useCurrentWindow } from "@/app/context/CurrentWindow";
import { Identifier } from "@td/types";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
} from "react";

export function useMoveAnywhere(
  THIS_WINDOW: string,
  search: string,
  searchRef: MutableRefObject<HTMLInputElement | undefined>,
  items: Identifier[],
  currentItem: Identifier | undefined,
  setCurrentItem: (
    item: Identifier | undefined
  ) => void | Dispatch<SetStateAction<Identifier | undefined>>,
  currentItemRef: MutableRefObject<any | undefined>,
  containerRef: MutableRefObject<any | undefined>,
  enter: (item: Identifier) => void,
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

      const index = items.findIndex((item) => item.id === currentItem?.id);
      switch (e.key) {
        case "ArrowUp":
          if (!items.length) return;

          if (index > 0) {
            setCurrentItem(items[index - 1]);
          }

          break;
        case "ArrowDown":
          if (!items.length) return;

          if (index === -1) {
            setCurrentItem(items[0]);
          } else if (index + 1 < items.length) {
            const newFlavor = items[index + 1];
            setCurrentItem(newFlavor);
          }

          break;
        case "Enter":
          if (currentItem?.id) {
            enter?.(currentItem);
          } else if (items.length === 1) {
            enter?.(items[0]);
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
    if (currentItemRef?.current) {
      const eleTop = currentItemRef.current.offsetTop;
      const eleBottom = eleTop + currentItemRef.current.clientHeight;

      const containerTop = containerRef.current.scrollTop;
      const containerBottom = containerTop + containerRef.current.clientHeight;

      // The element is fully visible in the container
      if (
        !(eleTop >= containerTop && eleBottom <= containerBottom) ||
        // Some part of the element is visible in the container
        (eleTop < containerTop && containerTop > eleBottom) ||
        (eleTop < containerBottom && containerBottom > eleBottom)
      ) {
        currentItemRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [currentItemRef?.current]); //eslint-disable-line

  useEffect(() => {
    setCurrentItem(undefined);
  }, [search]); //eslint-disable-line
}
