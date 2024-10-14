import { HTMLProps } from "react"

export const MyContainer = ({
  type,
  className,
  ...props
}: HTMLProps<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={`relative bg-gray-3 rounded-4 p-1 border-[1px] border-gray-6 ${className}`}
    />
  )
}
