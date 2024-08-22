import { Avail } from "@td/types";
import { isDate } from "date-fns";
import moment from "moment";

export const getAvailability = (avails: Avail[]) => {
  let requirements = {
    customer: true,
    user: true,
  };

  type Response = {
    customer: "hidden" | "enabled" | "disabled";
    user: "hidden" | "enabled" | "disabled";
  };
  const r: Response = {} as Response;

  const now = avails.filter((x) => x.at === "now");
  const date = avails.filter(
    (x) => x.at.length && Array.isArray(x.at) && isDate(x.at[0])
  );
  const days = avails.filter(
    (x) => x.at.length && Array.isArray(x.at) && typeof x.at[0] === "string"
  );
  const defaults = avails.filter((x) => x.at === "*");

  const getDateEquals = (at: (Date | string)[]) => {
    return at.some((x) => {
      const today = new Date();
      const _x = moment(x);
      today.setHours(0, 0, 0, 0);

      const p = today
        .toLocaleDateString("en-US", { weekday: "long" })
        .toLowerCase();

      let r = false;

      if (_x.isValid()) {
        const _y = _x.toDate();
        _y.setHours(0, 0, 0, 0);
        r = today.toString() === _y.toString();
      } else {
        r = p.includes((x as string).toLowerCase());
      }

      return r;
    });
  };

  const applyAvailStatus = (avails: Avail[], to: "customer" | "user") => {
    const avail = avails.find(
      (x) =>
        x.to === to &&
        (!x.until || x.until > new Date()) &&
        ((x.at.length &&
          Array.isArray(x.at) &&
          (typeof x.at[0] === "string" || moment(x.at[0]).isValid()) &&
          getDateEquals(x.at)) ||
          !Array.isArray(x.at))
    );
    if (avail) {
      r.customer = avail.is;
    }
  };

  if (now.length) {
    applyAvailStatus(now, "customer");
    applyAvailStatus(now, "user");
  }
  if (date.length) {
    if (!r.customer) applyAvailStatus(date, "customer");
    if (!r.user) applyAvailStatus(date, "user");
  }
  if (days.length) {
    if (!r.customer) applyAvailStatus(days, "customer");
    if (!r.user) applyAvailStatus(days, "user");
  }
  if (defaults.length) {
    if (!r.customer) applyAvailStatus(defaults, "customer");
    if (!r.user) applyAvailStatus(defaults, "user");
  }

  return r;
};
