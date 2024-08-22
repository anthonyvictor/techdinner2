import {
  IOrderAddress,
  IOrderCustomer,
  IOrderItem,
  IOrderPlatform,
  IOrderType,
} from "@td/types";
import { DTO } from ".";

export interface OrdersGetDTO extends DTO {
  name?: string;
}

export interface OrdersPostDTO extends DTO {
  createdAt: Date;
  items?: IOrderItem[];
  title?: string;
  description?: string;
  customer?: IOrderCustomer;
  address?: IOrderAddress;
  type?: IOrderType;
  platform?: IOrderPlatform;
}
