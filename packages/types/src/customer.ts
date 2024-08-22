import { Address } from "./address";
import { NamedData } from "./base";
import { IPhoneNumber } from "./phoneNumber";
import { ITag } from "./tag";

export interface ICustomer extends NamedData {
  tags: ITag[];
  phoneNumbers: IPhoneNumber[];
  addresses: ICustomerAddress[];
  lastPurchaseAt?: Date;
  totalAmount: number;
  purchases: number;
}

interface ICustomerAddress extends Address {
  isDefault: boolean;
}
