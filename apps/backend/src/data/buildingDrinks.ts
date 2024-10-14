import { IBuildingDrink } from "@td/types";
import { drinks } from "./drinks";
import { randomUUID } from "crypto";

export const buildingDrinks: IBuildingDrink[] = Object.values(drinks).map(
  (drink) => {
    return {
      ...drink,
      code: randomUUID(),
      id: randomUUID(),
      drinkId: drink.id,
      flavor: drink.flavors?.length
        ? drink.flavors.sort((a, b) => (a.sold > b.sold ? 1 : -1))[0]
        : undefined,
    };
  }
);
// [
//     {...drinks.antar1, code: randomUUID(), id: randomUUID(), drinkId: drinks.antar1.id},
//     {...drinks.pepsi1, code: randomUUID(), id: randomUUID(), drinkId: drinks.pepsi1.id},
// ]
