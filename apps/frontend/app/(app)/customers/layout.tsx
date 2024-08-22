"use client";

import { CustomersProvider } from "@/app/context/Customers";
import { Flex, TabNav, Tabs } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const tabs = [
    { href: "/customers/list", children: "Lista" },
    { href: "/customers/register", children: "Cadastro" },
  ];
  return (
    <CustomersProvider>
      <Flex direction={"column"} className="w-full" gap="2">
        <TabNav.Root size={"2"}>
          {tabs.map((tab) => (
            <TabNav.Link active={pathname === tab.href} key={tab.href} asChild>
              <Link {...tab} />
            </TabNav.Link>
          ))}
        </TabNav.Root>
        {children}
      </Flex>
    </CustomersProvider>
  );
}
