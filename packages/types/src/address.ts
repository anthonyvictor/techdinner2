import { BaseData } from "./base";

export interface Address extends BaseData {
  cep: string;
  street: string;
  initialFee: number;
  place?: string;
  reference?: string;
  neighborhood: string;
  number?: string;
  imageUrl?: string;
}
