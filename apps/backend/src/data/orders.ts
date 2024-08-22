import { IOrder } from "@td/types";
import { getDate } from "../util/date";
import { customers } from "./customers";
import { drivers } from "./drivers";
import { items } from "./items";
import { users } from "./users";

export const orders: IOrder[] = [
  {
    id: "sadas62d2sa62d",
    number: 3,
    status: "going",
    customer: customers.carlos,
    address: {
      cep: "40170720",
      id: "5sad5sa16",
      createdAt: new Date(),
      initialFee: 10,
      discount: "5",
      driver: drivers.begga,
      neighborhood: "Ondina",
      number: "52",
      place: "Hospital Jorge Valente",
      reference: "Ao lado da farmacia",
      street: "Avenida Anitta Garibaldi",
    },
    createdAt: getDate(-25),
    method: "manual",
    createdBy: users.thony,
    platform: "desk",
    items: [
      { ...items.g1, orderId: "sadas62d2sa62d", id: "6as2f2as2f6a2" },
      { ...items.g2, orderId: "sadas62d2sa62d", id: "692saf62s2f" },
      { ...items.r1, orderId: "sadas62d2sa62d", id: "63a2sd2as2d62" },
    ],
    payments: [
      {
        id: "1d5as5ss",
        paidValue: 29,
        type: "cash",
        receivedValue: 50,
        createdAt: getDate(-10),
        status: "created",
      },
      {
        id: "sa1d5a1s",
        paidValue: 10,
        type: "pix",
        receivedValue: 10,
        createdAt: getDate(-10),
        status: "paid",
        receivedAt: getDate(-5),
      },
    ],
    type: "delivery",
    prints: 1,
  },
  {
    number: 2,
    id: "2sd51sa51d65sa1",
    customer: customers.joana,
    method: "auto",
    acceptedBy: users.luz,
    acceptedAt: new Date(),
    platform: "call",
    items: [{ ...items.f1, orderId: "2sd51sa51d65sa1", id: "asdsa5d9sa5d" }],
    status: "going",
    payments: [],
    type: "withdraw",
    createdAt: getDate(-40),
    prints: 0,
  },

  {
    number: 4,
    id: "6d2sa2d2sa2d662",
    customer: customers.alberto,
    method: "auto",
    acceptedBy: users.luz,
    acceptedAt: new Date(),
    platform: "call",
    items: [
      { ...items.p1, orderId: "6d2sa2d2sa2d662", id: "s62a6f62asd" },
      { ...items.p2, orderId: "6d2sa2d2sa2d662", id: "5s1d1sa51dsd" },
      { ...items.r2, orderId: "6d2sa2d2sa2d662", id: "6s32f6sa22f6sa2" },
    ],
    status: "going",
    payments: [],
    type: "withdraw",
    createdAt: getDate(-5),
    prints: 0,
  },
  {
    number: 1,
    id: "asdasaskldmasda",
    title: "Marcelo",
    method: "manual",
    createdBy: users.luz,
    archivedUntil: getDate(60 * 3.22),
    platform: "desk",
    items: [
      { ...items.p1, orderId: "asdasaskldmasda", id: "6f2sa2f6as262f" },
      { ...items.s1, orderId: "asdasaskldmasda", id: "sa62d62as6d26sa2" },
    ],
    status: "going",
    payments: [],
    type: "withdraw",
    createdAt: getDate(-(60 * 1.5)),
    prints: 0,
  },
];
