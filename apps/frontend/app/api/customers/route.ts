import { api } from "@/app/infra/util/api";

export async function GET(request: Request) {
  const res = await api(`customers`);

  const data = await res.json();

  return Response.json(data);
}
