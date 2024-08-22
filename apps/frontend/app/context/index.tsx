"use client"

import { ReactNode } from "react"
import { CurrentWindowProvider } from "./CurrentWindow"

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <CurrentWindowProvider>
        <>{children}</>
      </CurrentWindowProvider>
    </>
  )
}
