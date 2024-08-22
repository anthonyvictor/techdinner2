import { useHome } from "@/app/context/Home";
import { Color } from "@/app/infra/types/color";
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  HoverCard,
  Strong,
  Text,
} from "@radix-ui/themes";
import {
  getCustomerName,
  getPayment,
  getPaymentStatus,
  getTotal,
} from "@td/functions";
import { applyDiscount } from "@td/functions/src/calc";
import { currency } from "@td/functions/src/format";
import { useState } from "react";
import { IconType } from "react-icons";
import { FaCreditCard, FaMoneyBills, FaPix } from "react-icons/fa6";

export const PaymentBox = () => {
  const { currentOrder } = useHome();

  const { initialFee, feeDiscount, initialItems, itemsDiscount, total } =
    getTotal(currentOrder);

  const methods: {
    name: "pix" | "cash" | "card";
    label: string;
    icon: IconType;
    color: Color;
  }[] = [
    { name: "pix", label: "PIX", icon: FaPix, color: "jade" },
    { name: "cash", label: "Espécie", icon: FaMoneyBills, color: "lime" },
    { name: "card", label: "Cartão", icon: FaCreditCard, color: "purple" },
  ];

  return (
    <HoverCard.Root>
      <HoverCard.Trigger>
        <Card
          className=""
          style={{
            flexShrink: "0",
          }}
          onMouseEnter={() => {}}
        >
          <Grid columns={"2"} className="text-xs">
            <Text size={"1"}>Itens ({currentOrder.items.length})</Text>
            <Text align={"right"} size={"1"}>
              {currency(initialItems)}

              {itemsDiscount > 0 && (
                <Text color="grass">{` - ${currency(itemsDiscount)}`}</Text>
              )}
            </Text>
            {currentOrder.type === "delivery" && (
              <>
                <Text size={"1"}>Entrega</Text>
                <Text align={"right"} size={"1"}>
                  {currency(initialFee)}
                  {feeDiscount > 0 && (
                    <Text color="grass">{` - ${currency(feeDiscount)}`}</Text>
                  )}
                </Text>
              </>
            )}

            {(() => {
              const { color } = getPaymentStatus(currentOrder);
              return (
                <>
                  <Text size={"2"} color={color}>
                    <Strong>Total</Strong>
                  </Text>
                  <Text align={"right"} size={"2"} color={color}>
                    <Strong>{currency(total)}</Strong>
                  </Text>
                </>
              );
            })()}
          </Grid>
          <Flex gap="2" pt="1">
            {methods.map((method) => (
              <Button
                key={method.name}
                style={{ flexGrow: "1" }}
                color={method.color}
                variant="outline"
              >
                <Text>{<method.icon />}</Text>
                <Text>{method.label}</Text>
              </Button>
            ))}
          </Flex>
        </Card>
      </HoverCard.Trigger>

      {!!currentOrder.payments.length && (
        <HoverCard.Content size={"3"}>
          <Flex className="flex-col gap-2">
            {currentOrder.payments.map((payment) => {
              const {
                changeFor,
                changeValue,
                color,
                formattedValue,
                icon: Icon,
              } = getPayment(payment);
              return (
                <Card key={payment.id} asChild>
                  <button>
                    <Flex align={"center"} gap="2">
                      <Text color={color}>{<Icon />}</Text>
                      <Box>
                        <Box>
                          <Text color={color}>
                            <Strong>{currency(payment.paidValue)}</Strong>
                          </Text>
                          {" - "}
                          <Text color={color}>{formattedValue}</Text>
                        </Box>
                        {!!changeFor && (
                          <Box>
                            <Text color={color} size={"1"}>
                              {changeFor} ({changeValue})
                            </Text>
                          </Box>
                        )}
                      </Box>
                    </Flex>
                  </button>
                </Card>
              );
            })}
          </Flex>
        </HoverCard.Content>
      )}
    </HoverCard.Root>
  );
};
