import { BaseData, NamedData } from "./base";
import { Avail } from "./availability";

interface IPizzaComponent extends NamedData {
  values: IPizzaSizeValue[];
  avails: Avail[];
}

interface IPizzaComponentWithPosition extends IPizzaComponent {
  isDefault: boolean;
  position: number;
}

export interface IPizza extends BaseData {
  size: IPizzaSize;
  flavors: IPizzaFlavor[];
  crust: IPizzaCrust;
  dough: IPizzaDough;
  extras: IPizzaExtra[];
  sold?: number;
}
export interface IPizzaSize extends NamedData {
  maxflavors: number;
  approximateCm: number;
  pieces: number;
  avails: Avail[];
}
export interface IPizzaFlavorGroup extends NamedData {
  flavors: IPizzaFlavor[];
}
export interface IPizzaSizeValue extends BaseData {
  size: IPizzaSize;
  value: number;
}
export interface IPizzaExtra extends IPizzaComponent {}
export interface IPizzaCrust extends IPizzaComponentWithPosition {}

export interface IPizzaDough extends BaseData {
  thickness: IPizzaDoughThickness;
  type: IPizzaDoughType;
  bakingLevel: IPizzaDoughBakingLevel;
}

export interface IPizzaDoughBakingLevel extends IPizzaComponentWithPosition {}
export interface IPizzaDoughThickness extends IPizzaComponentWithPosition {}
export interface IPizzaDoughType extends IPizzaComponentWithPosition {}

export interface IPizzaFlavorIngredient extends NamedData {
  values: IPizzaSizeValue[];
}
export interface IPizzaFlavor extends IPizzaComponent {
  group: IPizzaFlavorGroup;
  ingredients: IPizzaFlavorIngredient[];
  sold: number;
}
