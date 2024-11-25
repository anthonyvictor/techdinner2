import { PromoBuilder } from "@/app/components/itemBuilder/promo"
import { MyAvatar } from "@/app/components/MyAvatar"
import { useItemBuilder } from "@/app/context/itemBuilder"
import { useOrders } from "@/app/context/Orders"
import { Card, Flex, Strong, Text } from "@radix-ui/themes"
import { name } from "@td/functions/src/format"
import { IBuildingPromo } from "@td/types"
import { FaHotdog } from "react-icons/fa"

export const Promo = ({ promo }: { promo: IBuildingPromo }) => {
  const { currentOrder } = useOrders()

  const { isPromoPageOpen, setIsPromoPageOpen, setCurrentPromo, currentPromo } =
    useItemBuilder()

  return (
    <>
      <Card
        key={promo.id}
        asChild
        className={`p-2 shrink-0 max-w-96`}
        onClick={() => {
          console.log(currentPromo, isPromoPageOpen)
          setCurrentPromo(promo)
          setIsPromoPageOpen(true)
        }}
      >
        <button>
          <Flex className="shrink-0 items-center gap-2 relative">
            <MyAvatar src={promo.imageUrl} fallback={<FaHotdog />} size={"8"} />
            <Flex
              direction={"column"}
              gap="1"
              flexGrow={"0"}
              maxWidth={"100%"}
              minWidth={"0"}
            >
              <Text>
                <Strong>{name(promo)}</Strong>
              </Text>
              {promo.description && (
                <Text size={"1"} weight={"light"}>
                  {promo.description}
                </Text>
              )}
              <Text size="1">{promo.stock && `saem: ${promo.stock}`}</Text>
            </Flex>
          </Flex>
        </button>
      </Card>
      <>
        {isPromoPageOpen && currentPromo?.id === promo.id && (
          <PromoBuilder orderId={currentOrder ?? ""} />
        )}
      </>
    </>
  )
}
