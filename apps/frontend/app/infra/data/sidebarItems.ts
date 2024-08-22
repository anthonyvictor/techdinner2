import { FaChartBar, FaEdit, FaHome, FaStreetView } from "react-icons/fa";
import { ISidebarItem } from "../types/sidebarItem";
import { FaPeopleGroup } from "react-icons/fa6";
import { BiChart } from "react-icons/bi";

export const sidebarItems: ISidebarItem[] = [
  { name: "home", label: "Home", icon: FaHome, route: "/home" },
  {
    name: "records",
    label: "Cadastros",
    icon: FaEdit,
    subitems: [
      {
        name: "customers",
        label: "Clientes",
        icon: FaPeopleGroup,
        route: "/customers/list",
      },
      {
        name: "addresses",
        label: "Endereços",
        icon: FaStreetView,
        route: "/addresses",
      },
    ],
  },
  { name: "reports", label: "Relatórios", icon: FaChartBar, route: "/reports" },
];
