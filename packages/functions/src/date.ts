import { dateTimeReviver } from ".";

export const getDuration = (_date?: Date) => {
  if (!_date) return undefined;
  const now = new Date();
  const date = new Date(_date);

  const total = now.getTime() - date.getTime();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  const emojis = ["🟤", "🔵", "🟣", "🔴", "🟠", "🟡", "🟢"];

  let emoji = "⚫";
  let value = "";
  let color:
    | undefined
    | "brown"
    | "blue"
    | "purple"
    | "red"
    | "orange"
    | "yellow"
    | "green";

  if (days > 2 || (days === 2 && hours > 0)) {
    emoji = emojis[0];
    color = "brown";
    value = `${date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "numeric",
      year: "numeric",
    })}`;
  } else if (days >= 1) {
    emoji = emojis[1];
    color = "blue";
    value = `${days}d${hours > 0 ? `${hours}h` : ""}`;
  } else if (hours > 0) {
    emoji = emojis[2];
    color = "purple";
    value = `${hours}h${minutes > 0 ? `${minutes}m` : ""}`;
  } else if (minutes > 45) {
    emoji = emojis[3];
    color = "red";
    value = `${minutes}m`;
  } else if (minutes > 30) {
    emoji = emojis[4];
    color = "orange";
    value = `${minutes}m`;
  } else if (minutes > 20) {
    emoji = emojis[5];
    color = "yellow";
    value = `${minutes}m`;
  } else if (minutes >= 0) {
    emoji = emojis[6];
    color = "green";
    value = `${minutes}m`;
  }

  return {
    minutes,
    formattedValue: value,
    emoji,
    color,
  };
};

export const getCurrentWorkingHour = () => {
  const start = new Date();
  if (start.getHours() < 5) {
    start.setDate(start.getDate() - 1);
  }

  start.setHours(5, 0, 0, 0);

  const end = new Date();
  if (end.getHours() >= 5) {
    end.setDate(end.getDate() + 1);
  }

  return {
    start,
    end,
  };
};

export const isInCurrentWorkingHour = (_date: Date) => {
  const { start, end } = getCurrentWorkingHour();

  return _date >= start && _date <= end;
};

export function parseDate<T>(obj: any) {
  const _data = JSON.stringify(obj);
  const data = JSON.parse(_data, dateTimeReviver) as unknown as T;
  return data;
}
