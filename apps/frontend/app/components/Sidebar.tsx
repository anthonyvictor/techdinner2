"use client";
import { Flex, Separator } from "@radix-ui/themes";
import Image from "next/image";
import { FaCircleUser } from "react-icons/fa6";
import { sidebarItems } from "../infra/data/sidebarItems";
import { SidebarItem } from "./SidebarItem";

export default function Sidebar() {
  return (
    <Flex
      height={{ md: "100svh" }}
      width={{ initial: "100vw", md: "100%" }}
      className="relative"
    >
      <Flex
        direction={{ md: "column" }}
        height={"100%"}
        width={{ initial: "100vw", md: "100%" }}
        align={"center"}
        gap="3"
        py={{ initial: "0", md: "3" }}
        px={{ initial: "1", md: "1" }}
        flexGrow={"1"}
      >
        <div className="flex-col gap-2 hidden lg:flex">
          <Image
            src="/logo-compressed-orange.png"
            className="hidden lg:block"
            alt=""
            width={25}
            height={25}
          />
        </div>
        <div className="w-full hidden lg:block">
          <Separator size="4" className="" />
        </div>

        <Flex
          flexGrow={"1"}
          flexShrink={"1"}
          direction={{ lg: "column" }}
          gap={{ initial: "6", lg: "5" }}
          py={{ initial: "3", lg: "2" }}
          px={{ initial: "2", lg: "0" }}
          align={"center"}
          className="text-2xl items-center"
        >
          {sidebarItems.map((item) => (
            <SidebarItem key={item.name} item={item} />
          ))}
        </Flex>

        <div className="hidden lg:flex">
          <Separator size="4" />
        </div>

        <FaCircleUser />
      </Flex>
      <div className="hidden lg:flex">
        <Separator size={"4"} orientation={"vertical"} />
      </div>
    </Flex>
  );
}
