import { useRouter } from "next/navigation"
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import { SetState } from "../infra/types/setState"
import { useOrders } from "./Orders"

interface IHomeContext {
  closeOrder: () => void
  showPanel: boolean
  setShowPanel: SetState<boolean>
}
const HomeContext = createContext<IHomeContext>({} as IHomeContext)

export const HomeProvider = ({ children }: { children: ReactNode }) => {
  const [showPanel, setShowPanel] = useState(false)

  const { currentOrder, setCurrentOrder } = useOrders()

  const router = useRouter()

  useEffect(() => {
    if (currentOrder) {
      router.push(`/home/order/${currentOrder}`)
    }
  }, [currentOrder]) //eslint-disable-line

  const closeOrder = () => {
    router.push(`/home`)
    setCurrentOrder(undefined)
  }

  return (
    <HomeContext.Provider
      value={{
        closeOrder,

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
