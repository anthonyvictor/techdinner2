import { Address } from "./address";
import { BaseData, NamedData } from "./base";
import { ICustomer } from "./customer";
import { IDrink, Drinkflavor } from "./drink";
import { Driver } from "./driver";
import { IOther } from "./other";
import { IPizza } from "./pizza";
import { IBuildingPizza } from "./pizza-builder";
import { User } from "./user";

export type IOrderType = "withdraw" | "delivery";

export type IOrderPlatform =
  | "whatsapp"
  | "api"
  | "webapp"
  | "desk"
  | "telegram"
  | "instagram"
  | "call";

export type IOrderStatus = "going" | "finished" | "cancelled";

interface OrderBase extends BaseData {
  number?: number;
  title?: string;
  description?: string;
  customer?: IOrderCustomer;
  type: IOrderType;
  platform: IOrderPlatform;
  items: IOrderItem[];
  payments: IOrderPayment[];
  prints: number;
  archivedUntil?: Date;
  status: IOrderStatus;
}

interface OrderManual {
  method: "manual";
  createdBy: User;
}

interface OrderAuto {
  method: "auto";
  acceptedAt?: Date;
  acceptedBy?: User;
}

interface OrderWithdraw {
  type: "withdraw";
}
interface OrderDelivery {
  type: "delivery";
  address: IOrderAddress;
}

export type IOrder = OrderBase &
  (OrderWithdraw | OrderDelivery) &
  (OrderManual | OrderAuto);

export interface IOrderAddress extends Address {
  discount?: string;
  driver: Driver;
  dispatcher?: User;
  receiver?: User;
  leaveAt?: Date;
  returnAt?: Date;
}

interface OrderPaymentBase extends BaseData {
  type: "card" | "pix" | "cash";
  paidValue: number;
  receivedValue: number;
}
interface OrderPaymentCreated {
  status: "created";
}
interface OrderPaymentPaid {
  status: "paid";
  receivedAt: Date;
}

export type IOrderPayment = OrderPaymentBase &
  (OrderPaymentCreated | OrderPaymentPaid);

interface OrderItemBase extends BaseData {
  orderId: string;
  initialValue: number;
  discount?: string;
  comboId?: string;
  observations?: string;
  steps?: OrderItemStep[];
  pausedUntil?: Date;
}

interface OrderItemStep extends BaseData {
  type: "queue" | "preparing" | "cooking" | "done";
}

export interface IOrderItemPizza extends IBuildingPizza {
  type: "pizza";
}
export interface IOrderItemDrink extends Omit<IDrink, "flavors"> {
  type: "drink";
  flavor?: Drinkflavor;
}

export interface IOrderItemOther extends IOther {
  type: "other";
}

export type IOrderItem = OrderItemBase &
  (IOrderItemPizza | IOrderItemDrink | IOrderItemOther);

export interface IOrderCustomer extends ICustomer {}
