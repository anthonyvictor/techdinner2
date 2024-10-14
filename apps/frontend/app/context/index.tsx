"use client"

import { ReactNode } from "react"
import { CurrentWindowProvider } from "./CurrentWindow"
import { SocketProvider } from "./Socket"

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SocketProvider>
        <CurrentWindowProvider>
          <>{children}</>
        </CurrentWindowProvider>
      </SocketProvider>
    </>
  )
}
