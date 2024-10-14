import { useHome } from "@/app/context/Home"
import { Card, Flex, IconButton } from "@radix-ui/themes"
import { IconBase, IconType } from "react-icons"
import { FaClipboard, FaFolderOpen, FaMotorcycle } from "react-icons/fa"
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5"

export const SideTools = () => {
  const { currentOrder: currOrderId, getCurrentOrder } = useHome()

  const currentOrder = currOrderId ? getCurrentOrder() : undefined

  if (!currentOrder) return <></>

  const delivering =
    currentOrder.type === "delivery" &&
    !!currentOrder.address.leaveAt &&
    !currentOrder.address.returnAt

  const archived =
    !!currentOrder?.archivedUntil && currentOrder?.archivedUntil > new Date()

  const buttons: {
    title: string
    icon: IconType
    color?:
      | "gray"
      | "gold"
      | "bronze"
      | "brown"
      | "yellow"
      | "amber"
      | "orange"
      | "tomato"
      | "red"
      | "ruby"
      | "crimson"
      | "pink"
      | "plum"
      | "purple"
      | "violet"
      | "iris"
      | "indigo"
      | "blue"
      | "cyan"
      | "teal"
      | "jade"
      | "green"
      | "grass"
      | "lime"
      | "mint"
      | "sky"
    visible: boolean
    enabled: boolean
    click: () => Promise<void>
  }[] = [
    {
      title: "Copiar confirmação do pedido para o clipboard",
      icon: FaClipboard,
      enabled: true,
      visible: true,
      click: async () => {},
    },
    {
      title: "Copiar texto do entregador para o clipboard",
      icon: FaMotorcycle,
      enabled: currentOrder.type === "delivery",
      visible: true,
      click: async () => {},
    },
    // {title: 'Copiar texto do entregador para o clipboard', icon: FaPeopleArrows, click: async () => {}},
    {
      title: "Finalizar entrega",
      icon: IoCheckmarkCircle,
      enabled: true,
      visible: delivering,
      color: "green",
      click: async () => {},
    },
    {
      title: "Cancelar entrega",
      icon: IoCloseCircle,
      enabled: true,
      visible: delivering,
      color: "red",
      click: async () => {},
    },
    {
      title: "Desarquivar pedido",
      icon: FaFolderOpen,
      enabled: true,
      visible: archived,
      color: "yellow",
      click: async () => {},
    },
  ]

  return (
    <Card className="h-full" style={{ padding: "8px" }}>
      <Flex direction={"column"} gap="5">
        {buttons
          .filter((x) => x.visible)
          .map((x) => (
            <IconButton
              key={x.title}
              variant="ghost"
              color={x.color}
              size={"4"}
              className=""
            >
              <IconBase className="text-2xl">
                <x.icon />
              </IconBase>
            </IconButton>
          ))}
      </Flex>
    </Card>
  )
}
