import { useCurrentWindow } from "@/app/context/CurrentWindow"
import { useCallback, useEffect } from "react"

export function useArrowAnywhere(
  THIS_WINDOW: string,
  onUpLeft: () => void,
  onDownRight: () => void,
  onEnter: () => void,
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
        case "ArrowUp":
        case "ArrowLeft":
          e.preventDefault()
          onUpLeft()
          break
        case "ArrowDown":
        case "ArrowRight":
          e.preventDefault()
          onDownRight()

          break
        case "Enter":
          onEnter()
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
