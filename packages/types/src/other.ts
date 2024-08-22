import { NamedData } from "./base";
import { Brand } from "./brand";
import { Avail } from "./availability";

export interface OtherCategory extends NamedData {
  avails: Avail[];
}

export interface IOther extends NamedData {
  category: OtherCategory;
  description?: string;
  brand?: Brand;
  optionsGroups: OtherOptionsGroup[];
  originalValue: number;
  createdAt: Date;
  forPrepare: boolean;
  stock: number;
  sold: number;
  avails: Avail[];
}

export interface OtherOptionsGroup extends NamedData {
  options: OtherModifier[];
  min: number;
  max: number;
  repeatOption?: boolean;
  valuationMethod: "sum" | "max" | "min" | "mid";
  avails: Avail[];
}
export interface OtherModifier extends NamedData {
  value?: number;
  stock?: number;
  avails: Avail[];
}
