export const getStockColor = (stock: number) =>
  stock < 1 ? "red" : stock < 4 ? "orange" : "gray";

export const getStockInfo: (
  stock: number,

  pos?: string
) => {
  color:
    | "brown"
    | "gray"
    | "blue"
    | "purple"
    | "red"
    | "orange"
    | "yellow"
    | "green";
  label: string;
} = (stock: number, pos?: string) => {
  return {
    color: getStockColor(stock),
    label: stock > 0 ? `${stock} und${pos ? ` ${pos}` : ""}` : "Em falta",
  };
};
