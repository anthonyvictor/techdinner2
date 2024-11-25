import { Button, Dialog, Flex, Text } from "@radix-ui/themes"
import { ContrDialog, useContrDialog } from "../../ControlledDialog"
import {
  IBuildingPizza,
  IBuildingPizzaFlavor,
  IOrderItem,
  IPizzaSize,
} from "@td/types"
import { getPizzaValue } from "@td/functions"
import { useState } from "react"
import { usePizzaBuilder } from "@/app/context/itemBuilder/Pizza"
import { SetState } from "@/app/infra/types/setState"
import { useItemBuilder } from "@/app/context/itemBuilder"

export const Divide = ({
  divideModalOpen,
  setDivideModalOpen,
}: {
  divideModalOpen: boolean
  setDivideModalOpen: SetState<boolean>
}) => {
  const { currentPizza, nextButtonRef } = usePizzaBuilder()
  const { addMultipleItemsToOrder } = useItemBuilder()

  const { setOpen } = useContrDialog()

  const dividePizza = async () => {
    setDivideModalOpen(false)
    const basePizza = currentPizza as Required<IBuildingPizza>

    const orderId = basePizza?.id
      ? (basePizza as IOrderItem)?.orderId ?? ""
      : ""

    const flavorsGroups: IBuildingPizzaFlavor[][] = []

    currentPizza.flavors.forEach((flavor) => {
      const fg = [...flavorsGroups]
      let added = false
      fg.forEach((flavors) => {
        if (flavors.length < (currentPizza.size as IPizzaSize).maxflavors) {
          flavors.push(flavor)
          added = true
        } else {
          flavorsGroups.push([flavor])
          added = true
        }
      })

      if (!added) flavorsGroups.push([flavor])
    })

    const pizzas: IOrderItem[] = flavorsGroups.map((flavors) => ({
      type: "pizza",
      ...basePizza,
      flavors,
      id: "",
      orderId,
      initialValue: getPizzaValue(currentPizza),
    }))

    await addMultipleItemsToOrder(pizzas, orderId)

    setOpen(false)
  }
  return (
    <>
      <ContrDialog open={divideModalOpen} setOpen={setDivideModalOpen}>
        <Dialog.Content>
          <Dialog.Title>
            Quantidade de sabores maior do que o tamanho aceita
          </Dialog.Title>
          <Dialog.Description>
            Deseja dividir a pizza? Ou quer manter os sabores escolhidos em uma
            pizza só?
          </Dialog.Description>
          <Flex gap={"2"} py={"2"}>
            <Dialog.Close onClick={() => setDivideModalOpen(false)}>
              <Button color="red" variant="outline" size={"3"}>
                <Text>Voltar</Text>
              </Button>
            </Dialog.Close>
            <Dialog.Close onClick={nextButtonRef.current?.click}>
              <Button color="blue" size={"3"}>
                <Text>Manter</Text>
              </Button>
            </Dialog.Close>
            <Dialog.Close onClick={dividePizza} tabIndex={0}>
              <Button size={"3"} tabIndex={0}>
                <Text>Dividir</Text>
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </ContrDialog>
    </>
  )
}
