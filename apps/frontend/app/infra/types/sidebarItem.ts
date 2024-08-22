import { IconType } from "react-icons";

export interface ISidebarItem {
  name: string;
  label: string;
  icon: IconType;
  route?: string;
  subitems?: Required<Omit<ISidebarItem, "subitems">>[];
}
