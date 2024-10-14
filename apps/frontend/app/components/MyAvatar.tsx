import { Avatar, AvatarProps } from "@radix-ui/themes"
import { useState } from "react"

export const MyAvatar = ({
  className,
  src,
  fetchPriority,
  ...props
}: AvatarProps) => {
  const [error, setError] = useState(false)
  return (
    <Avatar
      className={`${error || !src ? "opacity-100" : "bg-gray-12"} ${className}`}
      src={src}
      {...props}
      onError={() => setError(true)}
      fetchPriority={fetchPriority ?? "high"}
    />
  )
}
