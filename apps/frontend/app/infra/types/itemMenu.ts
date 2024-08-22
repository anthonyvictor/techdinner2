import { IconType } from "react-icons";
import { Color } from "./color";
import React, { ReactNode } from "react";

export interface IItemMenu {
  name: string;
  label: string;
  icon: IconType;
  component: React.ElementType;
  color: Color;
}
