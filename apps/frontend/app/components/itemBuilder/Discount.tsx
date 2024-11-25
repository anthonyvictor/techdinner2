import { DropdownMenu, Flex, IconButton, TextField } from "@radix-ui/themes"
import { name, sleep } from "@td/functions"
import { IDiscount } from "@td/types"
import { useRef, useState } from "react"
import { MdArrowDropDown } from "react-icons/md"
import { Ref } from "../../infra/types/ref"
import { currencyNumbers, numbers } from "@/app/infra/data/ascii"

export const ItemDiscount = ({
  preDiscounts,
  discountString,
  setDiscountString,
}: {
  preDiscounts: IDiscount[]
  discountString?: string
  setDiscountString: (value: string) => void
}) => {
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
          setDiscountString(discount.value)
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
        ref={inputRef as Ref<HTMLInputElement>}
        id="discount-builder"
        tabIndex={2}
        type="number"
        min={0}
        max={100}
        className="flex-1"
        placeholder="Desconto..."
        value={(discountString ?? "")?.replace(/[^0-9,.]/g, "")}
        onKeyDown={(e) => {
          if (!currencyNumbers.includes(e.key)) {
            e.preventDefault()
          }
        }}
        onChange={(e) => {
          const value = Number(e.target.value.replace(/[^0-9,.]/, ""))
          if (value > 100) {
            e.preventDefault()
          } else {
            const percent = discountType === "%" ? "%" : ""
            setDiscountString(value.toString() + percent)
          }
        }}
        onBlur={() => {
          if (discountString) {
            setDiscountString(discountString?.trim())
          }
        }}
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
                {preDiscounts.map((discount) => (
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
