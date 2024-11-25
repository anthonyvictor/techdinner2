import { PromoBuilderProvider } from "@/app/context/itemBuilder/Promo"
import { useCurrentWindowSetter } from "@/app/util/hooks/currentWindowSetter"
import { ItemBuilderPage } from "../ItemBuilder"
import { PizzaBuilder } from "../pizza"
import { DrinkBuilder } from "../drink"
import { ContrDialog } from "../../ControlledDialog"
import { useItemBuilder } from "@/app/context/itemBuilder"
import { OtherBuilder } from "../other"

export const PromoBuilder = ({ orderId }: { orderId: string }) => {
  return (
    <PromoBuilderProvider orderId={orderId}>
      <PromoBuilderContent />
    </PromoBuilderProvider>
  )
}
export const PromoBuilderContent = () => {
  const THIS_WINDOW = "promo-builder"
  useCurrentWindowSetter(THIS_WINDOW)

  const { currentPromoBuilder } = useItemBuilder()

  return (
    currentPromoBuilder && (
      <ContrDialog open={!!currentPromoBuilder}>
        <ItemBuilderPage>
          {currentPromoBuilder?.type === "pizza" ? (
            <>
              <PizzaBuilder orderId={""} />
            </>
          ) : currentPromoBuilder.type === "group" &&
            currentPromoBuilder?.options.every((x) => x.type === "drink") ? (
            <>
              {console.log("abriu drink")}
              <DrinkBuilder orderId="" />
            </>
          ) : currentPromoBuilder.type === "group" &&
            currentPromoBuilder?.options.every((x) => x.type === "other") ? (
            <>
              <OtherBuilder orderId="" />
            </>
          ) : (
            <></>
          )}
        </ItemBuilderPage>
      </ContrDialog>
    )
  )
}
