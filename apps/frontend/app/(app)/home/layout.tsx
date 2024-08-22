"use client";
import { HomeProvider, useHome } from "@/app/context/Home";
import { Card, Flex } from "@radix-ui/themes";

import { OrderList } from "./List";
import { ItemsPanel } from "./itemsPanel/ItemsPanel";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <HomeProvider>
      <div className="flex h-full max-h-full min-h-0 flex-1 gap-1">
        <OrderList />
        <MainContent>{children}</MainContent>
      </div>
    </HomeProvider>
  );
}

const MainContent = ({ children }: { children: React.ReactNode }) => {
  const { currentOrder } = useHome();

  return (
    <div
      className={`flex flex-1 h-full
        max-h-full min-h-0 ${currentOrder?.id ? "" : "max-sm:hidden"} `}
    >
      <Card
        className="w-full"
        style={{ maxHeight: "100%", minHeight: "0", padding: "0" }}
      >
        <div className="h-full w-full flex">
          <div className={`flex-1 hidden md:flex`}>
            <ItemsPanel />
          </div>
          {!!currentOrder?.id && children}
        </div>
      </Card>
    </div>
  );
};
