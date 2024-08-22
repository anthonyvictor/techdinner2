import {
  IBuildingPizza,
  IBuildingPizzaFlavor,
  IBuildingPizzaFlavorIngredient,
  IPizzaCrust,
  IPizzaDoughThickness,
  IPizzaDoughType,
  IPizzaExtra,
  IPizzaFlavor,
  IPizzaFlavorIngredient,
  IPizzaSize,
  IPizzaSizeValue,
} from "@td/types";
import { name } from "./format";

export const getValueBySize = (
  size?: IPizzaSize,
  values?: IPizzaSizeValue[]
) =>
  values?.length && size?.id
    ? values.find((x) => x.size.id === size?.id)?.value ?? 0
    : 0;
export const getDoughValueBySize = (
  size?: IPizzaSize,
  thickness?: IPizzaDoughThickness,
  type?: IPizzaDoughType
) => {
  const thicknessValue = getValueBySize(size, thickness?.values);
  const typeValue = getValueBySize(size, type?.values);
  return thicknessValue + typeValue;
};
export const getCrustValueBySize = (size?: IPizzaSize, crust?: IPizzaCrust) => {
  const crustValue = getValueBySize(size, crust?.values);
  return crustValue;
};
export const getFlavorsValueBySize = (
  flavors: IBuildingPizzaFlavor[],
  size?: IPizzaSize
) => {
  return flavors.length
    ? flavors.reduce(
        (acc, flavor) =>
          acc +
          getValueBySize(size, flavor.values) +
          flavor.modifications.reduce(
            (acc, modif) => acc + getValueBySize(size, modif.values),
            0
          ),
        0
      ) / flavors.length
    : 0;
};
export const getExtrasValueBySize = (
  extras?: IPizzaExtra[],
  size?: IPizzaSize
) => {
  return extras?.length
    ? extras.reduce((acc, extra) => acc + getValueBySize(size, extra.values), 0)
    : 0;
};

export const getPizzaValue = (pizza: IBuildingPizza) => {
  const flavorsValue = getFlavorsValueBySize(pizza.flavors, pizza.size);

  const crustValue = getCrustValueBySize(pizza.size, pizza.crust);
  const doughValue = getDoughValueBySize(
    pizza.size,
    pizza.dough?.thickness,
    pizza.dough?.type
  );

  const extrasValue = getExtrasValueBySize(pizza.extras, pizza.size);

  const finalValue = flavorsValue + crustValue + doughValue + extrasValue;

  return Number(finalValue.toFixed(1));
};

export const getIngredientModifType = (x: IBuildingPizzaFlavorIngredient) =>
  x.is === "with"
    ? "c/"
    : x.is === "without"
      ? "s/"
      : x.is === "less"
        ? "pouc./"
        : "bast./";

export const getPizzaFlavorDescription = (flavor: IBuildingPizzaFlavor) => {
  const flavorName = name(flavor);

  const flavorIngredients = flavor.modifications
    ?.map((x) => `${getIngredientModifType(x)} ${name(x)}`)
    .filter(Boolean);

  return { name: flavorName, ingredients: flavorIngredients };
};

export const getPizzaIngredientModificationIs = (
  ingredients: IPizzaFlavorIngredient[],
  modifications: IBuildingPizzaFlavorIngredient[] | undefined,
  ingredient: IPizzaFlavorIngredient
) => {
  const isDefault = ingredients.some((x) => x.id === ingredient.id);
  const isModification = (modifications ?? []).some(
    (x) => x.id === ingredient.id
  );
  const isWithout = (modifications ?? []).some(
    (x) => x.id === ingredient.id && x.is === "without"
  );
  const isWith = (modifications ?? []).some(
    (x) => x.id === ingredient.id && x.is === "with"
  );
  const isLess = (modifications ?? []).some(
    (x) => x.id === ingredient.id && x.is === "less"
  );
  const isQuite = (modifications ?? []).some(
    (x) => x.id === ingredient.id && x.is === "quite"
  );

  return { isDefault, isModification, isWithout, isWith, isLess, isQuite };
};
