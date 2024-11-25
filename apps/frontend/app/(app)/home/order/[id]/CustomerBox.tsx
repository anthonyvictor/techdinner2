import { MyAvatar } from "@/app/components/MyAvatar"
import { useOrders } from "@/app/context/Orders"
import {
  Badge,
  Flex,
  IconButton,
  Separator,
  Strong,
  Text,
} from "@radix-ui/themes"
import { getCustomerName } from "@td/functions"
import { applyDiscount } from "@td/functions/src/calc"
import {
  address,
  currency,
  initials,
  phoneNumber,
} from "@td/functions/src/format"
import { FaMapMarkedAlt } from "react-icons/fa"

export const CustomerBox = () => {
  const { currentOrder: _currOrder, getCurrentOrder } = useOrders()

  const currentOrder = _currOrder ? getCurrentOrder() : undefined

  if (!currentOrder) return <></>

  return (
    <Flex gap="2" direction={"column"}>
      <Flex gap="2">
        <MyAvatar
          size={"5"}
          // src={currentOrder.customer?.imageUrl}
          src={currentOrder?.customer?.imageUrl}
          fallback={
            // currentOrder.customer?.initials ?? currentOrder.title ?? "CD"
            initials(currentOrder?.customer, currentOrder?.title) ?? "CD"
          }
        />
        <Flex direction={"column"}>
          <Text>
            {(() => {
              // const name = getCustomerName(currentOrder)
              // return name ?? currentOrder.title ?? "Cliente Desconhecido"
              const name = getCustomerName(currentOrder)
              return name ?? currentOrder?.title ?? "Cliente Desconhecido"
            })()}
          </Text>
          {/* {currentOrder.customer?.tags && ( */}
          {currentOrder?.customer?.tags && (
            <Text size={"1"}>
              {/* {(currentOrder.customer?.tags ?? [])
                .map((x) => x.value)
                .join(", ")} */}
              {(currentOrder?.customer?.tags ?? []).join(", ")}
            </Text>
          )}
          {/* {currentOrder.customer?.phoneNumbers && (
            <ul className="overflow-x-auto">
              <Badge size={"1"}>
                {(currentOrder.customer?.phoneNumbers ?? [])
                  .map((x) => phoneNumber(x.value))
                  .join(", ")}
              </Badge>
            </ul>
          )} */}
          {currentOrder?.customer?.phoneNumbers && (
            <ul className="overflow-x-auto">
              <Badge size={"1"}>
                {(currentOrder?.customer?.phoneNumbers ?? [])
                  .map((x) => phoneNumber(x.value))
                  .join(", ")}
              </Badge>
            </ul>
          )}
        </Flex>
      </Flex>
      {/* {currentOrder.type === "delivery" && currentOrder.address ? ( */}
      {currentOrder?.type === "delivery" && currentOrder?.address ? (
        <Flex gap={"1"}>
          <IconButton variant="surface">
            <FaMapMarkedAlt />
          </IconButton>
          <Text size={"1"}>
            <Strong>
              {currency(
                applyDiscount(
                  // currentOrder.address.initialFee,
                  // currentOrder.address.discount,
                  currentOrder?.address.initialFee,
                  currentOrder?.address.discount,
                ),
              )}
            </Strong>
            {" - "}
            {/* <Text>{address(currentOrder.address)}</Text> */}
            <Text>{address(currentOrder.address)}</Text>
          </Text>
        </Flex>
      ) : // ) : currentOrder.type === "withdraw" ? (
      currentOrder.type === "withdraw" ? (
        <></>
      ) : (
        <></>
      )}
      <Separator size={"4"} />
    </Flex>
  )
}
