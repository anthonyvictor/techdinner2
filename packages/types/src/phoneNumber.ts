import { BaseData } from "./base";

export interface IPhoneNumber extends BaseData {
  value: string;
  isDefault: boolean;
  isWhatsapp: boolean;
  isTelegram: boolean;
}
