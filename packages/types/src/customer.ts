import { Address } from "./address";
import { NamedData } from "./base";
import { IPhoneNumber } from "./phoneNumber";

export interface ICustomer extends NamedData {
  phoneNumbers: IPhoneNumber[];
  addresses: ICustomerAddress[];
  lastPurchaseAt?: Date;
  spentValue: number;
  purchases: number;
}

interface ICustomerAddress extends Address {
  isDefault: boolean;
}
