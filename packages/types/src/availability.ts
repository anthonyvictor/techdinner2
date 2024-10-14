import { BaseData, NamedData } from "./base";
import { DayOfWeek } from "./days";
import { DatePeriod, DaysPeriod, HourPeriod } from "./period";

// export interface Visibility extends BaseData {
//   user: "hidden" | "disabled" | "enabled";
//   customer: "hidden" | "disabled" | "enabled";
//   dayBased?: {
//     day: string[] | Date | 'all';
//     avails: Omit<Visibility, "dayBased" | "requirementsGroup">;
//   }[];
//   requirementsGroups?: VisibilityRequirementsGroup[];
// }

export interface Avail extends BaseData {
  to: "user" | "customer" | "*";
  at: (DayOfWeek | Date | DatePeriod | HourPeriod | DaysPeriod)[] | "*" | "now";
  is: "hidden" | "disabled" | "enabled";
  until?: Date;
}

// export interface VisibilityRequirementsGroup extends NamedData {
//   requirements?: Visibility[];
//   requirementType?: "one" | "all";
// }

/**
 *  VISIBILIDADE
 *
 *  to: 'user' | 'customer'
 *  at: string[] | Date[] | '*' | 'now',
 *  is: 'hidden' | 'disabled' | 'enabled'
 *  until?: Date
 *
 *  duasPor60.visibility = [
 *    {
 *      to: 'customer',
 *      at: '*',
 *      is: 'hidden'
 *    },
 *    {
 *      to: 'customer',
 *      at: ['sunday', 'saturday'],
 *      is: 'enabled',
 *      until: new Date('2024-10-01 05:00:00')
 *    },
 *    {
 *      to: 'customer',
 *      at: [new Date('2024-10-01 05:00:00')],
 *      is: 'disabled',
 *    },
 *    {
 *      to: 'customer',
 *      at: 'now',
 *      is: 'disabled',
 *      until: new Date('2024-10-01 05:00:00'),
 *    },
 *    {
 *      to: 'user',
 *      at: '*',
 *      is: 'disabled'
 *    },
 *    {
 *      to: 'user',
 *      at: ['sunday', 'saturday'],
 *      is: 'enabled'
 *    },
 * ]
 *
 *
 */
