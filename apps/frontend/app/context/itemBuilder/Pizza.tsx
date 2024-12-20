"use client"
import {
  IBuildingPizza,
  IBuildingPizzaFlavor,
  IOrderItem,
  IOrderItemPizza,
  IPizzaBuilder,
  IPizzaCrust,
  IPizzaDough,
  IPizzaDoughBakingLevel,
  IPizzaDoughThickness,
  IPizzaDoughType,
  IPizzaExtra,
  IPizzaFlavor,
  IPizzaFlavorGroup,
  IPizzaSize,
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
import { IPromoItemPizza } from "@td/types/src/promo"
import { merge } from "@td/functions"
import { alertToast } from "@/app/util/functions/toast"
import { useItemBuilder } from "."

interface IPizzaBuilderContext {
  currentPizza: IBuildingPizza
  builder: IPizzaBuilder

  setSize: (size: IPizzaSize) => void
  setFlavors: (flavors: IBuildingPizzaFlavor[]) => void
  setExtras: (extras: IPizzaExtra[]) => void
  setCrust: (crust: IPizzaCrust) => void
  setDoughThickness: (thickness: IPizzaDoughThickness) => void
  setDoughBakingLevel: (bakingLevel: IPizzaDoughBakingLevel) => void
  setDoughType: (type: IPizzaDoughType) => void
  setObservations: (observations?: string) => void
  setDiscount: (discount?: string) => void

  filteredGroups: IPizzaFlavorGroup[]
  searchFlavorRef: Ref<HTMLInputElement | undefined>
  searchFlavors: string
  setSearchFlavors: SetState<string>
  orderId: string

  hoveredFlavor: IPizzaFlavor | undefined
  hoveredFlavorRef: Ref<HTMLDivElement | undefined>
  flavorsListRef: Ref<HTMLDivElement | undefined>
  setHoveredFlavor: SetState<IPizzaFlavor | undefined>

  sizesListRef: Ref<HTMLDivElement | undefined>

  isOptionsOpen: boolean
  setIsOptionsOpen: SetState<boolean>

  currentSizeRef: Ref<HTMLButtonElement | undefined>
  nextButtonRef: Ref<HTMLButtonElement | undefined>

  addFlavor: (flavor: IPizzaFlavor | IBuildingPizzaFlavor) => void
  removeFlavor: (code: string) => void
}

const PizzaBuilderContext = createContext<IPizzaBuilderContext>(
  {} as IPizzaBuilderContext,
)

export const PizzaBuilderProvider = ({
  children,
  defaultPizza,
  orderId,
}: {
  children: ReactNode
  defaultPizza?: IOrderItemPizza
  orderId: string
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [currentPizza, setCurrentPizza] = useState<IBuildingPizza>({
    flavors: [],
    createdAt: new Date(),
  } as unknown as IBuildingPizza)

  const [searchFlavors, setSearchFlavors] = useState("")
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const [hoveredFlavor, setHoveredFlavor] = useState<IPizzaFlavor | undefined>()
  const searchFlavorRef = useRef<HTMLInputElement>()
  const hoveredFlavorRef = useRef<HTMLDivElement>()
  const sizesListRef = useRef<HTMLDivElement>()
  const flavorsListRef = useRef<HTMLDivElement>()
  const currentSizeRef = useRef<HTMLButtonElement>()
  const nextButtonRef = useRef<HTMLButtonElement>()

  useEffect(() => {
    if (searchFlavorRef?.current) searchFlavorRef.current.focus()
  }, [searchFlavorRef?.current]) //eslint-disable-line

  const [builder, setBuilder] = useState<IPizzaBuilder>({
    sizes: [],
    crusts: [],
    doughTypes: [],
    doughThicknesses: [],
    doughBakingLevels: [],
    groups: [],
    ingredients: [],
    extras: [],
    discounts: [],
  })

  const { currentPromoBuilder, currentPromoItems } = useItemBuilder()

  const getGroups = () => {
    return currentPromoBuilder?.type === "pizza" &&
      currentPromoBuilder?.flavors?.length
      ? [
          ...builder.groups.map((g) => ({
            ...g,
            flavors: g.flavors.filter((f) =>
              (currentPromoBuilder?.flavors ?? []).some((pf) => pf.id === f.id),
            ),
          })),
        ]
      : builder.groups
  }

  const filteredGroups =
    builder.groups?.length && searchFlavors
      ? getGroups()
          .map((group) => {
            const filteredFlavors = group.flavors.filter((flavor) => {
              const o = objToString(flavor, [
                "ingredients",
                "group",
                "values",
              ]).toLowerCase()

              return o.includes(searchFlavors.toLowerCase())
            })

            return { ...group, flavors: filteredFlavors }
          })
          .filter((group) => group.flavors.length > 0)
      : getGroups()

  const getSizeByBuilderSameSize = (
    sizes: IPizzaSize[],
    builder: IPromoItemPizza,
  ) => {
    return (
      sizes.filter(
        (x) =>
          x.id ===
          (
            currentPromoItems.find(
              (y) => y.promo?.builderId === builder.sameSizeAs,
            ) as IOrderItemPizza
          ).size.id,
      ) ?? sizes
    )
  }
  useLayoutEffect(() => {
    ;(async () => {
      const res = await api("pizza-builder")

      if (res.ok) {
        const _data = JSON.stringify(await res.json())
        const { sizes, crusts, doughThicknesses, doughTypes, ...data } =
          JSON.parse(_data, dateTimeReviver) as IPizzaBuilder

        const promoPizza =
          currentPromoBuilder?.type === "pizza"
            ? (currentPromoBuilder as IPromoItemPizza)
            : undefined

        const _sizes = (promoPizza?.sizes as IPizzaSize[])?.length
          ? (promoPizza?.sizes as IPizzaSize[])
          : promoPizza?.sameSizeAs
            ? getSizeByBuilderSameSize(sizes, promoPizza)
            : sizes
        const _crusts = promoPizza?.crusts?.length
          ? merge(crusts, promoPizza?.crusts)
          : crusts
        const _doughThicknesses = promoPizza?.doughThicknesses?.length
          ? merge(doughThicknesses, promoPizza?.doughThicknesses)
          : doughThicknesses
        const _doughTypes = promoPizza?.doughTypes?.length
          ? merge(doughTypes, promoPizza?.doughTypes)
          : doughTypes

        setBuilder({
          sizes: _sizes,
          crusts: _crusts,
          doughThicknesses: _doughThicknesses,
          doughTypes: _doughTypes,
          ...data,
        })
      }

      setIsLoading(false)
    })()
  }, []) //eslint-disable-line

  useEffect(() => {
    if (!isLoading) {
      if (defaultPizza?.id) {
        setCurrentPizza({
          ...defaultPizza,
          flavors: defaultPizza.flavors.map((x) => ({
            ...x,
          })),
        })
      } else {
        const size = builder.sizes.length === 1 ? builder.sizes[0] : undefined

        const crust = builder.crusts.find(
          (crust) => crust.isDefault,
        ) as IPizzaCrust

        const doughThickness = builder.doughThicknesses.find(
          (thickness) => thickness.isDefault,
        ) as IPizzaDoughThickness

        const doughBakingLevel = builder.doughBakingLevels.find(
          (type) => type.isDefault,
        ) as IPizzaDoughBakingLevel

        const doughType = builder.doughTypes.find(
          (type) => type.isDefault,
        ) as IPizzaDoughType

        const dough: IPizzaDough = {
          thickness: doughThickness,
          type: doughType,
          id: "",
          createdAt: new Date(),
          bakingLevel: doughBakingLevel,
        }

        setCurrentPizza((prev) => ({ ...prev, size, crust, dough }))
      }
    }
  }, [builder]) //eslint-disable-line

  const setSize = (size: IPizzaSize) => {
    setCurrentPizza((prev) => ({ ...prev, size }))
  }
  const setFlavors = (flavors: IBuildingPizzaFlavor[]) => {
    setCurrentPizza((prev) => ({ ...prev, flavors }))
  }
  const setExtras = (extras: IPizzaExtra[]) => {
    setCurrentPizza((prev) => ({ ...prev, extras }))
  }
  const setCrust = (crust: IPizzaCrust) => {
    setCurrentPizza((prev) => ({ ...prev, crust }))
  }
  const setDiscount = (discount?: string) => {
    setCurrentPizza((prev) => ({ ...prev, discount }))
  }
  const setObservations = (observations?: string) => {
    setCurrentPizza((prev) => ({ ...prev, observations }))
  }
  const setDoughThickness = (thickness: IPizzaDoughThickness) => {
    const prevDough = currentPizza.dough as IPizzaDough

    setCurrentPizza((prev) => {
      const r = {
        ...prev,
        dough: { ...prevDough, thickness },
      }
      return r
    })
  }
  const setDoughBakingLevel = (bakingLevel: IPizzaDoughBakingLevel) => {
    const prevDough = currentPizza.dough as IPizzaDough

    setCurrentPizza((prev) => {
      const r = {
        ...prev,
        dough: { ...prevDough, bakingLevel },
      }
      return r
    })
  }
  const setDoughType = (type: IPizzaDoughType) => {
    const prevDough = currentPizza.dough as IPizzaDough

    setCurrentPizza((prev) => ({
      ...prev,
      dough: { ...prevDough, type },
    }))
  }

  const addFlavor = (flavor: IPizzaFlavor | IBuildingPizzaFlavor) => {
    if (
      currentPromoBuilder?.type === "pizza" &&
      currentPizza.size &&
      currentPizza.size.maxflavors === currentPizza.flavors.length
    ) {
      alertToast("Máximo de sabores atingido!")
      return
    }
    if ((flavor as IBuildingPizzaFlavor)?.code) {
      const index = currentPizza.flavors.findIndex(
        (x) => x.code === (flavor as IBuildingPizzaFlavor).code,
      )
      const newFlavors = [...currentPizza.flavors]
      newFlavors[index] = flavor as IBuildingPizzaFlavor
      setFlavors(newFlavors)
    } else {
      const newFlavors = [
        ...currentPizza.flavors,
        {
          ...flavor,
          code: uuidv4(),
          modifications: (flavor as IBuildingPizzaFlavor)?.modifications ?? [],
        },
      ]
      setFlavors(newFlavors as IBuildingPizzaFlavor[])
    }
    setSearchFlavors("")
    const flavorsList = document.querySelector("#flavors-list")
    searchFlavorRef.current?.focus()

    if (flavorsList) {
      flavorsList.scrollTop = 0
    }
  }
  const removeFlavor = (code: string) => {
    setFlavors(currentPizza.flavors.filter((x) => x.code !== code))
    searchFlavorRef.current?.focus()
  }

  return (
    <PizzaBuilderContext.Provider
      value={{
        currentPizza,
        builder,
        setSize,
        setCrust,
        setFlavors,
        setDoughThickness,
        setDoughBakingLevel,
        setDoughType,
        setExtras,
        setObservations,
        setDiscount,

        orderId,

        sizesListRef,

        searchFlavors,
        setSearchFlavors,
        searchFlavorRef,

        hoveredFlavor,
        setHoveredFlavor,
        hoveredFlavorRef,
        flavorsListRef,

        currentSizeRef,

        filteredGroups,

        isOptionsOpen,
        setIsOptionsOpen,
        nextButtonRef,
        addFlavor,
        removeFlavor,
      }}
    >
      {children}
    </PizzaBuilderContext.Provider>
  )
}

export const usePizzaBuilder = () => {
  return useContext(PizzaBuilderContext)
}
