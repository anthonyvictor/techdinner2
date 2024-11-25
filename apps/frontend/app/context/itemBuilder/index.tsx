import { SetState } from "@/app/infra/types/setState"
import { api } from "@/app/infra/util/api"
import { sleep } from "@td/functions"
import { IOrderItem } from "@td/types"
import { IPromo, IPromoItem } from "@td/types/src/promo"
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

import { v4 as uuidv4 } from "uuid"

interface IItemBuilderContext {
  isPromoPageOpen: boolean
  setIsPromoPageOpen: SetState<boolean>
  currentPromoBuilder: IPromoItem | undefined
  setCurrentPromoBuilder: SetState<IPromoItem | undefined>
  currentPromoCode: string
  setCurrentPromoCode: SetState<string>
  currentPromoBuilderCode: string
  setCurrentPromoBuilderCode: SetState<string>
  currentPromo: IPromo | undefined
  setCurrentPromo: SetState<IPromo | undefined>
  currentPromoItems: IOrderItem[]
  setCurrentPromoItems: SetState<IOrderItem[]>
  addMultipleItemsToOrder: (
    items: IOrderItem[],
    orderId: string,
  ) => Promise<boolean>

  addMultipleItemsToPromo: (items: IOrderItem[]) => Promise<void>
}
const ItemBuilderContext = createContext<IItemBuilderContext>(
  {} as IItemBuilderContext,
)

export const ItemBuilderProvider = ({ children }: { children: ReactNode }) => {
  const [currentPromo, setCurrentPromo] = useState<IPromo | undefined>()
  const [currentPromoItems, setCurrentPromoItems] = useState<IOrderItem[]>([])
  const [currentPromoCode, setCurrentPromoCode] = useState<string>("")
  const [currentPromoBuilderCode, setCurrentPromoBuilderCode] =
    useState<string>("")
  const [currentPromoBuilder, setCurrentPromoBuilder] = useState<
    IPromoItem | undefined
  >()

  const [isPromoPageOpen, setIsPromoPageOpen] = useState<boolean>(false)

  useEffect(() => {
    setCurrentPromoItems([])
    if (currentPromo) {
      setCurrentPromoBuilder(currentPromo?.builders?.[0])
      setCurrentPromoCode(uuidv4())
      setCurrentPromoBuilderCode(uuidv4())
    } else {
      setCurrentPromoBuilder(undefined)
      setCurrentPromoCode("")
      setCurrentPromoBuilderCode("")
    }
  }, [currentPromo]) //eslint-disable-line

  const addMultipleItemsToOrder = async (
    items: IOrderItem[],
    orderId: string,
  ) => {
    const res = await api(
      `order-items`,
      "PATCH",
      JSON.stringify({
        data: items.map((x) => ({ ...x, orderId })),
      }),
    )

    if (!res.ok)
      throw new Error("Não foi possível adicionar os itens ao pedido!")

    // console.log('-----------', order)

    // openOrder(order)

    return true
  }

  const addMultipleItemsToPromo = async (items: IOrderItem[]) => {
    setCurrentPromoItems((prev) => [...prev, ...items])
    // const newItems = [...currentPromoSelectedItems]
    // if(Array.isArray(builder)){
    //   setUsedPromoItems((prev) => [...prev, ...builder.map(x => x.promoItem.id)])
    //   newItems.push(...items.map((x) => ({ ...x })))
    // }else{
    //   newItems.push(...items.map((x) => ({ ...x, promoItemId: builder.promoItem.id })))
    //   setUsedPromoItems((prev) => [...prev, builder.promoItem.id])
    // }
    // await sleep(0.2)
    // setCurrentPromoSelectedItems(newItems)
  }

  const getPromoMaxItems = () => {
    return (
      currentPromo?.builders
        ?.map((builder) => (builder.type === "pizza" ? 1 : builder.max))
        .reduce((acc, curr) => acc + curr, 0) ?? 0
    )
  }

  useEffect(() => {
    ;(async () => {
      if (currentPromoItems.length < getPromoMaxItems()) {
        setCurrentPromoBuilder(undefined)
        await sleep(0.1)
        setCurrentPromoBuilder(
          (currentPromo?.builders ?? [])
            .filter((x) =>
              currentPromoItems.every((y) => y.promo?.builderId !== x.id),
            )
            .filter((x, i) => i === 0)?.[0],
        )
      } else {
        setCurrentPromo(undefined)
      }
    })()
  }, [currentPromoItems]) //eslint-disable-line

  return (
    <ItemBuilderContext.Provider
      value={{
        isPromoPageOpen,
        setIsPromoPageOpen,
        currentPromoBuilder,
        setCurrentPromoBuilder,
        currentPromoCode,
        setCurrentPromoCode,
        currentPromoBuilderCode,
        setCurrentPromoBuilderCode,
        currentPromo,
        setCurrentPromo,

        currentPromoItems,
        setCurrentPromoItems,

        addMultipleItemsToOrder,
        addMultipleItemsToPromo,
      }}
    >
      {children}
    </ItemBuilderContext.Provider>
  )
}

export const useItemBuilder = () => {
  return useContext(ItemBuilderContext)
}
