import { SetState } from "@/app/infra/types/setState"
import {
  AlertDialog,
  Button,
  Dialog,
  Flex,
  Text,
  VisuallyHidden,
} from "@radix-ui/themes"
import { createContext, ReactNode, useContext, useState } from "react"
import { useContrDialog } from "../ControlledDialog"

type IITemBuilderPageContext = {
  askToClose: boolean
  askToCloseTitle?: string
  setAskToClose: SetState<boolean>
  setAskToCloseTitle: SetState<string>
}

const ItemBuilderPageContext = createContext<IITemBuilderPageContext>(
  {} as IITemBuilderPageContext,
)

export const ItemBuilderPage = ({
  children,
  askToLeave,
}: {
  children: ReactNode
  askToLeave?: boolean
}) => {
  const [askToClose, setAskToClose] = useState(!!askToLeave)
  const [showAsk, setShowAsk] = useState(false)
  const [askToCloseTitle, setAskToCloseTitle] = useState(
    "Deseja realmente sair?",
  )
  const { setOpen } = useContrDialog()

  const AskToLeave = () => {
    return (
      <Dialog.Root
        open={showAsk}
        onOpenChange={(e) => {
          setShowAsk(e)
        }}
      >
        <Dialog.Content>
          <Dialog.Title>{askToCloseTitle}</Dialog.Title>
          <VisuallyHidden>
            <Dialog.Description>Ask To Leave</Dialog.Description>
          </VisuallyHidden>
          <Flex gap={"2"}>
            <Dialog.Close
              onClick={() => {
                setOpen(false)
              }}
            >
              <Button
                color="red"
                variant="outline"
                size={"3"}
                onClick={() => {
                  setOpen(false)
                }}
              >
                <Text>Sair</Text>
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button size={"3"}>
                <Text>Ficar</Text>
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    )
  }

  return (
    <ItemBuilderPageContext.Provider
      value={{
        askToClose,
        setAskToClose,
        askToCloseTitle,
        setAskToCloseTitle,
      }}
    >
      <Dialog.Content
        onInteractOutside={(e) => {
          if (askToClose) {
            e.preventDefault()
            if (e.target === e.currentTarget) {
              setShowAsk(true)
            }
          }
        }}
        onEscapeKeyDown={(e) => {
          if (askToClose) {
            e.preventDefault()
            setShowAsk(true)
          }
        }}
        size={"2"}
        minWidth={"80svw"}
        maxWidth={"98svw"}
        minHeight={"89svh"}
        maxHeight={"92svh"}
        className="flex flex-col"
      >
        <VisuallyHidden>
          <Dialog.Title>Build Item</Dialog.Title>
          <Dialog.Description>Build item</Dialog.Description>
        </VisuallyHidden>
        {children}
      </Dialog.Content>
      <AskToLeave />
    </ItemBuilderPageContext.Provider>
  )
}

export const useItemBuilderPage = () => useContext(ItemBuilderPageContext)
