import { Flex, Text, CheckboxGroup } from "@radix-ui/themes"
import { name } from "@td/functions"
import { useSelectOptions } from "."
import { RefObject, useState } from "react"
import { IOtherExtra } from "@td/types"
import { ItemCategory } from "../../Category"
import { useHorizontalScroll } from "@/app/util/hooks/horizontalScroll"

export const Extras = () => {
  const { other, extras, setExtras } = useSelectOptions()

  const ref = useHorizontalScroll()
  if (!other.extras?.length) return <></>
  return (
    <>
      <ItemCategory category="Extras" />
      <CheckboxGroup.Root
        ref={ref as RefObject<HTMLDivElement>}
        value={extras.map((x) => x.id as string)}
        className="overflow-x-auto select-none no-scroll"
        onValueChange={(e) =>
          setExtras(
            (other.extras ?? [])?.filter((x) => e.includes(x.id as string)),
          )
        }
      >
        <Flex gap="2">
          {(other.extras ?? []).map((extra) => (
            <CheckboxGroup.Item key={extra.id} value={extra.id as string}>
              <Text truncate>{name(extra)}</Text>
            </CheckboxGroup.Item>
          ))}
        </Flex>
      </CheckboxGroup.Root>
    </>
  )
}
