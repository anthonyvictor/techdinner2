import { dateTimeReviver } from "@td/functions"

export async function parseRes<T>(res: Response, errorMsg: string) {
  if (!res.ok) throw new Error(errorMsg)
  const _data = JSON.stringify(await res.json())
  const data = JSON.parse(_data, dateTimeReviver) as unknown as T

  return data
}
