import { Avail } from "@td/types/src/availability";
import { getDate } from "../util/date";

export const avails: {
  todos: Avail[];
  desativado: Avail[];
  invisivel: Avail[];
  sabDom: Avail[];
  segASex: Avail[];
} = {
  todos: [
    {
      to: "user",
      is: "enabled",
      at: "*",
      id: "asf1as191fa5s1f",
      createdAt: new Date(),
    },
    {
      to: "customer",
      is: "enabled",
      at: "*",
      id: "965ds1g65d1sf1g95ds1",
      createdAt: new Date(),
    },
  ],
  desativado: [
    {
      to: "user",
      is: "disabled",
      at: "*",
      id: "5sa91f51sa51",
      createdAt: new Date(),
    },
    {
      to: "customer",
      is: "disabled",
      at: "*",
      id: "616sd5a11f5a9",
      createdAt: new Date(),
    },
  ],
  invisivel: [
    {
      to: "user",
      is: "hidden",
      at: "*",
      id: "sa4f4af51as5151",
      createdAt: new Date(),
    },
    {
      to: "customer",
      is: "hidden",
      at: "*",
      id: "6sa41fsa1f98s5a",
      createdAt: new Date(),
    },
  ],
  sabDom: [
    {
      to: "user",
      is: "hidden",
      at: "*",
      id: "das51sa15d1asd155a",
      createdAt: new Date(),
    },
    {
      to: "customer",
      is: "hidden",
      at: "*",
      id: "as6d6sa2d6a262d",
      createdAt: new Date(),
    },
    {
      to: "user",
      is: "enabled",
      at: ["saturday", "sunday", getDate(1000 * 60 * 24 * 2)],
      id: "sa4f4af51as5151",
      createdAt: new Date(),
    },
    {
      to: "customer",
      is: "enabled",
      at: ["saturday", "sunday", getDate(1000 * 60 * 24 * 2)],
      id: "6sa41fsa1f98s5a",
      createdAt: new Date(),
    },
  ],
  segASex: [
    {
      to: "user",
      is: "hidden",
      at: "*",
      id: "das51sa15d1asd155a",
      createdAt: new Date(),
    },
    {
      to: "customer",
      is: "hidden",
      at: "*",
      id: "sa151sa51d51sa51d51sa",
      createdAt: new Date(),
    },
    {
      to: "user",
      is: "enabled",
      at: ["monday", "tuesday", "wednesday", "thursday", "friday"],
      id: "561sad6as2d2a2sd2",
      createdAt: new Date(),
    },
    {
      to: "customer",
      is: "enabled",
      at: ["monday", "tuesday", "wednesday", "thursday", "friday"],
      id: "5sad6a6s2d62as62d",
      createdAt: new Date(),
    },
  ],
};
