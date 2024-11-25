import Accordion from "@/app/components/Accordion"
import { Button, Flex } from "@radix-ui/themes"
import { FaHotdog } from "react-icons/fa"
import { RiDrinks2Fill } from "react-icons/ri"
import { Order } from "./Order"
import { BottomInfo } from "./BottomInfo"
import { useOrders } from "@/app/context/Orders"

export const OrderList = () => {
  const {
    withdraw,
    notAccepted,
    delivery,
    delivering,
    delivered,
    done,
    archived,
    currentOrder,
    noType,
    createOrder,
    setCurrentOrder,
  } = useOrders()

  // currentOrder?.id ? "max-sm:hidden" : "max-sm:flex-2 max-sm:w-full"
  return (
    <>
      <div
        className={`flex flex-col min-w-52 min-h-0 h-full max-h-full gap-2 ${
          currentOrder ? "max-sm:hidden" : "max-sm:flex-2 max-sm:w-full"
        }`}
      >
        <Flex gap="2" className="flex w-full">
          <Button variant="outline" color="yellow" className="cursor-pointer">
            <FaHotdog />
          </Button>

          <Button
            style={{ flex: "1" }}
            color="orange"
            onClick={async () => {
              const order = await createOrder()
              await setCurrentOrder(order.id)
            }}
          >
            Novo Pedido
          </Button>

          <Button variant="outline" color="blue" className="cursor-pointer">
            <RiDrinks2Fill />
          </Button>
        </Flex>

        <Flex
          direction="column"
          className="list-none min-h-0 h-full justify-start"
          gap={"1"}
          flexGrow={"1"}
          flexShrink={"1"}
        >
          <Accordion
            title={"⁉️ Pedidos sem tipo"}
            color={"gray"}
            hidden={!noType.length}
          >
            {noType.map((order) => (
              <Order key={order.id} order={order} />
            ))}
          </Accordion>
          <Accordion
            title={"Pedidos da Web 🌐"}
            color={"amber"}
            hidden={!notAccepted.length}
          >
            {notAccepted.map((order) => (
              <Order key={order.id} order={order} />
            ))}
          </Accordion>
          <Accordion
            title={`🏪 Retirada: ${withdraw.length}`}
            color={"brown"}
            hidden={!withdraw.length}
          >
            {withdraw.map((order) => (
              <Order key={order.id} order={order} />
            ))}
          </Accordion>
          <Accordion
            title={`🛵 Entrega: ${delivery.length}`}
            color={"blue"}
            hidden={!delivery.length}
          >
            {delivery.map((order) => (
              <Order key={order.id} order={order} />
            ))}
          </Accordion>
          <div className="flex-1 min-h-0" />
          <Accordion
            title={`✅ Já foram entregues: ${delivered.length}`}
            color={"lime"}
            defaultIsOpen={false}
            hidden={!delivered.length}
          >
            {delivered.map((order) => (
              <Order key={order.id} order={order} />
            ))}
          </Accordion>
          <Accordion
            title={`🌍 Saiu pra entrega: ${delivering.length}`}
            color={"indigo"}
            defaultIsOpen={false}
            hidden={!delivering.length}
          >
            {delivering.map((order) => (
              <Order key={order.id} order={order} />
            ))}
          </Accordion>
          <Accordion
            title={`🍕 Prontos: ${done.length}`}
            color={"amber"}
            defaultIsOpen={false}
            hidden={!done.length}
          >
            {done.map((order) => (
              <Order key={order.id} order={order} />
            ))}
          </Accordion>
          <Accordion
            title={`🗂️ Arquivados: ${archived.length}`}
            color={"red"}
            defaultIsOpen={false}
            hidden={!archived.length}
          >
            {archived.map((order) => (
              <Order key={order.id} order={order} />
            ))}
          </Accordion>
        </Flex>
        <BottomInfo />
      </div>
    </>
  )
}
