import { IOther } from "./other";
import { IDrink } from "./drink";
import { IPizza } from "./pizza";
import { NamedData } from "./base";

export type IITem = IPizza | IDrink | IOther;

export type ItemComponentType = "with" | "without" | "less" | "quite";

export interface ItemModification extends NamedData {
  is: ItemComponentType;
}
