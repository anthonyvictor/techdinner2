import { toast } from "react-toastify"
import { playSound } from "./playSound"

export const errorToast = (message: string) => {
  toast.success(message, {
    onOpen: () => {
      playSound("/audio/error01.wav")
    },
  })
}
export const successToast = (message: string) => {
  toast.success(message, {
    onOpen: () => {
      playSound("/audio/success01.wav")
    },
  })
}
export const stockAlertToast = (message: string) => {
  toast.success(message, {
    onOpen: () => {
      playSound("/audio/success01.wav")
    },
  })
}
