import { ContrDialog } from "@/app/components/ControlledDialog"
import { OtherBuilder } from "@/app/components/itemBuilder/other"
import { ItemBuilder } from "@/app/components/itemBuilder/ItemBuilder"
import { MyAvatar } from "@/app/components/MyAvatar"
import { MyCard } from "@/app/components/MyCard"
import { Name } from "@/app/components/order/item/Name"
import { Price } from "@/app/components/order/item/Price"
import { useHome } from "@/app/context/Home"
import { Flex, Separator, Text } from "@radix-ui/themes"
import { getOtherValue } from "@td/functions"
import { getDiscountValue } from "@td/functions/src/calc"
import { name } from "@td/functions/src/format"
import { IOrderItemOther } from "@td/types"
import { FaWineBottle } from "react-icons/fa"
import { Observations } from "@/app/components/order/item/Observations"
import { Extras } from "@/app/components/order/item/Extras"
import { Modifications } from "@/app/components/order/item/Modifications"

export const Other = ({ others }: { others: IOrderItemOther[] }) => {
  const { currentOrder, addMultipleItems } = useHome()

  const other = others[0]
  return (
    <ContrDialog
      trigger={
        <>
          <MyCard>
            <Flex className="shrink-0 min-w-max items-center gap-2 min-h-12">
              <MyAvatar src={other.imageUrl} fallback={<FaWineBottle />} />
              <Flex
                direction={"column"}
                align={"start"}
                flexGrow={"0"}
                maxWidth={"100%"}
                minWidth={"0"}
              >
                <Name
                  item={`${name(other)}${other.sizes.length > 1 ? ` (${name(other.size)})` : ""}`}
                  amount={others.length}
                />
                <Text size="1" color="gray" align={"left"}>
                  {other.variations.length > 1 && (
                    <Text>{`${name(other.variation)}`}</Text>
                  )}
                  <Modifications modifications={other.modifications} />
                  <Extras extras={other.finalExtras} />
                  <Observations item={other} />
                  <Price
                    value={getOtherValue(other) * others.length}
                    discount={others.reduce(
                      (acc, curr) =>
                        acc +
                        getDiscountValue(getOtherValue(curr), curr.discount),
                      0,
                    )}
                  />
                </Text>
              </Flex>
            </Flex>
          </MyCard>
        </>
      }
    >
      <ItemBuilder>
        <OtherBuilder
          other={other}
          orderId={currentOrder ?? ""}
          addMultipleItems={addMultipleItems}
        />
      </ItemBuilder>
    </ContrDialog>
  )
}

// ;<Card className="py-2 max-w-full min-w-0 w-full" size={"1"}>
//   <Flex
//     className="gap-3 overflow-x-auto max-w-full min-w-0 w-full  no-scroll"
//     ref={ref as RefObject<HTMLDivElement>}
//   >
//     <div className="flex-1 min-w-0 basis-0" />
//     {groups.map((group) => {
//       const other = group[0]

//       const _amount = group.length > 1 ? `${group.length}x - ` : ""
//       const _size = other.size && other.sizes.length > 1 ? name(other.size) : ""
//       const _extras = (other.finalExtras ?? []).map((x) => name(x)).join(", ")
//       const _variation =
//         other.variations.length > 1 ? `${name(other.variation)}` : ""

//       return (
//         <Flex
//           align={"center"}
//           className="bg-gray-5 p-2 rounded-2 gap-1 min-w-max whitespace-nowrap select-none"
//           key={other.code}
//         >
//           <MyAvatar src={other.imageUrl} fallback={initials(other)} />
//           <Flex
//             direction={"column"}
//             align={"start"}
//             justify={"start"}
//             flexGrow={"1"}
//             className="group hover:text-orange-11"
//           >
//
//
//             {!!other.finalExtras?.length && (
//               <Text size={"1"} color="orange" className="scale-90 origin-left">
//                 Com {_extras}
//               </Text>
//             )}

//             <Text size={"1"} className="scale-75 origin-left">
//               {currency(getOtherValue(other) * group.length)}
//             </Text>
//           </Flex>
//           <IconButton
//             size={"1"}
//             variant="outline"
//             color="red"
//             className=""
//             onClick={() => {
//               removeOther(other.code)
//             }}
//           >
//             <MdClose />
//           </IconButton>
//         </Flex>
//       )
//     })}
//     <div className="flex-1 min-w-0 basis-0" />
//   </Flex>
// </Card>
