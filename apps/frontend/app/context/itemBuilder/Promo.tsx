"use client"
import { IBuildingPromo, IOrderItem, IPromoBuilder } from "@td/types"
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import { dateTimeReviver } from "@td/functions/src/format"
import { api } from "@/app/infra/util/api"
import { SetState } from "@/app/infra/types/setState"
import { Ref } from "@/app/infra/types/ref"

interface IPromoBuilderContext {
  // currentPromo: IBuildingPromo

  // setObservations: (observations?: string) => void
  // setDiscount: (discount?: string) => void

  orderId: string

  // isOptionsOpen: boolean
  // setIsOptionsOpen: SetState<boolean>
  // items: IOrderItem[]
  // setItems: SetState<IOrderItem[]>
  // nextButtonRef: Ref<HTMLButtonElement | undefined>
}

const PromoBuilderContext = createContext<IPromoBuilderContext>(
  {} as IPromoBuilderContext,
)

export const PromoBuilderProvider = ({
  children,
  // defaultPromo,
  orderId,
}: {
  children: ReactNode
  defaultPromo?: IBuildingPromo
  orderId: string
}) => {
  // const [isLoading, setIsLoading] = useState(true)
  // const [currentPromo, setCurrentPromo] = useState<IBuildingPromo>({
  //   flavors: [],
  //   createdAt: new Date(),
  // } as unknown as IBuildingPromo)

  // const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  // const searchFlavorRef = useRef<HTMLInputElement>()
  // const nextButtonRef = useRef<HTMLButtonElement>()

  // useEffect(() => {
  //   if (searchFlavorRef?.current) searchFlavorRef.current.focus()
  // }, [searchFlavorRef?.current]) //eslint-disable-line

  // const [builder, setBuilder] = useState<IPromoBuilder>()
  const [items, setItems] = useState<IOrderItem[]>([])

  // useLayoutEffect(() => {
  //   ;(async () => {
  //     const res = await api("promo-builder")

  //     if (res.ok) {
  //       const _data = JSON.stringify(await res.json())
  //       const data = JSON.parse(_data, dateTimeReviver)

  //       setBuilder(data)
  //     }

  //     setIsLoading(false)
  //   })()
  // }, [])

  // useEffect(() => {
  //   if (!isLoading) {
  //     if (defaultPromo?.id) {
  //       setCurrentPromo({
  //         ...defaultPromo,
  //       })
  //     } else {
  //       // setCurrentPromo((prev) => ({ ...prev }))
  //     }
  //   }
  // }, [builder]) //eslint-disable-line

  // const setDiscount = (discount?: string) => {
  //   setCurrentPromo((prev) => ({ ...prev, discount }))
  // }
  // const setObservations = (observations?: string) => {
  //   setCurrentPromo((prev) => ({ ...prev, observations }))
  // }

  return (
    <PromoBuilderContext.Provider
      value={{
        // setObservations,
        // setDiscount,

        orderId,

        // isOptionsOpen,
        // setIsOptionsOpen,
        // nextButtonRef,

        // items,
        // setItems,
      }}
    >
      {children}
    </PromoBuilderContext.Provider>
  )
}

export const usePromoBuilder = () => {
  return useContext(PromoBuilderContext)
}
