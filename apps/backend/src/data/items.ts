import { IOrderItem } from "@td/types";
import { getDate } from "src/util/date";
import {
  crusts,
  doughBakingLevels,
  doughs,
  doughThicknesses,
  doughTypes,
  extras,
  flavors,
  sizes,
} from "./pizza";
import { drinks } from "./drinks";
import { pizzas } from "./pizzas";

export const items: {
  g1: IOrderItem;
  g2: IOrderItem;
  f1: IOrderItem;
  p1: IOrderItem;
  p2: IOrderItem;
  r1: IOrderItem;
  r2: IOrderItem;
  s1: IOrderItem;
} = {
  p1: {
    ...pizzas.p1,
    type: "pizza",
    initialValue: 15,
    createdAt: new Date(),
    crust: crusts.semBorda,
    dough: doughs.normal,
    id: "2sa26d2sa26d2sa",
    extras: [],
    flavors: [
      {
        ...flavors.calabresa,
        code: "as6d26as2d62sa62as6596",
        modifications: [],
      },
    ],
    steps: [
      { createdAt: new Date(), id: "51dsa1dsa", type: "queue" },
      { createdAt: new Date(), id: "sdasdasaa", type: "preparing" },
      { createdAt: new Date(), id: "1sad515as", type: "cooking" },
      { createdAt: new Date(), id: "6512as2ds", type: "done" },
    ],
    orderId: "",
  },
  p2: {
    ...pizzas.p2,
    type: "pizza",
    initialValue: 15,
    createdAt: new Date(),
    crust: crusts.semBorda,
    dough: doughs.normal,
    id: "2sa26d2sa26d2sa",
    extras: [],
    flavors: [
      { ...flavors.frango, code: "6as2d6as22das5d29a2a9s2", modifications: [] },
    ],
    steps: [
      { createdAt: new Date(), id: "51dsa1dsa", type: "queue" },
      { createdAt: new Date(), id: "sdasdasaa", type: "preparing" },
      { createdAt: new Date(), id: "1sad515as", type: "cooking" },
      { createdAt: new Date(), id: "6512as2ds", type: "done" },
    ],
    orderId: "",
  },
  g1: {
    ...pizzas.g1,
    type: "pizza",
    initialValue: 33,
    createdAt: new Date(),

    id: "2sa26d2sa26d2sa",
    crust: crusts.cheddar,
    flavors: [
      { ...flavors.presunto, code: "2sda6d2sa2f6as1f65a", modifications: [] },
      {
        ...flavors.calabresa,
        code: "as6d26as2d62sa62as6596",
        modifications: [],
      },
      { ...flavors.frango, code: "6as2d6as22das5d29a2a9s2", modifications: [] },
    ],
    dough: {
      type: doughTypes.batata,
      bakingLevel: doughBakingLevels.aoPonto,
      id: "52s16da",
      createdAt: new Date(),
      thickness: doughThicknesses.grossa,
    },
    extras: [extras.cebola],
    discount: "2",
    steps: [{ createdAt: new Date(), id: "51dsa1dsa", type: "queue" }],
    pausedUntil: getDate(40),
    orderId: "",
  },
  g2: {
    ...pizzas.g2,
    type: "pizza",
    initialValue: 33,
    createdAt: new Date(),
    crust: crusts.semBorda,
    dough: doughs.normal,
    id: "2sa26d2sa26d2sa",
    extras: [],
    observations: "Bastante cebola",
    flavors: [
      { ...flavors.calabresa, code: "2sda6d2sa2f6as1f65a", modifications: [] },
      { ...flavors.caipira, code: "as6d26as2d62sa62as6596", modifications: [] },
    ],
    steps: [
      { createdAt: new Date(), id: "51dsa1dsa", type: "queue" },
      { createdAt: new Date(), id: "sdasdasaa", type: "preparing" },
      { createdAt: new Date(), id: "1sad515as", type: "cooking" },
      { createdAt: new Date(), id: "6512as2ds", type: "done" },
    ],
    orderId: "",
  },
  f1: {
    ...pizzas.f1,
    type: "pizza",
    initialValue: 39,
    observations: "Sem orégano",
    createdAt: new Date(),
    crust: crusts.semBorda,
    dough: doughs.normal,
    id: "2sa26d2sa26d2sa",
    extras: [],
    flavors: [
      { ...flavors.romeu, code: "2sda6d2sa2f6as1f65a", modifications: [] },
      {
        ...flavors.calabresa,
        code: "as6d26as2d62sa62as6596",
        modifications: [],
      },
    ],
    steps: [
      { createdAt: new Date(), id: "51dsa1dsa", type: "queue" },
      { createdAt: new Date(), id: "sdasdasaa", type: "preparing" },
    ],
    orderId: "",
  },
  r1: {
    ...drinks.pepsi1,
    id: "a62ds6a2sd",
    type: "drink",
    forPrepare: false,
    createdAt: getDate(-23),
    initialValue: 6,
    orderId: "",
  },
  r2: {
    ...drinks.pepsi1,
    id: "a62ds6a2sd",
    type: "drink",
    createdAt: getDate(-23),
    initialValue: 6,
    orderId: "",
  },
  s1: {
    ...drinks.suco15,
    id: "a62ds6a2sd",
    type: "drink",
    forPrepare: false,
    createdAt: getDate(-23),
    initialValue: 8,
    observations: "Mandar 2 copos",
    orderId: "",
  },
};
