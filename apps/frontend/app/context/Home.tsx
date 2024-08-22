import { IOrder, IOrderItem, IOrderPlatform, IOrderType } from "@td/types"
import { usePathname, useRouter } from "next/navigation"
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react"
import { dateTimeReviver } from "@td/functions/src/format"
import { api } from "../infra/util/api"
import { errorToast } from "../util/functions/toast"
import { parseRes } from "../infra/util/parseResponse"

interface IHomeContext {
  currentOrder: IOrder
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

  upsertItem: (item: IOrderItem) => Promise<IOrder | undefined>
  addMultipleItems: (items: IOrderItem[]) => Promise<IOrder | undefined>
  setPlatform: (platform: IOrderPlatform) => Promise<IOrder | undefined>
  setType: (platform: IOrderType) => Promise<IOrder | undefined>

  openOrder: (order: IOrder) => void
  closeOrder: () => void
  createOrder: () => Promise<IOrder>
  showPanel: boolean
  setShowPanel: Dispatch<SetStateAction<boolean>>
}
const HomeContext = createContext<IHomeContext>({} as IHomeContext)

export const HomeProvider = ({ children }: { children: ReactNode }) => {
  const [currentOrder, setCurrentOrder] = useState<IOrder>({} as IOrder)
  const [showPanel, setShowPanel] = useState(false)

  const [orders, setOrders] = useState<IOrder[]>([])
  const pathname = usePathname()

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
            (!x.address.leaveAt && !x.address.returnAt)),
      )
    : []

  const noType = orders ? orders.filter((x) => !x.type) : []

  const delivery = preparing
    ? preparing.filter(
        (x) =>
          x.type === "delivery" && !x.address.leaveAt && !x.address.returnAt,
      )
    : []
  const withdraw = preparing
    ? preparing.filter((x) => x.type === "withdraw")
    : []

  const delivering = notArchived
    ? notArchived.filter(
        (x) =>
          x.type === "delivery" && x.address.leaveAt && !x.address.returnAt,
      )
    : []
  const delivered = notArchived
    ? notArchived.filter(
        (x) => x.type === "delivery" && x.address.leaveAt && x.address.returnAt,
      )
    : []

  useLayoutEffect(() => {
    ;(async () => {
      const res = await api(`orders`)
      // fetch("/api/orders");

      if (res.ok) {
        const _data = JSON.stringify(await res.json())
        const data = JSON.parse(_data, dateTimeReviver)
        setOrders(data)
      }
    })()
  }, [])

  useEffect(() => {
    if (pathname.startsWith("/home/order/")) {
      const id = pathname.replace("/home/order/", "")
      if (id) {
        const foundOrder = orders.find((x) => x.id === id)
        if (foundOrder) {
          // setCurrentOrder(foundOrder)
          setCurrentOrder(foundOrder)
        } else {
          closeOrder()
        }
      } else {
        closeOrder()
      }
    } else if (pathname.startsWith("/home") && currentOrder?.id) {
      closeOrder()
    }
  }, [pathname]) //eslint-disable-line

  const router = useRouter()

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

  const getCurrentOrder = () => (currentOrder?.id ? currentOrder : undefined)

  const openOrder = (order: IOrder) => {
    router.push(`/home/order/${order.id}`)
  }
  const closeOrder = () => {
    router.push(`/home`)
    setCurrentOrder({} as IOrder)
  }
  const updateOrder = (newOrder: IOrder) => {
    const oldOrder = orders.find((order) => order.id === newOrder.id)
    if (!oldOrder) {
      setOrders((prev) => [...prev, newOrder])
    } else {
      setOrders((prev) => {
        return [
          ...prev.filter((x) => x.id !== oldOrder.id),
          { ...oldOrder, ...newOrder },
        ]
      })
    }
  }

  const addMultipleItems = async (items: IOrderItem[]) => {
    const order = getCurrentOrder()

    if (!order) {
      await createOrder({ items })
      return
    }

    const res = await api(
      `order-items`,
      "PATCH",
      JSON.stringify({
        data: items.map((x) => ({ ...x, orderId: order.id })),
      }),
    )

    if (!res.ok)
      throw new Error("Não foi possível adicionar os itens ao pedido!")
    const _data = JSON.stringify(await res.json())
    const data = JSON.parse(_data, dateTimeReviver) as unknown as IOrderItem[]

    order.items = [...order.items, ...data]

    setOrders((prev) => [...prev.filter((x) => x.id !== order.id), order])

    openOrder(order)

    return order
  }

  const upsertItem = async (item: IOrderItem) => {
    const order = getCurrentOrder()

    if (!order) {
      await createOrder({ items: [item] })
      return
    }

    const res =
      item.id && item.orderId
        ? await api(
            `order-items/${item.id}`,
            "PUT",
            JSON.stringify({ data: { ...item, orderId: order.id } }),
          )
        : await api(
            `order-items`,
            "POST",
            JSON.stringify({ data: { ...item, orderId: order.id } }),
          )

    const data = await parseRes<IOrder>(
      res,
      "Não foi possível adicionar / editar o item no pedido!",
    )
    updateOrder(data)
    openOrder(order)
    return order
  }

  const setPlatform = async (platform: IOrderPlatform) => {
    const order = await getCurrentOrder()

    if (!order) {
      await createOrder({ platform })
      return
    }

    const res = await api(
      `order-platform/${order.id}`,
      "PUT",
      JSON.stringify({ data: platform }),
    )

    const data = await parseRes<IOrder>(
      res,
      "Não foi possível atualizar a plataforma do pedido",
    )
    updateOrder(data)
    openOrder(order)
    return order
  }
  const setType = async (type: IOrderType) => {
    const order = await getCurrentOrder()

    if (!order) {
      await createOrder({ type })
      return
    }

    const res = await api(
      `order-type/${order.id}`,
      "PUT",
      JSON.stringify({ data: type }),
    )

    const data = await parseRes<IOrder>(
      res,
      "Não foi possível atualizar o tipo do pedido",
    )
    updateOrder(data)
    openOrder(order)
    return order
  }

  return (
    <HomeContext.Provider
      value={{
        currentOrder,
        openOrder,
        closeOrder,
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

        upsertItem,
        addMultipleItems,

        setPlatform,
        setType,

        showPanel,
        setShowPanel,
      }}
    >
      {children}
    </HomeContext.Provider>
  )
}

export const useHome = () => {
  return useContext(HomeContext)
}
