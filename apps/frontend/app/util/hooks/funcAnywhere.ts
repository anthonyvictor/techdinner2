import { useCurrentWindow } from "@/app/context/CurrentWindow";
import { useCallback, useEffect } from "react";

export function useFuncAnywhere(
  THIS_WINDOW: string,
  f1: () => void,
  f2: (() => void) | undefined,
  f3: (() => void) | undefined,
  f4: (() => void) | undefined,
  dependencies: any[]
) {
  const { currentWindow } = useCurrentWindow();

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (currentWindow !== THIS_WINDOW) return;

      if (["F1", "F2", "F3", "F4"].includes(e.key)) e.preventDefault();
      e.stopPropagation();

      switch (e.key) {
        case "F1":
          f1();
          break;
        case "F2":
          f2?.();
          break;
        case "F3":
          f3?.();
          break;
        case "F4":
          f4?.();
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
}
