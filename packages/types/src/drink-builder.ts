import { IDiscount } from "./discount";
import { IDrink, IDrinkCategory, IDrinkFlavor } from "./drink";

export type IDrinkBuilder = {
  categories: IDrinkCategory[];
  discounts: IDiscount[];
};

export interface IBuildingDrink extends IDrink {
  flavor?: IDrinkFlavor;
  drinkId: string;
  observations?: string;
  discount?: string;
  comboId?: string;
  code: string;
}
