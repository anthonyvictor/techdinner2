import { IBuildingDrink, IDrink, IOrderItemDrink } from "@td/types";

export const getDrinkValue = (drink: IBuildingDrink | IOrderItemDrink) =>
  drink.flavor && drink.flavor.originalValue
    ? drink.flavor.originalValue
    : drink.originalValue;

export const getDrinkStock = (drink: IDrink | IBuildingDrink) => {
  if ((drink as IBuildingDrink)?.flavor) {
    return (drink as IBuildingDrink).flavor?.stock ?? 0;
  } else if (drink.flavors) {
    return drink.flavors.reduce((acc, curr) => {
      return acc + curr.stock;
    }, 0);
  } else {
    return drink.stock;
  }
};

export const groupSelectedDrinks = (
  drinks: (IBuildingDrink | IOrderItemDrink)[]
) => {
  const groups: (IBuildingDrink | IOrderItemDrink)[][] = [];

  drinks.forEach((drink) => {
    const isEqual = (
      drink1: IBuildingDrink | IOrderItemDrink,
      drink2: IBuildingDrink | IOrderItemDrink
    ) => {
      return (
        drink1.drinkId === drink2.drinkId &&
        drink1.flavor?.id === drink2.flavor?.id &&
        getDrinkValue(drink1) === getDrinkStock(drink2)
      );
    };

    const i = groups.findIndex((x) => x.some((y) => isEqual(y, drink)));

    if (i > -1) {
      groups[i].push(drink);
    } else {
      groups.push([drink]);
    }
  });
  return groups;
};
