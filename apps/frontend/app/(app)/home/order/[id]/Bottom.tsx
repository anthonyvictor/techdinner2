import { useOrders } from "@/app/context/Orders"
import { Button, Flex, IconButton } from "@radix-ui/themes"
import { FaCheck, FaPrint, FaTrash } from "react-icons/fa"

export const Bottom = () => {
  const { currentOrder } = useOrders()
  if (!currentOrder) return <></>
  return (
    <Flex className="w-full " gap="1" justify={"center"}>
      <IconButton color="red">
        <FaTrash />
      </IconButton>
      <IconButton color="yellow">
        <FaPrint />
      </IconButton>
      <Button color="green" style={{ flexGrow: "1" }} className="flex-1">
        <FaCheck /> Finalizar
      </Button>
    </Flex>
  )
}
