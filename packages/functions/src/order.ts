import { IOrder, IOrderItem, IOrderPayment } from "@td/types";
import { currency, name } from "./format";
import { applyDiscount, getDiscountValue } from "./calc";
import {
  FaHouse,
  FaQuestion,
  FaTruck,
  FaCreditCard,
  FaMoneyBills,
  FaPix,
} from "react-icons/fa6";
import { getPizzaValue } from "./pizza";
import { getDrinkValue } from "./drink";
import { getOtherValue } from "./other";

export const getTotal = (order: IOrder) => {
  let initialItems = 0;
  let finalItems = 0;
  let itemsDiscount = 0;

  finalItems = order.items.reduce((total, item) => {
    const itemValue = getItemValue(item);
    initialItems += itemValue;

    itemsDiscount += getDiscountValue(itemValue, item.discount);

    return total + applyDiscount(itemValue, item.discount);
  }, 0);

  let initialFee = 0;
  let finalFee = 0;
  let feeDiscount = 0;

  if (order.type === "delivery") {
    initialFee = order?.address?.initialFee ?? 0;
    feeDiscount = getDiscountValue(initialFee, order?.address?.discount);
    finalFee = applyDiscount(initialFee, order?.address?.discount);
  }

  return {
    initialItems,
    finalItems,
    itemsDiscount,
    initialFee,
    finalFee,
    feeDiscount,
    total: finalItems + finalFee,
  };
};
export const getPaymentStatus = (
  order: IOrder
): {
  status: "fullpaid" | "semipaid" | "pending" | "empty";
  paid: number;
  color?: "green" | "orange" | "red";
  formattedTotalValue: string;
} => {
  const { total } = getTotal(order);

  const paid = order.payments
    .filter(
      (payment) =>
        payment.status === "paid" &&
        !!payment.receivedAt &&
        payment.paidValue > 0
    )
    .reduce((total, payment) => total + payment.paidValue, 0);

  const status =
    paid === total && total > 0
      ? "fullpaid"
      : paid > 0
        ? "semipaid"
        : total > 0
          ? "pending"
          : "empty";

  const color: "green" | "orange" | "red" | undefined =
    status === "fullpaid"
      ? "green"
      : status === "semipaid"
        ? "orange"
        : total > 0
          ? "red"
          : undefined;

  const formattedTotalValue = currency(total);

  return {
    status,
    paid,
    color,
    formattedTotalValue,
  };
};
export const getPrintStatus = (order: IOrder) => {
  const color: "green" | "red" = order.prints ? "green" : "red";

  const formattedValue = order.prints ? `${order.prints + 1}ª vez` : "";

  return {
    color,
    prints: order.prints,
    formattedValue,
  };
};
export const getType = (order: IOrder) => {
  const color: "brown" | "blue" | undefined =
    order.type === "delivery"
      ? "blue"
      : order.type === "withdraw"
        ? "brown"
        : undefined;

  const emoji1 =
    order.type === "delivery" ? "🛵" : order.type === "withdraw" ? "🏪" : "❓";

  const emoji2 =
    order.type === "delivery" ? "🟤" : order.type === "withdraw" ? "🔵" : "⚫";

  const icon =
    order.type === "delivery"
      ? FaTruck
      : order.type === "withdraw"
        ? FaHouse
        : FaQuestion;

  const formattedValue =
    order.type === "delivery"
      ? "Entrega"
      : order.type === "withdraw"
        ? "Retirada"
        : "Desconhecido";

  return {
    color,
    emoji1,
    emoji2,
    icon,
    formattedValue,
  };
};
export const getPayment = (payment: IOrderPayment) => {
  const color: "red" | "grass" = payment.status === "paid" ? "grass" : "red";

  const emoji =
    payment.type === "card" ? "💳" : payment.type === "cash" ? "💵" : "💠";

  const icon =
    payment.type === "card"
      ? FaCreditCard
      : payment.type === "cash"
        ? FaMoneyBills
        : FaPix;

  const formattedValue =
    payment.type === "card"
      ? "no Cartão"
      : payment.type === "cash"
        ? "em Espécie"
        : "Via PIX";

  let changeFor = "",
    changeValue = "";

  if (payment.type === "cash") {
    const thereIsChange = payment.receivedValue > payment.paidValue;
    changeFor = thereIsChange
      ? `Troco p/${payment.receivedValue}`
      : "Sem troco";
    if (thereIsChange)
      changeValue = `${currency(payment.receivedValue - payment.paidValue)} de troco`;
  }

  return {
    color,
    emoji,
    icon,
    formattedValue,
    changeFor,
    changeValue,
  };
};
export const getCustomerName = (order: IOrder, short?: boolean) => {
  return (
    ((!!order.customer
      ? short === true
        ? name(order.customer)
        : order.customer.fullName
      : "") ||
      order.title) ??
    "Sem Cliente ❓"
  );
};

export const getItemValue = (item: IOrderItem) => {
  return item.type === "pizza"
    ? getPizzaValue(item)
    : item.type === "drink"
      ? getDrinkValue(item)
      : item.type === "other"
        ? getOtherValue(item)
        : 1000000;
};
