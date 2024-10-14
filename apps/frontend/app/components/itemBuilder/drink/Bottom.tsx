import { Card, Flex, Grid, Text } from "@radix-ui/themes"
import { currency, getDrinkValue } from "@td/functions"
import { ModalBottom } from "../../ModalBottom"
import { applyDiscount, getDiscountValue } from "@td/functions/src/calc"

import { z, ZodError } from "zod"
import { errorToast } from "@/app/util/functions/toast"
import { useDrinkBuilder } from "@/app/context/itemBuilder/Drink"
import { IBuildingDrink, IOrderItem } from "@td/types"
import { useContrDialog } from "../../ControlledDialog"

export const Bottom = () => {
  const { currentDrinks, nextButtonRef, discount, addMultipleItems, orderId } =
    useDrinkBuilder()
  const { setOpen } = useContrDialog()

  const drinksValue = currentDrinks.reduce(
    (acc, curr) => acc + getDrinkValue(curr),
    0,
  )

  const discountValue = currentDrinks.reduce((acc, curr) => {
    const drinkValue = getDrinkValue(curr)
    const _discount = getDiscountValue(drinkValue, discount)
    return acc + _discount
  }, 0)

  const save = async () => {
    const drinks: IOrderItem[] = currentDrinks.map((x) => ({
      ...x,
      id: orderId ? x.id : "",
      orderId,
      type: "drink",
      initialValue: getDrinkValue(x),
    }))
    await addMultipleItems(drinks)
    setOpen(false)
  }

  return (
    <Flex direction={"column"} gap="2">
      <Card>
        <Grid columns={"2"}>
          <Text size={"1"} color="gray">
            Bebidas
            {currentDrinks.length ? ` (${currentDrinks.length})` : ""}:
          </Text>
          <Text size={"1"} align={"right"} color="gray">
            {currency(drinksValue)}
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
            {currency(applyDiscount(drinksValue, discount))}
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
                    flavor: z
                      .object({
                        id: z.string({
                          required_error: "Selecione o sabor",
                        }),
                        originalValue: z.number().optional(),
                      })
                      .optional(),

                    discount: z.string().optional(),
                    originalValue: z.number(),
                  })
                  .refine(
                    (x) => {
                      const finalValue = applyDiscount(
                        getDrinkValue(x as IBuildingDrink),
                        discount,
                      )
                      if (finalValue < 0) return false
                      return true
                    },
                    { message: "Valor final não pode ser menor que zero!" },
                  ),
              )
              .min(1, "Insira pelo menos 1 item")

            schema.parse(currentDrinks)

            // if (currentDrinks.some((x) => applyDiscount(getDrinkValue(x)) < 0))
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
