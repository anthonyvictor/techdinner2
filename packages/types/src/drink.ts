import { NamedData } from "./base";
import { Brand } from "./brand";
import { Avail } from "./availability";

export interface IDrinkCategory extends NamedData {
  drinks: IDrink[];
  avails: Avail[];
}

export interface IDrink extends NamedData {
  category: IDrinkCategory;
  sizeInMl: number;
  flavors?: IDrinkFlavor[];
  brand?: Brand;
  originalValue: number;
  forPrepare: boolean;
  sold: number;
  stock: number;
  avails: Avail[];
}

export interface IDrinkFlavor extends NamedData {
  stock: number;
  sold: number;
  originalValue?: number;
  sizeInMl?: number;
  avails: Avail[];
}
