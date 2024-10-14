import { useHome } from "@/app/context/Home"
import { Color } from "@/app/infra/types/color"
import { Flex, SegmentedControl, Select, Text } from "@radix-ui/themes"
import { IOrderPlatform, IOrderType } from "@td/types"
import { IconType } from "react-icons"
import {
  FaHome,
  FaInstagram,
  FaPhone,
  FaTelegram,
  FaTruck,
  FaWhatsapp,
} from "react-icons/fa"
import { MdRoomService } from "react-icons/md"

export const TypeBox = () => {
  const {
    currentOrder: currOrderId,
    getCurrentOrder,
    setPlatform,
    setType,
  } = useHome()

  const currentOrder = currOrderId ? getCurrentOrder() : undefined

  if (!currentOrder) return <></>

  const platforms: {
    label: string
    value: IOrderPlatform
    icon: IconType
    color: Color
  }[] = [
    { label: "WhatsApp", value: "whatsapp", icon: FaWhatsapp, color: "green" },
    { label: "Balcão", value: "desk", icon: MdRoomService, color: "brown" },
    // {
    //   label: "Sites",
    //   value: "api",
    //   icon: FaExternalLinkSquareAlt,
    //   color: "red",
    // },
    // { label: "Web App", value: "webapp", icon: MdAppShortcut, color: "orange" },
    { label: "Ligação", value: "call", icon: FaPhone, color: "gray" },
    { label: "Telegram", value: "telegram", icon: FaTelegram, color: "sky" },
    {
      label: "Instagram",
      value: "instagram",
      icon: FaInstagram,
      color: "pink",
    },
  ]

  return (
    <Flex gap="2" align={"center"}>
      <SegmentedControl.Root
        size={"3"}
        radius="full"
        value={currentOrder.type}
        aria-disabled={!currentOrder.customer}
        className="aria-disabled:opacity-50 aria-disabled:pointer-events-none"
        onValueChange={(e) => setType(e as IOrderType)}
      >
        <SegmentedControl.Item value="withdraw">
          <Flex className="gap-1 md:gap-0 md:flex-col items-center justify-center">
            <Text color={"brown"}>
              <FaHome />
            </Text>
            <Text size={"1"} color={"brown"}>
              Retirada
            </Text>
          </Flex>
        </SegmentedControl.Item>
        <SegmentedControl.Item value="delivery">
          <Flex className="gap-1 md:gap-0 md:flex-col items-center justify-center">
            <Text color={"blue"}>
              <FaTruck />
            </Text>
            <Text size={"1"} color="blue">
              Entrega
            </Text>
          </Flex>
        </SegmentedControl.Item>
      </SegmentedControl.Root>
      <Select.Root
        value={currentOrder.platform ?? "0"}
        onValueChange={(e) => {
          if (e !== "0") {
            // console.log(e)
            setPlatform(e as IOrderPlatform)
          }
        }}
      >
        <Select.Trigger
          placeholder="Plataforma..."
          className="flex-1"
          style={{ padding: "20px 10px", flex: "1" }}
        />
        <Select.Content color="orange">
          <Select.Item value={"0"} disabled>
            <Flex align={"center"} gap="2">
              {/* <Text color={'gray'}>
                <platform.icon />
              </Text> */}
              <Text color={"gray"}>Selecione...</Text>
            </Flex>
          </Select.Item>
          {platforms.map((platform) => (
            <Select.Item key={platform.value} value={platform.value}>
              <Flex align={"center"} gap="2">
                <Text color={platform.color}>
                  <platform.icon />
                </Text>
                <Text color={platform.color}>{platform.label}</Text>
              </Flex>
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Flex>
  )
}
