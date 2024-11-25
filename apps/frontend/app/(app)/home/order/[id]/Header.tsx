import { useHome } from "@/app/context/Home"
import { useOrders } from "@/app/context/Orders"
import { Badge, Flex, IconButton } from "@radix-ui/themes"
import { getDuration } from "@td/functions"
import { useEffect, useState } from "react"
import { IoCloseCircle, IoMenu } from "react-icons/io5"

export const Header = () => {
  const { closeOrder, setShowPanel } = useHome()

  const { currentOrder: _currOrderId, getCurrentOrder } = useOrders()

  const currentOrder = _currOrderId ? getCurrentOrder() : undefined
  const [duration, setDuration] = useState(getDuration(currentOrder?.createdAt))

  useEffect(() => {
    let inteval: NodeJS.Timeout

    if (currentOrder) {
      inteval = setInterval(() => {
        setDuration(getDuration(currentOrder.createdAt))
      }, 1000 * 60)
    }
    return () => {
      clearInterval(inteval)
    }
  }, [currentOrder])

  if (!currentOrder) return <></>

  return (
    <Flex justify={"between"} align={"center"}>
      <IconButton
        variant="ghost"
        asChild
        onClick={() => {
          setShowPanel((prev) => !prev)
        }}
      >
        <button>
          <IoMenu className="text-4xl md:text-2xl" />
        </button>
      </IconButton>
      <Badge title={currentOrder.id}>
        {currentOrder?.number
          ? `#${currentOrder.number}`
          : currentOrder.id.slice(0, 5)}
      </Badge>
      {(() => {
        return (
          <Badge color={duration?.color}>
            {currentOrder?.createdAt.toLocaleString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Badge>
        )
      })()}
      <IconButton variant="ghost" asChild onClick={closeOrder}>
        <button>
          <IoCloseCircle className="text-4xl md:text-2xl" />
        </button>
      </IconButton>
    </Flex>
  )
}
