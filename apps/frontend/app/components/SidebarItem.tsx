import { HTMLProps, ReactNode, useState } from "react";
import { ISidebarItem } from "@/app/infra/types/sidebarItem";
import Link from "next/link";
import {
  Button,
  DropdownMenu,
  Flex,
  Separator,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { IconBase } from "react-icons";

export const SidebarItem = ({ item }: { item: ISidebarItem }) => {
  const [subOpened, setSubOpened] = useState("");

  const router = useRouter();

  const Wrapper = ({ children }: { children: ReactNode }) => {
    return item.route ? (
      <>{children}</>
    ) : (
      <DropdownMenu.Trigger>{children}</DropdownMenu.Trigger>
    );
  };

  return (
    <DropdownMenu.Root>
      <Wrapper>
        <Button
          variant="ghost"
          size={"1"}
          className="text-3xl"
          onClick={() => {
            if (item.route) router.push(item.route);
          }}
        >
          <Text size={{ initial: "8", lg: "6" }}>{<item.icon />}</Text>
        </Button>
      </Wrapper>

      {!!item.subitems?.length && (
        <DropdownMenu.Content>
          <Flex direction={"column"} gap="3" p={"2"}>
            {item.subitems.map((subitem) => (
              <DropdownMenu.Item
                key={subitem.name}
                asChild
                onClick={() => {
                  router.push(subitem.route);
                }}
              >
                <Button variant="soft">
                  <Flex align={"center"} gap="3">
                    <IconBase className="text-2xl">
                      <subitem.icon />
                    </IconBase>
                    <Text>{subitem.label}</Text>
                  </Flex>
                </Button>
              </DropdownMenu.Item>
            ))}
          </Flex>
        </DropdownMenu.Content>
      )}
    </DropdownMenu.Root>
  );

  // return (
  //   <Wrapper
  //     className="relative
  //   md:bg-orange-7600 p-3 md:p-1 rounded-sm md:rounded-md md:border-orange-600 md:border-2 "
  //   >
  //     {<item.icon className="text-3xl md:text-xl" />}
  //     {item.subitems && subOpened === item.name && (
  //       <>
  //         <div
  //           className="fixed inset-0 bg-black/45 z-50 cursor-default"
  //           onMouseDown={(e) => setSubOpened("")}
  //         />
  //         <ul className="fixed md:absolute left-2 right-2 my-12 md:my-auto md:right-auto bottom-0 md:bottom-auto md:top-0 md:left-full md:mx-3 p-4 rounded-md flex flex-col gap-4 bg-orange-700 z-50 animate-fade-up">
  //           {item.subitems.map((sub) => (
  //             <div key={sub.name}>
  //               <Link
  //                 href={sub.route ?? ""}
  //                 className="flex gap-2 items-center hover:text-black"
  //               >
  //                 {<sub.icon className="text-xl" />}
  //                 <Text className="text-lg">{sub.label}</Text>
  //               </Link>
  //               <Separator size={"4"} />
  //             </div>
  //           ))}
  //         </ul>
  //       </>
  //     )}
  //   </Wrapper>
  // );
};
