export const specialKeys = [
  "Backspace",
  "Space",
  "Shift",
  "Tab",
  "Control",
  "Alt",
  "AltGraph",
]
export const letters = [
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcddefghijklmnopqrstuvwxyz".split(""),
  ...specialKeys,
]

export const numbers = [..."1234567890".split(""), ...specialKeys]
export const currencyNumbers = [...",.".split(""), ...numbers, ...specialKeys]

export const accents = [...",.-()".split(""), ...specialKeys]

export const ascii = [...letters, ...numbers]
