import { useOrders } from "@/app/context/Orders"
import { Text } from "@radix-ui/themes"
import { getTotal } from "@td/functions"
import { applyDiscount } from "@td/functions/src/calc"
import { currency } from "@td/functions/src/format"
import { useState } from "react"

export const BottomInfo = () => {
  const { notArchived } = useOrders()
  const [isMouseIn, setIsMouseIn] = useState(false)

  const total = notArchived?.length
    ? notArchived.reduce((acc, curr) => acc + getTotal(curr).total, 0)
    : 0
  const taxas = notArchived?.length
    ? notArchived.reduce(
        (acc, curr) =>
          acc +
          (curr.type === "delivery"
            ? applyDiscount(
                curr.address?.initialFee ?? 0,
                curr.address?.discount,
              )
            : 0),
        0,
      ) ?? 0
    : 0
  const pago = notArchived?.length
    ? notArchived.reduce(
        (acc, curr) =>
          acc +
          curr.payments
            .filter((x) => x.status === "paid")
            .reduce((_acc, _curr) => _acc + _curr.paidValue, 0),
        0,
      ) ?? 0
    : 0

  return (
    <center
      className="text-xs py-2 select-none"
      onMouseEnter={() => setIsMouseIn(true)}
      onMouseLeave={() => setIsMouseIn(false)}
    >
      <Text size={"1"} className="flex gap-2 justify-center">
        {!isMouseIn ? (
          `Pedidos: ${notArchived.length} | ${currency(total)}`
        ) : (
          <>
            <Text color="blue" title="Taxas de entrega">
              {currency(taxas)}
            </Text>
            <Text color="green" title="Valor pago">
              {currency(pago)}
            </Text>
            <Text color="red" title="Valor pendente">
              {currency(total - pago)}
            </Text>
          </>
        )}
      </Text>
    </center>
  )
}
