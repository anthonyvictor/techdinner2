import { HTMLProps } from "react"

export const MyCard = ({
  type,
  className,
  ...props
}: HTMLProps<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={`relative overflow-visible bg-gray-4 rounded-4 p-2 border-[1px] border-gray-6
          hover:border-gray-8 ${className}`}
    />
  )
}
