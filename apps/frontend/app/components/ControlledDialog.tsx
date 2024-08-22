import { createContext, ReactNode, useContext, useState } from "react"
import { SetState } from "../infra/types/setState"
import { Dialog } from "@radix-ui/themes"

type IContrDialogContext = {
  open: boolean
  setOpen: SetState<boolean>
  trigger?: ReactNode
}

const ContrDialogContext = createContext<IContrDialogContext>(
  {} as IContrDialogContext,
)

export const ContrDialog = ({
  children,
  trigger,
  open,
  setOpen,
}: {
  children: ReactNode
  open?: boolean
  setOpen?: SetState<boolean>
  trigger?: ReactNode
}) => {
  const [_open, _setOpen] = useState(!!open)

  return (
    <ContrDialogContext.Provider
      value={{
        open: open === undefined ? _open : open,
        setOpen: setOpen === undefined ? _setOpen : setOpen,
        trigger,
      }}
    >
      <ContrDialogComponent>{children}</ContrDialogComponent>
    </ContrDialogContext.Provider>
  )
}
export const useContrDialog = () => useContext(ContrDialogContext)

const ContrDialogComponent = ({ children }: { children: ReactNode }) => {
  const { open, setOpen, trigger } = useContrDialog()
  return (
    <Dialog.Root open={open} onOpenChange={(e) => setOpen(e)}>
      {!!trigger && <Dialog.Trigger>{trigger}</Dialog.Trigger>}

      {children}
    </Dialog.Root>
  )
}
