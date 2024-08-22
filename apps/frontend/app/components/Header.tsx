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
import { FaCog, FaCogs } from "react-icons/fa";
import { FaBell, FaMagnifyingGlass } from "react-icons/fa6";
export default function Header() {
  return (
    <Flex direction={"column"}>
      <Flex p="2" align={"center"} gap="2">
        <Text className="flex-1 hidden md:flex">TechDinner 2.0</Text>

        <TextField.Root placeholder="Pesquisar" className="max-sm:flex-1">
          <TextField.Slot>
            <FaMagnifyingGlass height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>

        <Flex className="gap-8 md:gap-2 text-2xl md:text-lg" align={"center"}>
          <IconButton variant="ghost" className="text-gray-12">
            <FaCog />
          </IconButton>
          <IconButton variant="ghost" className="text-gray-12">
            <FaBell />
          </IconButton>
        </Flex>
      </Flex>
      <Separator size={"4"} />
    </Flex>
  );
}
