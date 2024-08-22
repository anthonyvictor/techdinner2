import { NamedData } from "./base";
import { Brand } from "./brand";
import { Avail } from "./availability";

export interface DrinkCategory extends NamedData {
  pre?: string;
}

export interface IDrink extends NamedData {
  category: DrinkCategory;
  sizeInMl: number;
  brand?: Brand;
  displayName?: string;
  originalValue: number;
  createdAt: Date;
  avails: Avail[];
  flavors?: Drinkflavor[];
  forPrepare: boolean;
  sold: number;
  stock: number;
}

export interface Drinkflavor extends NamedData {
  avails: Avail[];
  stock: number;
}
