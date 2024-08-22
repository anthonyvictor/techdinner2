import { NamedData } from "./base";

export interface User extends NamedData {
  email: string;
  phoneNumber: string;
  role: "dev" | "admin" | "manager" | "standard";
}
