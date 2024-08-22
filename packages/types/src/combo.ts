import { BaseData, NamedData } from "./base";
import { Brand } from "./brand";
import { IDrink } from "./drink";
import { IOther } from "./other";
import {
  IPizza,
  IPizzaCrust,
  IPizzaDough,
  IPizzaExtra,
  IPizzaFlavor,
  IPizzaSize,
  IPizzaSizeValue,
} from "./pizza";
import { Avail } from "./availability";

interface IOfferItemsGroup extends BaseData {
  title?: string;
  description?: string;
  position: number;
  canRepeat?: boolean;
  min: number;
  max: number;
  items: (IComboPizza | IComboDrink | IComboOther)[];
}

export interface IComboPizza extends BaseData {
  sizes: IPizzaSize[];
  flavors: IComboPizzaFlavor[];
  crusts?: IPizzaCrust[];
  doughs?: IPizzaDough[];
  extras?: IPizzaExtra[];
}

export interface IComboPizzaFlavor extends IPizzaFlavor {
  valuesInCombo: IPizzaSizeValue[];
}
export interface IComboDrink extends IDrink {
  valueInCombo?: number;
}
export interface IComboOther extends IOther {
  valueInCombo?: number;
}

export interface ICombo extends NamedData {
  category: "combo";
  composition: IOfferItemsGroup[];
  fixedValue?: number;
  description?: string;
  stock?: number;
  sold: number;
  avails: Avail[];
  rules: string[];
}
