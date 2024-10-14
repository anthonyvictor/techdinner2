import {
  IBuildingOther,
  IOrderItemOther,
  IOther,
  IOtherExtra,
  IOtherSize,
  IOtherVariation,
} from "@td/types";

export const getOtherSizeStock = (
  other: IOther,
  size: IOtherSize,
  selected?: (IBuildingOther | IOrderItemOther)[]
) => {
  const variations = other.variations.map((x) => {
    const id = x.id;
    const stock = x.stock.find((y) => y.size.id === size.id)?.value ?? 0;
    const bought =
      (selected ?? []).filter(
        (y) => y.variation.id === id && y.size.id === size.id
      )?.length ?? 0;

    const r = { id, stock, bought: bought > stock ? stock : bought };
    return r;
  });

  return variations.reduce((acc, curr) => acc + (curr.stock - curr.bought), 0);
};

export const getOtherVariationStock = (
  variation: IOtherVariation,
  size?: IOtherSize,
  selected?: (IBuildingOther | IOrderItemOther)[]
) => {
  const stock =
    variation.stock
      .filter((y) => (size ? y.size.id === size.id : true))
      .reduce((acc, curr) => acc + curr.value, 0) ?? 0;

  let i = 0;

  const _bought = (selected ?? []).filter(
    (y) =>
      y.variation.id === variation.id && (size ? y.size.id === size.id : true)
  );

  _bought.forEach((b) => {
    if (size) {
      if (
        i + 1 <=
        (b.variation.stock.find((x) => x.size.id === size.id)?.value ?? 0)
      ) {
        i += 1;
      }
    } else {
      const maxStockInThisSize =
        b.variation.stock.find((x) => x.size.id === b.size.id)?.value ?? 0;

      if (i + 1 <= maxStockInThisSize + i) i += 1;
    }
  });

  const bought = i > stock ? stock : i;

  return stock - bought;
};

export const getOtherStock = (
  other: IOther | IBuildingOther,
  sizes?: (IOtherSize | undefined)[],
  variation?: IOtherVariation,
  selected?: IBuildingOther[]
) => {
  if (other.variations) {
    const total = other.variations
      .filter((x) => (variation ? x.id === variation.id : true))
      .reduce((acc, curr) => {
        return (
          acc +
          curr.stock
            .filter((x) =>
              sizes?.length
                ? sizes
                    .filter((x) => x !== undefined)
                    .map((y) => y.id)
                    .includes(x.size.id)
                : true
            )
            .reduce((_acc, _curr) => _acc + _curr.value, 0)
        );
      }, 0);

    const _selected = selected?.length
      ? selected
          .filter((x) => {
            return (
              x.otherId === ((other as IBuildingOther)?.otherId ?? other.id)
            );
          })
          .filter((x) => (variation ? x.id === variation.id : true))
          .filter((x) =>
            sizes?.length
              ? sizes
                  .filter((x) => x !== undefined)
                  .map((y) => y.id)
                  .includes(x.size.id)
              : true
          ).length
      : 0;

    return total - _selected;
  } else {
    return other.stock;
  }
};

export const getOtherValue = (other: IBuildingOther) => {
  if (!other.variation && !other.size) return 0;

  const value =
    other.variation.values.find((x) => x.size.id === other.size.id)?.value ?? 0;

  const extras = (other.finalExtras ?? []).reduce(
    (acc, curr) =>
      acc + (curr.values.find((x) => x.size.id === other.size.id)?.value ?? 0),
    0
  );

  return value + extras;
};

export const groupSelectedOthers = (
  others: (IBuildingOther | IOrderItemOther)[]
) => {
  const groups: (IBuildingOther | IOrderItemOther)[][] = [];

  others.forEach((other) => {
    const isEqual = (
      other1: IBuildingOther | IOrderItemOther,
      other2: IBuildingOther | IOrderItemOther
    ) => {
      const fExtras = (x: IBuildingOther | IOrderItemOther) =>
        (x.extras ?? [])
          .map((x) => x.id)
          .sort()
          .join(", ");
      const r =
        other1.otherId === other2.otherId &&
        other1.size.id === other2.size.id &&
        other1.variation.id === other2.variation.id &&
        other1.observations === other2.observations &&
        other1.discount === other2.discount &&
        fExtras(other1) === fExtras(other1) &&
        getOtherValue(other1) === getOtherValue(other2);
      return r;
    };

    const i = groups.findIndex((x) => x.some((y) => isEqual(y, other)));

    if (i > -1) {
      groups[i].push(other);
    } else {
      groups.push([other]);
    }
  });
  return groups;
};
