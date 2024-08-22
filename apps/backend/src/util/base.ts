import { randomUUID } from "crypto";
import { getDate } from "./date";

export const generatBase = () => {
  const twoDays = 1000 * 60 * 60 * 24 * 2;
  const oneYear = 1000 * 60 * 60 * 24 * 30 * 12;
  const min = Math.floor(Math.random() * oneYear) + twoDays;
  return { id: randomUUID(), createdAt: getDate(-min) };
};
