"use client"
import { Avatar, Card, Flex, Strong, Text } from "@radix-ui/themes"
import { applyDiscount } from "@td/functions/src/calc"
import { currency, name, pluralize } from "@td/functions/src/format"
import { IOrderItem, IPizzaSize } from "@td/types"
import { useState } from "react"
import { FaHotdog, FaPizzaSlice, FaWineBottle } from "react-icons/fa"
import { MyAvatar } from "../../MyAvatar"

export const Item = ({ items }: { items: IOrderItem[] }) => {
  const [myImage, setMyImage] = useState<string | undefined>()
  const item = items[0]

  return (
    <Card
      className="select-none"
      asChild
      style={{
        flexShrink: "0",
      }}
    >
      <button>
        <Flex gap="2">
          <MyAvatar
            color="gray"
            src={myImage}
            fallback={
              item.type === "pizza" ? (
                <FaPizzaSlice />
              ) : item.type === "drink" ? (
                <FaWineBottle />
              ) : (
                <FaHotdog />
              )
            }
            onError={() => {
              setMyImage(undefined)
            }}
          />

          <Flex direction={"column"} flexGrow={"1"}>
            <Text size={"2"}>
              {items.length > 1 && (
                <>
                  <Text color="amber">
                    <Strong>{`${items.length}x`}</Strong>
                  </Text>
                  {" - "}
                </>
              )}
              <Strong>
                {item.type === "pizza"
                  ? `Pizza ${name(item.size as IPizzaSize)} - ${item.flavors.length} ${pluralize("sabor", item.flavors.length, "es")}`
                  : name(item)}
              </Strong>
            </Text>
            {item.type === "drink" && item.flavor && (
              <Text size={"1"}>{`${name(item.flavor)}`}</Text>
            )}
            {item.type === "pizza" && (
              <Text size={"1"}>
                {item.flavors.map((flavor) => `${name(flavor)}`).join(", ")}
              </Text>
            )}
            {item.observations && (
              <Text size={"1"} color="red">
                {item.observations}
              </Text>
            )}
            <Flex align={"center"} justify={"between"}>
              <Text size={"1"}>
                <Strong>
                  {currency(
                    applyDiscount(item.initialValue, item.discount) *
                      items.length,
                  )}
                </Strong>
                <Text color="grass">
                  {item.discount && (
                    <>{` - ${item.discount.includes("%") ? item.discount : currency(Number(item.discount))}`}</>
                  )}
                </Text>
              </Text>

              {/* <Flex align={"center"} gap="1" py="1">
                <IconButton radius="full" size={"1"}>
                  <FaPlus />
                </IconButton>
                {items.length > 1 ? (
                  <Strong>{items.length}</Strong>
                ) : (
                  <Text>{items.length}</Text>
                )}
                <IconButton radius="full" size={"1"}>
                  <FaMinus />
                </IconButton>
              </Flex> */}
            </Flex>
          </Flex>
        </Flex>
      </button>
    </Card>
  )
}
