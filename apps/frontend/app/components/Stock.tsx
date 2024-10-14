import { Text } from "@radix-ui/themes"
import { playSound } from "../util/functions/playSound"
import { HTMLProps, useEffect, useState } from "react"

export const Stock = ({
  stock,
  label,
  className,
}: {
  stock: number
  label?: string
  className?: HTMLProps<HTMLParagraphElement>["className"]
}) => {
  const [old, setOld] = useState(stock)

  useEffect(() => {
    if (stock < old && stock === 0) {
      playSound("/audio/success01.wav")
    }
    setOld(stock)
  }, [stock])

  return <Text className={`${className}`}>{label}</Text>
}
