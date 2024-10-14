"use client"
import { io, Socket } from "socket.io-client"
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

interface ISocketContext {
  socket: Socket
}
const SocketContext = createContext<ISocketContext>({} as ISocketContext)

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket] = useState(
    io(process.env.NEXT_PUBLIC_API_URL as unknown as string),
  ) // URL do seu backend

  useEffect(() => {
    return () => {
      socket.disconnect()
    }
  }, [])
  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => {
  return useContext(SocketContext)
}
