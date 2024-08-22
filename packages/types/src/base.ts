import { Identifier } from "./identifier";

export interface BaseData extends Identifier {
  createdAt: Date;
}
export interface NamedData extends BaseData {
  imageUrl?: string;
  fullName: string;
  displayName?: string;
  shortName?: string;
  initials?: string;
}
