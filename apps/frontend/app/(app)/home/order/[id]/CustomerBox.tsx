import { useHome } from "@/app/context/Home"
import {
  Avatar,
  Badge,
  Box,
  Flex,
  Separator,
  Strong,
  Text,
} from "@radix-ui/themes"
import { getCustomerName } from "@td/functions"
import { applyDiscount } from "@td/functions/src/calc"
import { startsWith } from "@td/functions/src/filters"
import { address, currency, phoneNumber } from "@td/functions/src/format"
import { useEffect } from "react"

export const CustomerBox = () => {
  const { currentOrder } = useHome()

  return (
    <Flex gap="2" direction={"column"}>
      <Flex gap="2">
        <Avatar
          size={"5"}
          src={currentOrder.customer?.imageUrl}
          fallback={
            currentOrder.customer?.initials ?? currentOrder.title ?? "CD"
          }
        />
        <Flex direction={"column"}>
          <Text>
            {(() => {
              const name = getCustomerName(currentOrder)
              return name ?? currentOrder.title ?? "Cliente Desconhecido"
            })()}
          </Text>
          {currentOrder.customer?.tags && (
            <Text size={"1"}>
              {(currentOrder.customer?.tags ?? [])
                .map((x) => x.value)
                .join(", ")}
            </Text>
          )}
          {currentOrder.customer?.phoneNumbers && (
            <ul className="overflow-x-auto">
              <Badge size={"1"}>
                {(currentOrder.customer?.phoneNumbers ?? [])
                  .map((x) => phoneNumber(x.value))
                  .join(", ")}
              </Badge>
            </ul>
          )}
        </Flex>
      </Flex>
      {currentOrder.type === "delivery" && currentOrder.address ? (
        <Text size={"1"}>
          <Strong>
            {currency(
              applyDiscount(
                currentOrder.address.initialFee,
                currentOrder.address.discount,
              ),
            )}
          </Strong>
          {" - "}
          <Text>{address(currentOrder.address)}</Text>
        </Text>
      ) : currentOrder.type === "withdraw" ? (
        <></>
      ) : (
        <></>
      )}
      <Separator size={"4"} />
    </Flex>
  )
}
