import { IBuildingOther } from "@td/types";
import { randomUUID } from "crypto";
import { others } from "./others";

export const buildingOthers: IBuildingOther[] = Object.values(others).map(
  (other) => {
    return {
      ...other,
      code: randomUUID(),
      id: randomUUID(),
      otherId: other.id,
      size: other.sizes.sort((a, b) => (a.sold > b.sold ? 1 : -1))[0],
      variation: other.variations.sort((a, b) => (a.sold > b.sold ? 1 : -1))[0],
    };
  }
);
// [
//     {...drinks.antar1, code: randomUUID(), id: randomUUID(), drinkId: drinks.antar1.id},
//     {...drinks.pepsi1, code: randomUUID(), id: randomUUID(), drinkId: drinks.pepsi1.id},
// ]
