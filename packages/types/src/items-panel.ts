import { IBuildingPizza } from "./pizza-builder";
import { IBuildingDrink } from "./drink-builder";
import { IBuildingOther } from "./other-builder";
import { IBuildingPromo } from "./promo-builder";

export type IItemsPanel = {
  pizzas: IBuildingPizza[];
  drinks: IBuildingDrink[];
  others: IBuildingOther[];
  promos: IBuildingPromo[];
};
