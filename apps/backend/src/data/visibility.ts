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
      to: "*",
      is: "enabled",
      at: "*",
      id: "asf1as191fa5s1f",
      createdAt: new Date(),
    },
  ],
  desativado: [
    {
      to: "*",
      is: "disabled",
      at: "*",
      id: "5sa91f51sa51",
      createdAt: new Date(),
    },
  ],
  invisivel: [
    {
      to: "*",
      is: "hidden",
      at: "*",
      id: "sa4f4af51as5151",
      createdAt: new Date(),
    },
  ],
  sabDom: [
    {
      to: "*",
      is: "hidden",
      at: "*",
      id: "das51sa15d1asd155a",
      createdAt: new Date(),
    },
    {
      to: "*",
      is: "enabled",
      at: ["saturday", "sunday", getDate(1000 * 60 * 24 * 2)],
      id: "sa4f4af51as5151",
      createdAt: new Date(),
    },
  ],
  segASex: [
    {
      to: "*",
      is: "hidden",
      at: "*",
      id: "das51sa15d1asd155a",
      createdAt: new Date(),
    },
    {
      to: "*",
      is: "enabled",
      at: ["monday", "tuesday", "wednesday", "thursday", "friday"],
      id: "561sad6as2d2a2sd2",
      createdAt: new Date(),
    },
  ],
};
