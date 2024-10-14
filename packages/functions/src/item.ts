import { ItemModification } from "@td/types";

export const getComponentTypeLabel = (x: ItemModification) =>
  x.is === "with"
    ? "c/"
    : x.is === "without"
      ? "s/"
      : x.is === "less"
        ? "pouc./"
        : "bast./";
