import { usePizzaBuilder } from "@/app/context/itemBuilder/Pizza"
import { DropdownMenu, Flex, IconButton, TextField } from "@radix-ui/themes"
import { name, sleep } from "@td/functions"
import { IDiscount } from "@td/types"
import { RefObject, useRef, useState } from "react"
import { MdArrowDropDown } from "react-icons/md"

export const Discount = () => {
  const { currentPizza, setDiscount, builder } = usePizzaBuilder()
  const [discountType, setDiscountType] = useState("R$")
  const inputRef = useRef<HTMLInputElement>()

  const DiscountTypeItem = ({ label }: { label: string }) => {
    return (
      <DropdownMenu.Item
        tabIndex={-1}
        onClick={async () => {
          setDiscountType(label)

          if (inputRef.current) {
            await sleep(0.5)
            inputRef.current.focus()
          }
        }}
      >
        {label}
      </DropdownMenu.Item>
    )
  }

  const PredefinedDiscount = ({ discount }: { discount: IDiscount }) => {
    return (
      <DropdownMenu.Item
        title={discount.description ?? discount.fullName}
        onClick={() => {
          setDiscount(discount.value)
          setDiscountType(discount.value.replace(/[^%]/g, "") ?? "R$")
        }}
      >
        {name(discount)}
      </DropdownMenu.Item>
    )
  }

  return (
    <Flex className="">
      <TextField.Root
        ref={inputRef as RefObject<HTMLInputElement>}
        id="discount-pizza-builder"
        type="number"
        min={0}
        max={100}
        className="flex-1"
        placeholder="Desconto..."
        value={currentPizza.discount?.replace(/[^0-9]/g, "")}
        onChange={(e) => {
          if (Number(e.target.value.replace(/[^0-9]/, "")) > 100) {
            e.preventDefault()
          } else {
            const percent = discountType === "%" ? "%" : ""
            setDiscount(e.target.value) + percent
          }
        }}
        onBlur={() => setDiscount(currentPizza.discount?.trim())}
      >
        <TextField.Slot>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <IconButton size={"1"} className="" variant="ghost">
                <MdArrowDropDown />
              </IconButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Group>
                {builder.discounts.map((discount) => (
                  <PredefinedDiscount key={discount.id} discount={discount} />
                ))}
              </DropdownMenu.Group>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </TextField.Slot>
        <TextField.Slot>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <IconButton size={"1"} className="" variant="ghost">
                {discountType}
              </IconButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DiscountTypeItem label="R$" />
              <DiscountTypeItem label="%" />
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </TextField.Slot>
      </TextField.Root>
    </Flex>
  )
}
