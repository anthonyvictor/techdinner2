import { useCurrentWindow } from "@/app/context/CurrentWindow"
import { useCallback, useEffect } from "react"

export function useAddSubtractAnywhere(
  THIS_WINDOW: string,
  onAdd: () => void,
  onSubtract: () => void,
  keyableIn: (HTMLInputElement | HTMLTextAreaElement | undefined)[],
  dependencies: any[],
) {
  const { currentWindow } = useCurrentWindow()

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (
        currentWindow !== THIS_WINDOW ||
        (keyableIn.filter(Boolean).every((x) => document.activeElement !== x) &&
          [HTMLInputElement, HTMLTextAreaElement].some(
            (x) => document.activeElement instanceof x,
          ))
      )
        return

      switch (e.key) {
        case "+":
          e.preventDefault()
          onAdd()

          break
        case "-":
          e.preventDefault()
          onSubtract()
          break
        default:
      }
    },
    dependencies, //eslint-disable-line
  )

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, dependencies) //eslint-disable-line
}
