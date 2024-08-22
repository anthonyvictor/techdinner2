import { usePizzaBuilder } from "@/app/context/itemBuilder/Pizza"
import { Button, Card, Dialog, Flex, Grid, Text } from "@radix-ui/themes"
import {
  currency,
  getPizzaValue,
  getCrustValueBySize,
  getDoughValueBySize,
  getFlavorsValueBySize,
  getExtrasValueBySize,
} from "@td/functions"
import { ModalBottom } from "../../ModalBottom"
import { applyDiscount, getDiscountValue } from "@td/functions/src/calc"
import { useHome } from "@/app/context/Home"
import {
  IBuildingPizza,
  IBuildingPizzaFlavor,
  IOrderItem,
  IPizzaSize,
} from "@td/types"
import { z, ZodError } from "zod"
import { errorToast } from "@/app/util/functions/toast"
import { ContrDialog, useContrDialog } from "../../ControlledDialog"
import { useState } from "react"

export const Bottom = () => {
  const { currentPizza, nextButtonRef } = usePizzaBuilder()
  const { addMultipleItems } = useHome()
  const [divideModalOpen, setDivideModalOpen] = useState(false)
  const { setOpen } = useContrDialog()

  const crustValue = currentPizza
    ? getCrustValueBySize(currentPizza.size, currentPizza.crust)
    : 0
  const doughValue = currentPizza
    ? getDoughValueBySize(
        currentPizza.size,
        currentPizza?.dough?.thickness,
        currentPizza?.dough?.type,
      )
    : 0
  const flavorsValue = currentPizza
    ? getFlavorsValueBySize(currentPizza.flavors, currentPizza.size)
    : 0

  const extrasValue = currentPizza
    ? getExtrasValueBySize(currentPizza.extras, currentPizza.size)
    : 0

  const discountValue = getDiscountValue(
    getPizzaValue(currentPizza),
    currentPizza.discount,
  )

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

    addMultipleItems(pizzas)

    setOpen(false)
  }
  const savePizza = async () => {
    setDivideModalOpen(false)
    const basePizza = currentPizza as Required<IBuildingPizza>
    const orderId = basePizza?.id
      ? (basePizza as IOrderItem)?.orderId ?? ""
      : ""
    const pizza: IOrderItem = {
      type: "pizza",
      ...basePizza,
      id: orderId ? basePizza.id : "",
      orderId,
      initialValue: getPizzaValue(currentPizza),
    }
    // await addOrUpdateItem(pizza)
    // setOpen(false)
  }
  return (
    <Flex direction={"column"} gap="2">
      <Card>
        <Grid columns={"2"}>
          <Text size={"1"} color="gray">
            Sabores
            {currentPizza.flavors?.length
              ? ` (${currentPizza.flavors?.length})`
              : ""}
            :
          </Text>
          <Text size={"1"} align={"right"} color="gray">
            {currency(flavorsValue)}
          </Text>
          {crustValue > 0 && (
            <>
              <Text size={"1"} color="gray">
                Borda:
              </Text>
              <Text size={"1"} align={"right"} color="gray">
                {currency(crustValue)}
              </Text>
            </>
          )}
          {doughValue > 0 && (
            <>
              <Text size={"1"} color="gray">
                Massa:
              </Text>
              <Text size={"1"} align={"right"} color="gray">
                {currency(doughValue)}
              </Text>
            </>
          )}
          {extrasValue > 0 && (
            <>
              <Text size={"1"} color="gray">
                Extras
                {currentPizza.extras?.length
                  ? ` (${currentPizza.extras?.length})`
                  : ""}
                :
              </Text>
              <Text size={"1"} align={"right"} color="gray">
                {currency(extrasValue)}
              </Text>
            </>
          )}
          {discountValue > 0 && (
            <>
              <Text size={"1"} color="grass">
                Desconto
              </Text>
              <Text size={"1"} align={"right"} color="grass">
                - {currency(discountValue)}
              </Text>
            </>
          )}
          <Text>Total:</Text>
          <Text align={"right"}>
            {currency(
              applyDiscount(getPizzaValue(currentPizza), currentPizza.discount),
            )}
          </Text>
        </Grid>
      </Card>

      <ModalBottom
        type="dialog"
        nextRef={nextButtonRef}
        beforeNext={() => {
          try {
            const pizzaSchema = z.object({
              size: z
                .object(
                  {
                    id: z
                      .string({ required_error: "Selecione o tamanho" })
                      .min(1, "Selecione o tamanho"),
                  },
                  {
                    required_error: "Selecione o tamanho",
                    invalid_type_error: "Selecione o tamanho",
                  },
                )
                .required(),
              flavors: z
                .array(
                  z.object({
                    id: z.string({
                      required_error: "Insira pelo menos um sabor",
                    }),
                  }),
                )
                .min(1, { message: "Insira pelo menos um sabor" }),
            })

            pizzaSchema.parse(currentPizza)

            if (
              !(currentPizza as IOrderItem)?.orderId &&
              (currentPizza.flavors.length ?? 0) >
                (currentPizza.size?.maxflavors ?? 0)
            ) {
              setDivideModalOpen(true)
              return false
            } else {
              return true
            }
          } catch (err) {
            if (err instanceof ZodError) {
              errorToast((err as ZodError).issues[0].message)
            }
            return false
          }
        }}
        onNext={savePizza}
      />

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
            <Dialog.Close onClick={savePizza}>
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
    </Flex>
  )
}
