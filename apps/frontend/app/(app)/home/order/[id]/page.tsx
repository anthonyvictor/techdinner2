"use client"
import { Card } from "@radix-ui/themes"
import { Header } from "./Header"
import { CustomerBox } from "./CustomerBox"
import { TypeBox } from "./TypeBox"
import { ItemsBox } from "./items"
import { PaymentBox } from "./PaymentBox"
import { Bottom } from "./Bottom"
import { MyCard } from "@/app/components/MyCard"
import { MyContainer } from "@/app/components/MyContainer"

export default function Order() {
  return (
    <>
      <MyContainer className="inset-0 lg:w-80 flex flex-col gap-1 max-sm:w-full max-h-full min-h-0 shrink-0">
        <Header />
        <CustomerBox />
        <TypeBox />
        <ItemsBox />
        <PaymentBox />
        <Bottom />
      </MyContainer>
    </>
  )
}
