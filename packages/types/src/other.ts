import { BaseData, NamedData } from "./base";
import { Brand } from "./brand";
import { Avail } from "./availability";

export interface IOtherCategory extends NamedData {
  others: IOther[];
  avails: Avail[];
}

export interface IOtherSizeValue extends BaseData {
  size: IOtherSize;
  value: number;
}
export interface IOtherComponent extends NamedData {
  values: IOtherSizeValue[];
  avails: Avail[];
}

export interface IOtherSize extends NamedData {
  position: number;
  readonly stock: number;
  sold: number;
  originalValue?: number;
  avails: Avail[];
}
export interface IOtherVariation extends IOtherComponent {
  sold: number;
  components?: IOtherComponent[];
  stock: IOtherSizeValue[];
}
export interface IOtherExtra extends IOtherComponent {
  stock: number;
  sold: number;
}

export interface IOther extends NamedData {
  category: IOtherCategory;
  sizes: IOtherSize[];
  variations: IOtherVariation[];
  extras: IOtherExtra[];
  brand?: Brand;
  forPrepare: boolean;
  sold: number;
  stock: number;
  avails: Avail[];
  components?: IOtherComponent[];
}

// export interface IOtherOptionsGroup extends NamedData {
//   position: number;
//   options: IOtherOption[];
//   min: number;
//   max: number;
//   repeatOption: boolean;
//   valuationMethod: "sum" | "max" | "min" | "mid" | "replace";
//   avails: Avail[];
// }

// interface IOtherOption extends NamedData {
//   optionsGroups?: IOtherOptionsGroup[];
//   default: boolean;
//   avails: Avail[];
//   originalValue: number;
//   stock?: number;
//   sold: number;
// }
