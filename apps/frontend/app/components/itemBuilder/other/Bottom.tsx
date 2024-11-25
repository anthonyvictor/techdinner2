import { Card, Flex, Grid, Text } from "@radix-ui/themes"
import { currency, getOtherValue } from "@td/functions"
import { ModalBottom } from "../../ModalBottom"
import { applyDiscount, getDiscountValue } from "@td/functions/src/calc"

import { z, ZodError } from "zod"
import { errorToast } from "@/app/util/functions/toast"
import { useOtherBuilder } from "@/app/context/itemBuilder/Other"
import { IBuildingOther, IOrderItem } from "@td/types"
import { useContrDialog } from "../../ControlledDialog"
import { useItemBuilder } from "@/app/context/itemBuilder"
import { v4 as uuidv4 } from "uuid"

export const Bottom = () => {
  const { currentOthers, nextButtonRef, discount, orderId, observations } =
    useOtherBuilder()

  const {
    addMultipleItemsToOrder,
    addMultipleItemsToPromo,
    currentPromo,
    currentPromoBuilder,
    currentPromoCode,
    currentPromoBuilderCode,
  } = useItemBuilder()
  const { setOpen } = useContrDialog()

  const othersValue = currentOthers.reduce(
    (acc, curr) => acc + getOtherValue(curr),
    0,
  )

  const discountValue = currentOthers.reduce((acc, curr) => {
    const otherValue = getOtherValue(curr)
    const _discount = getDiscountValue(otherValue, discount)
    return acc + _discount
  }, 0)

  const save = async () => {
    const others: IOrderItem[] = currentOthers.map((x) => ({
      ...x,
      id: orderId ? x.id : "",
      orderId,
      type: "other",
      initialValue: getOtherValue(x),
      observations: observations ? observations.trim() : undefined,
      discount,
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
    }))
    if (!currentPromo) {
      await addMultipleItemsToOrder(others, orderId)
    } else {
      addMultipleItemsToPromo(others)
    }
    setOpen(false)
  }

  return (
    <Flex direction={"column"} gap="2">
      <Card>
        <Grid columns={"2"}>
          <Text size={"1"} color="gray">
            Bebidas
            {currentOthers.length ? ` (${currentOthers.length})` : ""}:
          </Text>
          <Text size={"1"} align={"right"} color="gray">
            {currency(othersValue)}
          </Text>

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
            {currency(applyDiscount(othersValue, discount))}
          </Text>
        </Grid>
      </Card>

      <ModalBottom
        type="dialog"
        nextRef={nextButtonRef}
        beforeNext={() => {
          try {
            const schema = z
              .array(
                z
                  .object({
                    size: z.object({
                      id: z.string({
                        required_error: "Selecione a variação",
                      }),
                    }),
                    variation: z
                      .object({
                        id: z.string({
                          required_error: "Selecione a variação",
                        }),
                        values: z.array(
                          z.object({
                            size: z.object({
                              id: z.string({
                                required_error: "Tamanho da variação incorreto",
                              }),
                            }),
                            value: z.number({
                              required_error: "Valor da variação incorreto",
                            }),
                          }),
                        ),
                      })
                      .optional(),

                    discount: z.string().optional(),
                  })
                  .refine(
                    (x) => {
                      const finalValue = applyDiscount(
                        getOtherValue(x as unknown as IBuildingOther),
                        discount,
                      )
                      if (finalValue < 0) return false
                      return true
                    },
                    { message: "Valor final não pode ser menor que zero!" },
                  ),
              )
              .min(1, "Insira pelo menos 1 item")

            schema.parse(currentOthers)

            // if (currentOthers.some((x) => applyDiscount(getOtherValue(x)) < 0))
            //   return false

            return true
          } catch (err) {
            if (err instanceof ZodError) {
              errorToast((err as ZodError).issues[0].message)
            }
            return false
          }
        }}
        onNext={save}
      />
    </Flex>
  )
}
