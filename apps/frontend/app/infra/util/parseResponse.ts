import { parseDate } from "@td/functions"

export async function parseRes<T>(res: Response, errorMsg: string) {
  if (!res.ok) throw new Error(errorMsg)
  const _data = JSON.stringify(await res.json())
  const data = parseDate<T>(_data)

  return data
}
