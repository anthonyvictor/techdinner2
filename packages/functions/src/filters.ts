export function startsWith(str: string, valuesToFind: Array<string>): boolean {
  return valuesToFind.some((value) => str.startsWith(value));
}
