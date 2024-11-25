"use client"
import {
  IBuildingDrink,
  IDrinkBuilder,
  IDrinkFlavor,
  IDrinkCategory,
  IDrink,
  IOrderItemDrink,
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
import { IPromoItemDrink } from "@td/types/src/promo"
import { alertToast } from "@/app/util/functions/toast"

interface IDrinkBuilderContext {
  currentDrinks: IBuildingDrink[]
  setCurrentDrinks: SetState<IBuildingDrink[]>
  builder: IDrinkBuilder

  setFlavor: (flavor: IDrinkFlavor) => void

  orderId: string

  observations: string | undefined
  discount: PercentOrValue | undefined
  setObservations: SetState<string | undefined>
  setDiscount: SetState<string | undefined>

  filteredCategories: IDrinkCategory[]
  searchDrinkRef: Ref<HTMLInputElement | undefined>
  searchDrinks: string
  setSearchDrinks: SetState<string>

  hoveredDrink: IDrink | undefined
  hoveredDrinkRef: Ref<HTMLDivElement | undefined>
  drinksListRef: Ref<HTMLDivElement | undefined>
  setHoveredDrink: SetState<IDrink | undefined>

  isOptionsOpen: boolean
  setIsOptionsOpen: SetState<boolean>

  drinkClick: (drink: IDrink | IBuildingDrink | undefined) => void
  addDrinks: (drinks: IDrink[]) => void
  removeDrink: (drinkId: string) => void

  selectFlavorId: string | undefined
  setSelectFlavorId: SetState<string | undefined>

  nextButtonRef: Ref<HTMLButtonElement | undefined>
  promoItems?: IPromoItemDrink[]
}

const DrinkBuilderContext = createContext<IDrinkBuilderContext>(
  {} as IDrinkBuilderContext,
)

export const DrinkBuilderProvider = ({
  children,
  defaultDrink,
  promoItems,
  orderId,
}: {
  children: ReactNode
  promoItems?: IPromoItemDrink[]
  defaultDrink?: IOrderItemDrink
  orderId: string
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [currentDrinks, setCurrentDrinks] = useState<IBuildingDrink[]>([])

  const [searchDrinks, setSearchDrinks] = useState("")
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const [hoveredDrink, setHoveredDrink] = useState<IDrink | undefined>()
  const [selectFlavorId, setSelectFlavorId] = useState<string | undefined>()
  const searchDrinkRef = useRef<HTMLInputElement>()
  const hoveredDrinkRef = useRef<HTMLDivElement>()
  const drinksListRef = useRef<HTMLDivElement>()
  const nextButtonRef = useRef<HTMLButtonElement>()

  useEffect(() => {
    if (searchDrinkRef?.current) searchDrinkRef.current.focus()
  }, [searchDrinkRef?.current]) //eslint-disable-line

  const [builder, setBuilder] = useState<IDrinkBuilder>({
    categories: [],
    discounts: [],
  })

  const filteredCategories =
    builder.categories?.length && searchDrinks
      ? builder.categories
          .map((category) => {
            const filteredDrinks = category.drinks.filter((drink) => {
              const o = objToString(drink, [
                "category",
                "originalValue",
                "avails",
                "sold",
                "forPrepare",
                "stock",
                "sizeInMl",
              ]).toLowerCase()

              return o.includes(searchDrinks.toLowerCase())
            })

            return { ...category, drinks: filteredDrinks }
          })
          .filter((category) => category.drinks.length > 0)
      : builder.categories

  useLayoutEffect(() => {
    ;(async () => {
      const res = await api("drink-builder")

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
      if (defaultDrink?.id) {
        setCurrentDrinks([{ ...defaultDrink, code: uuidv4() }])
        // } else {
        // setCurrentDrinks((prev) => ({ ...prev }))
      }
    }
  }, [builder]) //eslint-disable-line

  const setFlavor = (flavor?: IDrinkFlavor) => {
    // setCurrentDrinks((prev) => ({ ...prev, flavor }))
  }

  const [discount, setDiscount] = useState<string>()
  const [observations, setObservations] = useState<string>()

  const drinkClick = (drink: IDrink | IBuildingDrink | undefined) => {
    if (promoItems && currentDrinks.length === 1) {
      alertToast("Máximo de bebidas alcançadas!")
      return
    }
    if (drink?.flavors?.length) {
      setSelectFlavorId(drink.id)
    } else if (drink) {
      addDrinks([drink])
    }
  }

  const addDrinks = (drinks: IDrink[]) => {
    const _drinks = drinks.map((drink) => ({
      ...drink,
      id: uuidv4(),
      drinkId: drink.id,
      code: uuidv4(),
      discount,
      observations,
    }))
    setCurrentDrinks((prev) => [...prev, ..._drinks])
  }

  const removeDrink = (drinkCode: string) => {
    setCurrentDrinks((prev) => prev.filter((x) => x.code !== drinkCode))
  }

  return (
    <DrinkBuilderContext.Provider
      value={{
        currentDrinks,
        setCurrentDrinks,
        builder,
        setFlavor,
        observations,
        discount,
        setObservations,
        setDiscount,

        orderId,

        addDrinks,
        removeDrink,

        searchDrinks,
        setSearchDrinks,
        searchDrinkRef,

        hoveredDrink,
        setHoveredDrink,
        hoveredDrinkRef,
        drinksListRef,

        filteredCategories,

        isOptionsOpen,
        setIsOptionsOpen,
        nextButtonRef,

        selectFlavorId,
        setSelectFlavorId,
        drinkClick,
        promoItems,
      }}
    >
      {children}
    </DrinkBuilderContext.Provider>
  )
}

export const useDrinkBuilder = () => {
  return useContext(DrinkBuilderContext)
}
