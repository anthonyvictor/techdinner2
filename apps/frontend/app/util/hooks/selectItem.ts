import { Ref } from "@/app/infra/types/ref"
import { SetState } from "@/app/infra/types/setState"
import { Identifier } from "@td/types"
import { useEffect } from "react"

export function useSelectItem(
  items: Identifier[],
  currentItem: Identifier | undefined,
  setCurrentItem: (
    item: Identifier | undefined,
  ) => void | SetState<Identifier | undefined>,
  currentItemRef: Ref<any | undefined>,
  containerRef: Ref<any | undefined>,
  searchString: string,
) {
  const nextItem = () => {
    if (!items.length) return
    const index = items.findIndex((item) => item.id === currentItem?.id)

    if (currentItem?.id) {
      if (index + 1 < items.length) setCurrentItem(items[index + 1])
    } else {
      setCurrentItem(items[0])
    }
  }

  const previousItem = () => {
    if (!items.length) return
    const index = items.findIndex((item) => item.id === currentItem?.id)

    if (currentItem?.id) {
      if (index - 1 > -1) setCurrentItem(items[index - 1])
    }
  }

  // useEffect(() => {
  //   if (currentItemRef?.current)
  //     currentItemRef.current.scrollIntoView({ behavior: "smooth" })
  // }, [currentItemRef?.current]) //eslint-disable-line

  useEffect(() => {
    if (currentItemRef?.current) {
      const eleTop = currentItemRef.current.offsetTop
      const eleBottom = eleTop + currentItemRef.current.clientHeight

      const containerTop = containerRef?.current?.scrollTop
      if (containerTop !== undefined) {
        const containerBottom = containerTop + containerRef.current.clientHeight

        // The element is fully visible in the container
        if (
          !(eleTop >= containerTop && eleBottom <= containerBottom) ||
          // Some part of the element is visible in the container
          (eleTop < containerTop && containerTop > eleBottom) ||
          (eleTop < containerBottom && containerBottom > eleBottom)
        ) {
          currentItemRef.current.scrollIntoView({ behavior: "smooth" })
        }
      }
    }
  }, [currentItemRef?.current]) //eslint-disable-line

  useEffect(() => {
    if (items.length === 1) {
      setCurrentItem(items[0])
    } else {
      setCurrentItem(undefined)
    }
  }, [searchString]) //eslint-disable-line

  return { nextItem, previousItem }
}
