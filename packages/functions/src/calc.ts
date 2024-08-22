export const getDiscountValue = (value: number, discount?: string) => {
  if (!discount) return 0;
  const d = Number(discount.replace(/[^0-9]/g, ""));
  return discount.includes("%") ? value * (d / 100) : d;
};

export const applyDiscount = (value: number, discount?: string) => {
  if (!discount) return value;
  const d = getDiscountValue(value, discount);

  return value - d;
};

export const toPositive = (value: number) => {
  if (value < 0) return value * -1;
  return value;
};
