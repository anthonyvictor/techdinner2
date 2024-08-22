import { IOther } from "./other";
import { IDrink } from "./drink";
import { IPizza } from "./pizza";
import { ICombo } from "./combo";
import { IBuildingPizza } from "./pizza-builder";

export type IItemsPanel = {
  pizzas: IBuildingPizza[];
  drinks: IDrink[];
  others: IOther[];
  combos: ICombo[];
};
