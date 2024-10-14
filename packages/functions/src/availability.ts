import { Avail, DaysPeriod, HourPeriod } from "@td/types";
import { isDate } from "date-fns";
import moment from "moment";
import { DatePeriod } from "@td/types";
import { getCurrentWorkingHour, isInCurrentWorkingHour } from ".";
import { DayOfWeekNum } from "@td/types/src/days";

export const getAvailability = (avails: Avail[], to: "customer" | "user") => {
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
    const avail = avails.find((x) => {
      const sameTo = x.to === to;
      const beforeUntil = !x.until || x.until > new Date();

      const isHourPeriod = (x: any) => !isNaN(x?.from?.h);
      const isDatePeriod = (x: any) => moment(x?.from).isValid();
      const isDaysPeriod = (x: any) => !!x?.days?.length;
      const isDate = (x: any) => moment(x.at[0]).isValid();

      const isNow = (x: any) => x === "now";
      const isDefault = (x: any) => x === "*";

      const isInPeriod = (
        xx: (HourPeriod | DatePeriod | DaysPeriod | Date)[]
      ) => {
        const avails = xx.map((x) => {
          const now = new Date();

          if (isDate(x)) {
            const _x = x as Date;
            return isInCurrentWorkingHour(_x);
          } else if (isHourPeriod(x)) {
            const _x = x as HourPeriod;
            return (
              now.getHours() >= _x.from.h &&
              now.getHours() <= _x.until.h &&
              now.getMinutes() >= _x.from.m &&
              now.getMinutes() <= _x.until.m
            );
          } else if (isDatePeriod(x)) {
            const _x = x as DatePeriod;
            const { start: todaysStart, end: todaysEnd } =
              getCurrentWorkingHour();
            return todaysStart >= _x.from && todaysEnd <= _x.until;
          } else if (isDaysPeriod(x)) {
            const _x = x as DaysPeriod;
            return _x.days.some((d) => {
              const day = DayOfWeekNum[now.getDay()];
              return d === day;
            });
          } else {
            return false;
          }
        });
        return avails.some(Boolean);
      };

      // ((x.at.length &&
      //   Array.isArray(x.at) &&
      //   (typeof x.at[0] === "string" || isDatePeriod(x.at[0]) || isDaysPeriod(x.at[0]) || isHourPeriod(x.at[0]) ||moment(x.at[0]).isValid()) &&
      //   getDateEquals(x.at)) ||
      //   !Array.isArray(x.at))

      return (
        sameTo &&
        beforeUntil &&
        (isDefault(x.at) ||
          isNow(x.at) ||
          isInPeriod(x.at as (HourPeriod | DatePeriod | DaysPeriod | Date)[]))
      );
    });
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

export const isAvailable = (avails: Avail[], to: "customer" | "user" | "*") => {
  const is = avails.some((x) => {
    const sameTo = x.to === to || x.to === "*";
    const beforeUntil = !x.until || x.until > new Date();

    const isHourPeriod = (x: any) => !isNaN(x?.from?.h);
    const isDatePeriod = (x: any) => moment(x?.from).isValid();
    const isDaysPeriod = (x: any) => !!x?.days?.length;
    const isDate = (x: any) => moment(x.at[0]).isValid();

    const isNow = (x: any) => x === "now";
    const isDefault = (x: any) => x === "*";

    const isInPeriod = (
      xx: (HourPeriod | DatePeriod | DaysPeriod | Date)[]
    ) => {
      const avails = xx.map((x) => {
        const now = new Date();

        if (isDate(x)) {
          const _x = x as Date;
          return isInCurrentWorkingHour(_x);
        } else if (isHourPeriod(x)) {
          const _x = x as HourPeriod;
          return (
            now.getHours() >= _x.from.h &&
            now.getHours() <= _x.until.h &&
            now.getMinutes() >= _x.from.m &&
            now.getMinutes() <= _x.until.m
          );
        } else if (isDatePeriod(x)) {
          const _x = x as DatePeriod;
          const { start: todaysStart, end: todaysEnd } =
            getCurrentWorkingHour();
          return todaysStart >= _x.from && todaysEnd <= _x.until;
        } else if (isDaysPeriod(x)) {
          const _x = x as DaysPeriod;
          return _x.days.some((d) => {
            const day = DayOfWeekNum[now.getDay()];
            return d === day;
          });
        } else {
          return false;
        }
      });
      return avails.some(Boolean);
    };
    return (
      sameTo &&
      beforeUntil &&
      (isDefault(x.at) ||
        isNow(x.at) ||
        isInPeriod(x.at as (HourPeriod | DatePeriod | DaysPeriod | Date)[]))
    );
  });
  return is;
};
