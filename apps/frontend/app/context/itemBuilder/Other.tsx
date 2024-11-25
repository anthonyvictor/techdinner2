"use client"
import {
  IBuildingOther,
  IOtherBuilder,
  IOtherVariation,
  IOtherCategory,
  IOther,
  IOrderItemOther,
  IOrderItem,
  PercentOrValue,
} from "@td/types"
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import { dateTimeReviver, objToString } from "@td/functions/src/format"
import { api } from "@/app/infra/util/api"
import { v4 as uuidv4 } from "uuid"
import { SetState } from "@/app/infra/types/setState"
import { Ref } from "@/app/infra/types/ref"
import { getOtherValue, groupSelectedOthers } from "@td/functions"
import { IPromoItemOther } from "@td/types/src/promo"

interface IOtherBuilderContext {
  currentOthers: IBuildingOther[]
  groupedOthers: IBuildingOther[][]
  setCurrentOthers: SetState<IBuildingOther[]>
  builder: IOtherBuilder

  setVariation: (variation: IOtherVariation) => void

  orderId: string

  observations: string | undefined
  discount: PercentOrValue | undefined
  setObservations: SetState<string | undefined>
  setDiscount: SetState<string | undefined>

  filteredCategories: IOtherCategory[]
  searchOtherRef: Ref<HTMLInputElement | undefined>
  searchOthers: string
  setSearchOthers: SetState<string>

  hoveredOther: IOther | undefined
  hoveredOtherRef: Ref<HTMLDivElement | undefined>
  othersListRef: Ref<HTMLDivElement | undefined>
  setHoveredOther: SetState<IOther | undefined>

  isOptionsOpen: boolean
  setIsOptionsOpen: SetState<boolean>

  otherClick: (other: IOther | IBuildingOther | undefined) => void
  addOthers: (others: IOther[]) => void
  removeOther: (otherId: string) => void

  selectOptionsId: string | undefined
  setSelectOptionsId: SetState<string | undefined>
  selectComponentsId: string | undefined
  setSelectComponentsId: SetState<string | undefined>

  nextButtonRef: Ref<HTMLButtonElement | undefined>
  promoItems?: IPromoItemOther[]
}

const OtherBuilderContext = createContext<IOtherBuilderContext>(
  {} as IOtherBuilderContext,
)

export const OtherBuilderProvider = ({
  children,
  defaultOther,
  orderId,
  promoItems,
}: {
  children: ReactNode
  defaultOther?: IOrderItemOther
  orderId: string
  promoItems?: IPromoItemOther[]
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [currentOthers, setCurrentOthers] = useState<IBuildingOther[]>([])

  const [searchOthers, setSearchOthers] = useState("")
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const [hoveredOther, setHoveredOther] = useState<IOther | undefined>()
  const [selectOptionsId, setSelectOptionsId] = useState<string | undefined>()
  const [selectComponentsId, setSelectComponentsId] = useState<
    string | undefined
  >()
  const searchOtherRef = useRef<HTMLInputElement>()
  const hoveredOtherRef = useRef<HTMLDivElement>()
  const othersListRef = useRef<HTMLDivElement>()
  const nextButtonRef = useRef<HTMLButtonElement>()

  useEffect(() => {
    if (searchOtherRef?.current) searchOtherRef.current.focus()
  }, [searchOtherRef?.current]) //eslint-disable-line

  const [builder, setBuilder] = useState<IOtherBuilder>({
    categories: [],
    discounts: [],
  })

  const filteredCategories =
    builder.categories?.length && searchOthers
      ? builder.categories
          .map((category) => {
            const filteredOthers = category.others.filter((other) => {
              const o = objToString(other, [
                "category",
                "originalValue",
                "avails",
                "sold",
                "forPrepare",
                "stock",
                "sizeInMl",
              ]).toLowerCase()

              return o.includes(searchOthers.toLowerCase())
            })

            return { ...category, others: filteredOthers }
          })
          .filter((category) => category.others.length > 0)
      : builder.categories

  const groupedOthers = currentOthers?.length
    ? groupSelectedOthers(currentOthers)
    : []

  useLayoutEffect(() => {
    ;(async () => {
      const res = await api("other-builder")

      if (res.ok) {
        const _data = JSON.stringify(await res.json())
        const data = JSON.parse(_data, dateTimeReviver)

        setBuilder(data)
      }

      setIsLoading(false)
    })()
  }, [])

  useEffect(() => {
    if (!isLoading) {
      if (defaultOther?.id) {
        setCurrentOthers([{ ...defaultOther, code: uuidv4() }])
        // } else {
        // setCurrentOthers((prev) => ({ ...prev }))
      }
    }
  }, [builder]) //eslint-disable-line

  const setVariation = (variation?: IOtherVariation) => {
    // setCurrentOthers((prev) => ({ ...prev, variation }))
  }

  const [discount, setDiscount] = useState<string>()
  const [observations, setObservations] = useState<string>()

  const otherClick = (other: IOther | IBuildingOther | undefined) => {
    if (other == undefined) return
    if (
      (other?.sizes?.length ?? 0) > 1 ||
      (other?.variations?.length ?? 0) > 1
    ) {
      setSelectOptionsId(other.id)
    } else if (other) {
      addOthers([{ ...other }])
    }
  }

  const addOthers = (others: (IOther | IBuildingOther)[]) => {
    const _others = others.map((other) => ({
      ...other,
      id: uuidv4(),
      variation: (other as IBuildingOther)?.variation ?? other.variations[0],
      size: (other as IBuildingOther)?.size ?? other.sizes[0],
      otherId: other.id,
      code: uuidv4(),
      discount,
      observations,
    }))
    setCurrentOthers((prev) => [...prev, ..._others])
  }

  const removeOther = (otherCode: string) => {
    setCurrentOthers((prev) => prev.filter((x) => x.code !== otherCode))
  }

  return (
    <OtherBuilderContext.Provider
      value={{
        currentOthers,
        groupedOthers,
        setCurrentOthers,
        builder,
        setVariation,
        observations,
        discount,
        setObservations,
        setDiscount,

        orderId,

        addOthers,
        removeOther,

        searchOthers,
        setSearchOthers,
        searchOtherRef,

        hoveredOther,
        setHoveredOther,
        hoveredOtherRef,
        othersListRef,

        filteredCategories,

        isOptionsOpen,
        setIsOptionsOpen,
        nextButtonRef,

        selectOptionsId,
        setSelectOptionsId,

        selectComponentsId,
        setSelectComponentsId,

        otherClick,
        promoItems,
      }}
    >
      {children}
    </OtherBuilderContext.Provider>
  )
}

export const useOtherBuilder = () => {
  return useContext(OtherBuilderContext)
}
