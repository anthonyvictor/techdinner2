import { useCurrentWindow } from "@/app/context/CurrentWindow";
import { ascii } from "@/app/infra/data/ascii";
import { MutableRefObject, useEffect } from "react";

export function useInputAnywhere(
  THIS_WINDOW: string,
  ref: MutableRefObject<HTMLTextAreaElement | HTMLInputElement | undefined>,
  searchInputId: string
) {
  const { currentWindow } = useCurrentWindow();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (currentWindow !== THIS_WINDOW) return;
      if (
        ref?.current &&
        document.activeElement !== ref?.current &&
        !(document.activeElement instanceof HTMLInputElement) &&
        !(document.activeElement instanceof HTMLTextAreaElement) &&
        ascii.some((x) => e.key === x)
      ) {
        e.stopPropagation();
        ref?.current?.focus?.();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [ref, ref?.current]); // eslint-disable-line

  useEffect(() => {
    const el = document.querySelector(searchInputId);
    if (el) ref.current = el as HTMLInputElement;
  }, []); //eslint-disable-line
}
