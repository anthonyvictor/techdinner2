export const api = (
  route: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
  body?: BodyInit,
) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/${route}`

  const p = fetch(url, {
    method,
    body,
    headers: {
      "Content-Type": "application/json",
      "API-Key": process.env.NEXT_PUBLIC_API_KEY as string,
    },
    cache: "no-cache",
  })

  return p
}
