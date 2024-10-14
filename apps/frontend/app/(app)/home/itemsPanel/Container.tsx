import { useHorizontalScroll } from "@/app/util/hooks/horizontalScroll"
import { createRef, ReactNode, useEffect, useState } from "react"

export const ItemsContainer = ({ children }: { children: ReactNode[] }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isScrollVisible, setIsScrollVisible] = useState(false)
  const containerRef = useHorizontalScroll<HTMLDivElement>()

  useEffect(() => {
    if (containerRef.current) {
      setIsScrollVisible(
        containerRef.current.scrollWidth > containerRef.current.clientWidth,
      )
    }
  }, [containerRef]) //eslint-disable-line

  // useEffect(() => {
  //   const el = containerRef.current;
  //   if (el) {
  //     const onWheel = (e: WheelEvent) => {
  //       console.log(e.deltaY);
  //       if (e.deltaY == 0) return;
  //       e.preventDefault();
  //       el.scrollTo({
  //         left: el.scrollLeft + e.deltaY + 30,
  //         behavior: "smooth",
  //       });
  //     };
  //     el.addEventListener("wheel", onWheel);
  //     return () => el.removeEventListener("wheel", onWheel);
  //   }
  // }, []); // eslint-disable-line

  if (!children.length) return <></>
  return (
    <>
      <div
        ref={containerRef}
        className={`flex gap-2 p-2 min-w-0
        shrink overflow-x-auto ${isHovered ? "" : "no-scroll"}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </div>

      {!isHovered && isScrollVisible && <div className="h-[7px]"></div>}
    </>
  )
}
