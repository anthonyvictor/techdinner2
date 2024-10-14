import { DayOfWeek } from "./days";

export interface DaysPeriod {
  days: DayOfWeek[];
  hours: HourPeriod[];
}
export interface DatePeriod {
  from: Date;
  until: Date;
}

export interface HourPeriod {
  from: { h: number; m: number };
  until: { h: number; m: number };
}
