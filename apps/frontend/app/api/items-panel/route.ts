import { api } from "@/app/infra/util/api";

export async function GET(request: Request) {
  const res = await api(`items-panel`);

  const data = await res.json();

  return Response.json(data);
}
