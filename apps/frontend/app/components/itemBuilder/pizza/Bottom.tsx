import { usePizzaBuilder } from "@/app/context/itemBuilder/Pizza"
import { Card, Flex, Grid, Text } from "@radix-ui/themes"
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
import { IBuildingPizza, IOrderItem } from "@td/types"
import { z, ZodError } from "zod"
import { errorToast } from "@/app/util/functions/toast"
import { useState } from "react"
import { Divide } from "./Divide"
import { useContrDialog } from "../../ControlledDialog"
import { useItemBuilder } from "@/app/context/itemBuilder"
import { v4 as uuidv4 } from "uuid"

export const Bottom = () => {
  const { currentPizza, nextButtonRef } = usePizzaBuilder()
  const {
    addMultipleItemsToOrder,
    addMultipleItemsToPromo,
    currentPromo,
    currentPromoBuilder,
    currentPromoCode,
    currentPromoBuilderCode,
  } = useItemBuilder()
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

  const save = async () => {
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
      promo:
        currentPromo && currentPromoBuilder
          ? {
              id: currentPromo.id,
              code: currentPromoCode,
              builderId: currentPromoBuilder.id,
              builderCode: currentPromoBuilderCode,
              optionCode: uuidv4(),
            }
          : undefined,
    }

    if (!currentPromo) {
      await addMultipleItemsToOrder([pizza], orderId)
    } else {
      await addMultipleItemsToPromo([pizza])
    }
    // await addOrUpdateItem(pizza)
    setOpen(false)
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
          <Text weight={"bold"} color="orange">
            Preço:
          </Text>
          <Text align={"right"} weight={"bold"} color="orange">
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
            const schema = z
              .object({
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
                discount: z.string().optional(),
              })
              .refine(
                () => {
                  if (
                    applyDiscount(
                      getPizzaValue(currentPizza),
                      currentPizza.discount,
                    ) < 0
                  )
                    return false
                  return true
                },
                { message: "Valor final não pode ser menor que zero!" },
              )

            schema.parse(currentPizza)

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
        onNext={save}
      />

      <Divide
        divideModalOpen={divideModalOpen}
        setDivideModalOpen={setDivideModalOpen}
      />
    </Flex>
  )
}
