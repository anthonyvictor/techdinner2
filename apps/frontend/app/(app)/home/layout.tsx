"use client"
import { HomeProvider } from "@/app/context/Home"
import { Card } from "@radix-ui/themes"
import { OrderList } from "./List"
import { ItemsPanel } from "./itemsPanel/ItemsPanel"
import { ItemBuilderProvider } from "@/app/context/itemBuilder"
import { OrdersProvider, useOrders } from "@/app/context/Orders"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <OrdersProvider>
      <HomeProvider>
        <ItemBuilderProvider>
          <div className="flex h-full max-h-full min-h-0 flex-1 gap-1">
            <OrderList />
            <MainContent>{children}</MainContent>
          </div>
        </ItemBuilderProvider>
      </HomeProvider>
    </OrdersProvider>
  )
}

const MainContent = ({ children }: { children: React.ReactNode }) => {
  const { currentOrder } = useOrders()

  // max-h-full min-h-0 ${currentOrder?.id ? "" : "max-sm:hidden"} `}
  return (
    <div
      className={`flex flex-1 h-full
        max-h-full min-h-0 ${currentOrder ? "" : "max-sm:hidden"} `}
    >
      <Card
        className="w-full"
        style={{ maxHeight: "100%", minHeight: "0", padding: "0" }}
      >
        <div className="h-full w-full flex">
          <div className={`flex-1 hidden md:flex`}>
            <ItemsPanel orderId={currentOrder ?? ""} />
          </div>
          {/* {!!currentOrder?.id && children} */}
          {!!currentOrder && children}
        </div>
      </Card>
    </div>
  )
}
