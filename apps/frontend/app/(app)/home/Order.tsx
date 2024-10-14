"use client"
import { MyAvatar } from "@/app/components/MyAvatar"
import { useHome } from "@/app/context/Home"
import { Avatar, Badge, Box, Card, Flex, Text } from "@radix-ui/themes"
import {
  getCustomerName,
  getDuration,
  getPaymentStatus,
  getPrintStatus,
  getType,
  initials,
} from "@td/functions"
import { IOrder } from "@td/types"
import { useEffect, useState } from "react"
import { IconBase } from "react-icons"
import { BiPrinter } from "react-icons/bi"
import { FaPause } from "react-icons/fa"

export const Order = ({ order }: { order: IOrder }) => {
  const itemsWithSteps = order && order.items.filter((x) => !!x.steps)
  const doneItems =
    itemsWithSteps &&
    itemsWithSteps.filter(
      (x) => x.steps && x.steps.some((y) => y.type === "done"),
    )

  const notAccepted = order && order.method === "auto" && !order.acceptedAt
  const someDone = doneItems.length && itemsWithSteps.length > doneItems.length
  const allDone = doneItems.length && itemsWithSteps.length === doneItems.length
  const somePaused = itemsWithSteps.some((x) => x.pausedUntil)

  const { openOrder } = useHome()

  const [duration, setDuration] = useState(getDuration(order?.createdAt))

  useEffect(() => {
    let inteval: NodeJS.Timeout

    if (order) {
      setInterval(() => {
        setDuration(getDuration(order.createdAt))
      }, 1000 * 60)
    }
    return () => {
      clearInterval(inteval)
    }
  }, []) //eslint-disable-line

  return (
    <Card
      asChild
      key={order.id}
      style={{
        width: "100%",
        minHeight: "50px",
        paddingInline: 6,
        paddingBlock: 3,
        cursor: "pointer",
      }}
      className="w-full relative"
    >
      <button onClick={() => openOrder(order)}>
        <Flex gap="2" align={"center"} className="justify-stretch">
          <Box className="relative">
            <MyAvatar
              size="2"
              src={order.customer?.imageUrl ?? ""}
              radius="large"
              fallback={initials(order.customer, "CD")}
            />
            {(() => {
              const { emoji1, color, icon: Icon } = getType(order)

              return (
                <Flex
                  className={`absolute w-5 h-5 right-0 bottom-0 
                  translate-x-1 translate-y-1 border-2 border-black 
                  rounded-full bg-gray-12 text-xs flex justify-center items-center`}
                >
                  <IconBase color={color} className="scale-75">
                    <Icon></Icon>
                  </IconBase>
                </Flex>
              )
            })()}
          </Box>
          <Box>
            <Text size={"2"}>
              {order.number ? `#${order.number} - ` : ""}
              {(() => {
                const customerName = getCustomerName(order, true)
                const name =
                  customerName.toLowerCase().replace(/[^0-9a-z]/g, "").length >
                  0
                    ? customerName
                    : "Sem cliente"
                return <>{name}</>
              })()}
            </Text>
            <Flex gap="2" align={"center"}>
              {(() => {
                return (
                  <Text size={"1"} color={duration?.color}>
                    {duration?.formattedValue}
                  </Text>
                )
              })()}

              {(() => {
                const { color, formattedTotalValue } = getPaymentStatus(order)

                return (
                  <Text size="1" color={color}>
                    {formattedTotalValue}
                  </Text>
                )
              })()}

              {(() => {
                const { color } = getPrintStatus(order)

                return (
                  <Text size="1" color={color}>
                    <BiPrinter />
                  </Text>
                )
              })()}

              {[notAccepted, someDone, allDone, somePaused].some(
                (x) => x === true,
              ) &&
                (() => {
                  return (
                    <Badge
                      size="1"
                      className={`text-xs ${allDone || somePaused ? "animate-pulse animate-duration-200" : ""}`}
                      color={
                        notAccepted
                          ? "amber"
                          : somePaused
                            ? "pink"
                            : allDone
                              ? "green"
                              : "blue"
                      }
                    >
                      <Text size="1">
                        {notAccepted ? "Novo" : somePaused ? <FaPause /> : "OK"}
                      </Text>
                    </Badge>
                  )
                })()}
            </Flex>
          </Box>
        </Flex>
      </button>
    </Card>
  )
}
