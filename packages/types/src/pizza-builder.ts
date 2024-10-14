import { IDiscount } from "./discount";
import { ItemComponentType } from "./item";
import {
  IPizza,
  IPizzaCrust,
  IPizzaDoughBakingLevel,
  IPizzaDoughThickness,
  IPizzaDoughType,
  IPizzaExtra,
  IPizzaFlavor,
  IPizzaFlavorGroup,
  IPizzaFlavorIngredient,
  IPizzaSize,
} from "./pizza";

export type IPizzaBuilder = {
  sizes: IPizzaSize[];
  doughThicknesses: IPizzaDoughThickness[];
  doughTypes: IPizzaDoughType[];
  doughBakingLevels: IPizzaDoughBakingLevel[];
  extras: IPizzaExtra[];
  crusts: IPizzaCrust[];
  ingredients: IPizzaFlavorIngredient[];
  groups: IPizzaFlavorGroup[];
  discounts: IDiscount[];
};

export interface IBuildingPizza extends Omit<IPizza, "size" | "flavors"> {
  flavors: IBuildingPizzaFlavor[];
  size?: IPizzaSize;
  observations?: string;
  discount?: string;
  comboId?: string;
}

export interface IBuildingPizzaFlavor extends IPizzaFlavor {
  code: string;
  modifications: IBuildingPizzaFlavorIngredient[];
}
export interface IBuildingPizzaFlavorIngredient extends IPizzaFlavorIngredient {
  is: ItemComponentType;
  finalValue: number;
}
