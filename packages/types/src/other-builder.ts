import { NamedData } from "./base";
import { IDiscount } from "./discount";
import { ItemComponentType } from "./item";
import {
  IOther,
  IOtherCategory,
  IOtherVariation,
  IOtherSize,
  IOtherExtra,
  IOtherComponent,
} from "./other";

export type IOtherBuilder = {
  categories: IOtherCategory[];
  discounts: IDiscount[];
};

export interface IBuildingOther extends IOther {
  otherId: string;
  size: IOtherSize;
  variation: IOtherVariation;
  observations?: string;
  finalExtras?: IOtherExtra[];
  modifications?: IOtherModification[];
  discount?: string;
  comboId?: string;
  code: string;
}

export interface IOtherModification extends IOtherComponent {
  componentId: string;
  is: ItemComponentType;
  value: number;
}

// export interface IBuildingOther extends NamedData {
//   otherId: string;
//   sizeId: string;
//   variationId: string;
//   extrasId: string[];
//   modifications?: IOtherModification[]
//   observations?: string;
//   discount?: string;
//   comboId?: string;
//   code: string;
// }
