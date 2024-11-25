import {
  IOrder,
  IOrderItem,
  IOrderPayment,
  IOrderPlatform,
  IOrderType,
} from "@td/types"
import { usePathname, useRouter } from "next/navigation"
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react"
import { dateTimeReviver } from "@td/functions/src/format"
import { api } from "../infra/util/api"
import { useSocket } from "./Socket"
import { parseDate } from "@td/functions"
import { SetState } from "../infra/types/setState"

interface IOrdersContext {
  currentOrder: string | undefined
  orders: IOrder[]
  noType: IOrder[]
  notAccepted: IOrder[]
  notArchived: IOrder[]
  done: IOrder[]
  archived: IOrder[]
  delivery: IOrder[]
  withdraw: IOrder[]
  delivering: IOrder[]
  delivered: IOrder[]

  getCurrentOrder: () => IOrder | undefined
  setItems: (items: IOrderItem[]) => Promise<void>
  setCurrentOrder: SetState<string | undefined>
  deleteItems: (items: IOrderItem[]) => Promise<void>
  setPayments: (payments: IOrderPayment[]) => Promise<void>
  deletePayments: (payments: IOrderPayment[]) => Promise<void>
  setPlatform: (platform: IOrderPlatform) => Promise<void>
  setType: (type: IOrderType) => Promise<void>
  createOrder: () => Promise<IOrder>
}
const OrdersContext = createContext<IOrdersContext>({} as IOrdersContext)

export const OrdersProvider = ({ children }: { children: ReactNode }) => {
  const [currentOrder, setCurrentOrder] = useState<string | undefined>()
  const { socket } = useSocket()

  const [orders, setOrders] = useState<IOrder[]>([])

  const started = orders.length
    ? orders.filter(
        (x) => x.method === "manual" || (x.method === "auto" && x.acceptedAt),
      )
    : []
  const notAccepted = orders.length
    ? orders.filter((x) => x.method === "auto" && !x.acceptedAt)
    : []

  const notArchived = started.length
    ? started.filter((x) => !x.archivedUntil)
    : []
  const archived = started.length ? started.filter((x) => x.archivedUntil) : []

  const preparing = notArchived
    ? notArchived.filter(
        (x) =>
          !x.items.length ||
          x.items.every((x) => !x.steps) ||
          x.items.some(
            (x) => x.steps && x.steps.every((y) => y.type !== "done"),
          ),
      )
    : []
  const done = notArchived
    ? notArchived.filter(
        (x) =>
          x.items.length &&
          x.items
            .filter((x) => x.steps?.length)
            .every((x) => x?.steps?.some((y) => y.type === "done")) &&
          (x.type === "withdraw" ||
            (!x.address?.leaveAt && !x.address?.returnAt)),
      )
    : []

  const noType = orders ? orders.filter((x) => !x.type) : []

  const delivery = preparing
    ? preparing.filter(
        (x) =>
          x.type === "delivery" && !x.address?.leaveAt && !x.address?.returnAt,
      )
    : []
  const withdraw = preparing
    ? preparing.filter((x) => x.type === "withdraw")
    : []

  const delivering = notArchived
    ? notArchived.filter(
        (x) =>
          x.type === "delivery" && x.address?.leaveAt && !x.address?.returnAt,
      )
    : []
  const delivered = notArchived
    ? notArchived.filter(
        (x) =>
          x.type === "delivery" && x.address?.leaveAt && x.address?.returnAt,
      )
    : []

  useLayoutEffect(() => {
    ;(async () => {
      const res = await api(`orders`)

      if (res.ok) {
        const _data = JSON.stringify(await res.json())
        const data = JSON.parse(_data, dateTimeReviver)
        setOrders(data)
      }

      socket.on("orderCreated", orderCreated)
      socket.on("orderUpdated", orderUpdated)
      socket.on("orderItemUpdated", orderItemUpdated)
      socket.on("orderItemsUpdated", orderItemsUpdated)
    })()
  }, []) //eslint-disable-line

  const orderCreated = (newOrder: IOrder) => {
    setOrders((prev) => {
      return [...prev, parseDate(newOrder)]
    })
  }
  const orderUpdated = (newOrder: IOrder) => {
    setOrders((prev) => {
      const foundOrder = prev.find((x) => x.id === newOrder.id)
      return [
        ...prev.filter((x) => x.id !== newOrder.id),
        { ...foundOrder, ...parseDate(newOrder) },
      ]
    })
  }
  const orderItemUpdated = (newItem: IOrderItem) => {
    setOrders((prev) => {
      const newOrders = [...prev]
      const orderIndex = prev.findIndex((x) => (x.id = newItem.orderId))
      const itemIndex = newOrders[orderIndex].items.findIndex(
        (x) => x.id === newItem.id,
      )

      if (itemIndex > -1) {
        const oldItem = newOrders[orderIndex].items[itemIndex]

        newOrders[orderIndex].items[itemIndex] = {
          ...oldItem,
          ...parseDate(newItem),
        } as IOrderItem
      } else {
        newOrders[orderIndex].items.push(parseDate(newItem))
      }

      return newOrders
    })
  }
  const orderItemsUpdated = (newItems: IOrderItem[]) => {
    setOrders((prev) => {
      const newOrders = [...prev]
      const orderIndex = prev.findIndex((x) => (x.id = newItems[0].orderId))

      newOrders[orderIndex].items.push(
        ...newItems.map((x) => parseDate<IOrderItem>(x)),
      )

      return newOrders
    })
  }

  const createOrder = async (orderProps?: Partial<IOrder>) => {
    const res = await api(
      `orders`,
      "POST",
      JSON.stringify({
        ...(orderProps ?? {}),
        createdAt: orderProps?.createdAt ?? new Date(),
      }),
    )

    if (res.ok) {
      const _data = JSON.stringify(await res.json())
      const data = JSON.parse(_data, dateTimeReviver) as unknown as IOrder
      return data
    } else {
      throw new Error("Não foi possível criar um pedido")
    }
  }

  const getCurrentOrder = () => {
    if (currentOrder) {
      const foundOrder = orders.find((x) => x.id === currentOrder)
      return foundOrder
    } else {
      return undefined
    }
  }

  const setItems = async (items: IOrderItem[]) => {
    const order = getCurrentOrder()

    if (!order) {
      await createOrder({ items })
    } else {
      await api(
        `order-items`,
        "PATCH",
        JSON.stringify({
          data: items.map((item) => ({ ...item, orderId: order.id })),
        }),
      )
    }
  }
  const deleteItems = async (items: IOrderItem[]) => {
    const order = getCurrentOrder()

    if (order) {
      await api(
        `order-items`,
        "DELETE",
        JSON.stringify({ data: items.map((x) => x.id) }),
      )
    }
  }
  const setPayments = async (payments: IOrderPayment[]) => {
    const order = getCurrentOrder()

    if (!order) {
      await createOrder({ payments })
    } else {
      await api(
        `order-payments`,
        "PATCH",
        JSON.stringify({
          data: payments.map((payment) => ({ ...payment, orderId: order.id })),
        }),
      )
    }
  }
  const deletePayments = async (payments: IOrderPayment[]) => {
    const order = getCurrentOrder()

    if (order) {
      await api(
        `order-payments`,
        "DELETE",
        JSON.stringify({ data: payments.map((x) => x.id) }),
      )
    }
  }

  const setPlatform = async (platform: IOrderPlatform) => {
    const order = await getCurrentOrder()

    if (!order) {
      await createOrder({ platform })
    } else {
      await api(
        `order-platform/${order.id}`,
        "PUT",
        JSON.stringify({ data: platform }),
      )
    }
  }

  const setType = async (type: IOrderType) => {
    const order = await getCurrentOrder()

    if (!order) {
      await createOrder({ type })
    } else {
      await api(`order-type/${order.id}`, "PUT", JSON.stringify({ data: type }))
    }
  }

  return (
    <OrdersContext.Provider
      value={{
        currentOrder,
        setCurrentOrder,
        getCurrentOrder,

        createOrder,
        orders,
        noType,
        notAccepted,
        notArchived,
        archived,
        delivery,
        withdraw,
        done,
        delivering,
        delivered,

        setItems,
        deleteItems,
        setPayments,
        deletePayments,

        setPlatform,
        setType,
      }}
    >
      {children}
    </OrdersContext.Provider>
  )
}

export const useOrders = () => {
  return useContext(OrdersContext)
}
