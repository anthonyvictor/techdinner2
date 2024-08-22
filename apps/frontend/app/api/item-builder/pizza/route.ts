import { api } from "@/app/infra/util/api";

export async function GET(request: Request) {
  const res = await api(`item-builder/pizza`);

  const data = await res.json();

  return Response.json(data);
}
