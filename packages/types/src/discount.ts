import { NamedData } from "./base";

import { Avail } from "./availability";
import {
  IPizzaCrust,
  IPizzaDoughThickness,
  IPizzaDoughType,
  IPizzaFlavor,
  IPizzaSize,
  IPizzaSizeValue,
} from "./pizza";

// interface IDiscountBase extends NamedData {
//   description?: string;
//   minValue?: number;
//   value: string;
//   to: (
//     | "fee"
//     | "order"
//     | "pizzaSizeFlavors"
//     | "pizzaCrust"
//     | "pizzaDoughType"
//     | "pizzaDoughThickness"
//     | "drink"
//     | "other"
//   )[];
//   isAutomatic: boolean;
//   availability: Avail[];
// }
// interface IPizzaDiscountBase
//   extends Omit<IDiscountBase, "minValue" > {
//   minValue: IPizzaSizeValue[];
// }
// export interface IPizzaSizeFlavorsDiscount extends IPizzaDiscountBase {
//   sizes: IPizzaSize[];
//   flavors?: IPizzaFlavor[];
// }
// export interface IPizzaCrustDiscount extends IPizzaDiscountBase {
//   crusts?: IPizzaCrust[];
// }
// export interface IPizzaDoughTypeDiscount extends IPizzaDiscountBase {
//   doughTypes?: IPizzaDoughType[];
// }
// export interface IPizzaDoughThicknessDiscount extends IPizzaDiscountBase {
//   doughThicknesses?: IPizzaDoughThickness[];
// }

// export type IDiscount =
//   | IPizzaSizeFlavorsDiscount
//   | IPizzaDoughTypeDiscount
//   | IPizzaDoughThicknessDiscount
//   | IPizzaCrustDiscount;

type IDiscountTo = "pizza" | "drink" | "other" | "fee" | "order";

export interface IDiscount extends NamedData {
  value: string;
  minValue?: number;
  maxValue?: number;
  to: IDiscountTo[];
  avails: Avail[];
  automatic: boolean;
  applied: number;
}
