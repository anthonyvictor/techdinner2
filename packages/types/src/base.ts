import { Identifier } from "./identifier";

export interface BaseData extends Identifier {
  createdAt: Date;
}
export interface NamedData extends BaseData {
  imageUrl?: string;
  fullName: string;
  displayName?: string;
  description?: string;
  subDescription?: string;
  shortName?: string;
  initials?: string;
  tags?: DataTag[];
}

export interface DataTag extends BaseData {
  value: string;
}
