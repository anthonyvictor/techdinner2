import { createContext, ReactNode, useState } from "react"
import { ContrDialog } from "./ControlledDialog"
import { Dialog } from "@radix-ui/themes"

type IAsyncDialogContext = {}

const AsyncDialogContext = createContext<IAsyncDialogContext>(
  {} as IAsyncDialogContext,
)

export const AsyncDialogProvider = ({ children }: { children: ReactNode }) => {
  const [dialogChildren, setDialogChildren] = useState<ReactNode>(<></>)
  // const asyncDialog = (component:ReactNode) => {

  //     return {
  //         AsyncComponent: (
  //             <>
  //             {component}
  //             </>
  //         )
  //     }
  // }
  const asyncDialog = async (next: () => void, cancel: () => void) => {
    const p = new Promise((resolve, reject) => {})
    // return {
    //     AsyncComponent: (
    //         <>
    //         {component}
    //         </>
    //     )
    // }
  }
  return (
    <AsyncDialogContext.Provider value={{}}>
      {children}
      <AsyncDialogComponent>{dialogChildren}</AsyncDialogComponent>
    </AsyncDialogContext.Provider>
  )
}

const AsyncDialogComponent = ({
  title,
  description,
  children,
}: {
  children: ReactNode
  title?: string
  description?: string
}) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <ContrDialog open={isOpen} setOpen={setIsOpen}>
      <Dialog.Content>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description>{description}</Dialog.Description>
        {children}
      </Dialog.Content>
    </ContrDialog>
  )
}

export const asyncDialog = () => {}

const Compon = () => {}
