import { Address, NamedData } from "@td/types";
import { startsWith } from "./filters";
import { isDate } from "date-fns";

export function phoneNumber(
  value: string,
  letDDD: boolean = false,
  letDDI: boolean = false
) {
  const LOCAL = {
    ddd: "71",
    ddi: "55",
  };
  let newValue = value;

  // Remove o Country code BRASILEIRO.
  newValue = newValue.replace("+55", "");

  //Se o Country code não for Brasileiro, retorna o número sem formatação.
  if (startsWith(newValue, ["+", "0800"])) return newValue;

  //Remove qualquer caracter especial
  newValue = newValue.replace(/[^0-9]/gi, "");

  //Remove o primeiro caracter caso o mesmo seja "0"
  if (newValue[0] === "0") newValue = newValue.substring(1);

  let _ddd, _num, _ddi;
  _ddi = LOCAL.ddi + " ";
  _ddd = LOCAL.ddd + " ";

  switch (newValue.length) {
    case 11: //00 90000-0000
      _ddd = newValue.slice(0, 2) + " ";
      _num = newValue.slice(2, 7) + "-" + newValue.slice(7);
      break;
    case 10: //00 0000-0000
      _ddd = newValue.slice(0, 2) + " ";
      _num = newValue.slice(2, 6) + "-" + newValue.slice(6);
      _num = startsWith(_num, ["9", "8", "7", "6", "1"]) ? "9" + _num : _num;
      break;
    case 9: //90000-0000
      _num = newValue.slice(0, 5) + "-" + newValue.slice(5);
      break;
    case 8: //0000-0000
      _num = newValue.slice(0, 4) + "-" + newValue.slice(4);
      _num = startsWith(_num, ["9", "8", "7", "6", "1"]) ? "9" + _num : _num;
      break;
    default:
      _ddi = "";
      _ddd = "";
      _num = value;
      break;
  }

  _ddi = letDDI ? _ddi : "";
  _ddd = letDDD || _ddd.trim() !== LOCAL.ddd ? _ddd : "";

  newValue = _ddi + _ddd + _num;
  return newValue;
}

export const address = (value: Address) => {
  const { neighborhood, street, number, place, reference } = value;

  const arr = [place, street, number, reference, neighborhood].filter(Boolean);
  return arr.join(", ");
};

export const currency = (value: number) => {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};
// export const currencyNoPre = (value: number) => {
//   return value.toLocaleString("pt-BR", {
//     minimumSignificantDigits: 2,
//     style: "currency",
//     currency: "BRL",
//   });
// };

export const date = (
  value: Date,
  includesHoursAndMinutes: boolean = false,
  includesSeconds: boolean = false
) => {
  return value.toLocaleString("pt-BR", {
    day: "numeric",
    month: "numeric",
    year: "2-digit",
    hour: includesHoursAndMinutes ? "2-digit" : undefined,
    minute: includesHoursAndMinutes ? "2-digit" : undefined,
    second: includesSeconds ? "2-digit" : undefined,
  });
};

export const name = (obj: NamedData) => {
  return obj.shortName ?? obj.displayName ?? obj.fullName;
};

export const dateTimeReviver = (key: string, value: any) => {
  if (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value)
  ) {
    return new Date(value);
  }
  return value;
};

export const pluralize = (value: string, length: number, plural?: string) => {
  if (!value) return "";

  return length > 1 ? `${value}${plural ?? "s"}` : value;
};

export function objToString(obj: any, keysToIgnore: string[]): string {
  const arr: string[] = [];
  const _keysToIgnore = [
    ...keysToIgnore,
    "id",
    "values",
    "visibility",
    "number",
    "code",
  ];
  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === "string" && value.length < 3) {
      console.log("menor q 3", key);
    }
    if (
      _keysToIgnore.includes(key) ||
      value === undefined ||
      isDate(value) ||
      key.toLocaleLowerCase().includes("url") ||
      key.endsWith("At") ||
      value === ""
    )
      return;

    if (
      typeof value === "string" &&
      value.toLowerCase().replace(/[^0-9a-z]/g, "").length > 0
    ) {
      arr.push(
        value,
        value.toLowerCase().replace(/[^0-9a-z]/g, ""),
        value.toLowerCase().replace(/[^a-z]/g, ""),
        value.replace(/[^0-9]/g, "")
      );
    } else if (typeof value === "object") {
      const sub = objToString(value, keysToIgnore);
      if (sub) {
        arr.push(sub);
      }
    }
  });
  return arr.join(",");
}
