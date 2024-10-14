"use client"
import { createContext, ReactNode, useContext, useRef, useState } from "react"
import { SetState } from "../infra/types/setState"
import { Ref } from "../infra/types/ref"

interface ICurrentWindowContext {
  currentWindowRef: Ref<HTMLElement | undefined>
  currentWindow: string
  setCurrentWindow: SetState<string>
}
const CurrentWindowContext = createContext<ICurrentWindowContext>(
  {} as ICurrentWindowContext,
)

export const CurrentWindowProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [currentWindow, setCurrentWindow] = useState("")
  const currentWindowRef = useRef<HTMLElement>()

  return (
    <CurrentWindowContext.Provider
      value={{
        currentWindow,
        setCurrentWindow,
        currentWindowRef,
      }}
    >
      {children}
    </CurrentWindowContext.Provider>
  )
}

export const useCurrentWindow = () => {
  return useContext(CurrentWindowContext)
}
