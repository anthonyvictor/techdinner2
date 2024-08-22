import {
  Button,
  Text,
  Flex,
  Container,
  Card,
  IconButton,
  Separator,
  TextField,
} from "@radix-ui/themes";
import { ReactNode, useState } from "react";
import { IconBase } from "react-icons";
import { BsArrowDown, BsArrowLeft } from "react-icons/bs";
import { CgArrowDown } from "react-icons/cg";
import { FaArrowDown, FaArrowLeft, FaCog, FaCogs } from "react-icons/fa";
import { FaBell, FaMagnifyingGlass } from "react-icons/fa6";
import {
  MdArrowBack,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
export default function Accordion({
  title,
  color,
  children,
  hidden = false,
  defaultIsOpen = true,
}: {
  children: ReactNode;
  title: string;
  hidden?: boolean;
  defaultIsOpen?: boolean;
  color?:
    | "gray"
    | "gold"
    | "bronze"
    | "brown"
    | "yellow"
    | "amber"
    | "orange"
    | "tomato"
    | "red"
    | "ruby"
    | "crimson"
    | "pink"
    | "plum"
    | "purple"
    | "violet"
    | "iris"
    | "indigo"
    | "blue"
    | "cyan"
    | "teal"
    | "jade"
    | "green"
    | "grass"
    | "lime"
    | "mint"
    | "sky";
}) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  return hidden ? (
    <></>
  ) : (
    <>
      <Button
        color={color}
        size={"1"}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Text className="flex items-center w-full">
          <Flex flexGrow={"1"}>{title}</Flex>
          <IconBase>
            {isOpen ? (
              <MdOutlineKeyboardArrowDown />
            ) : (
              <MdOutlineKeyboardArrowLeft />
            )}
          </IconBase>
        </Text>
      </Button>
      {isOpen && (
        <div className="flex flex-col gap-1 w-full grow-2 overflow-auto no-scroll min-h-14">
          {children}
        </div>
      )}
    </>
  );
}
