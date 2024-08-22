import { api } from "@/app/infra/util/api";
import { dateTimeReviver } from "@td/functions/src/format";

export async function GET(request: Request) {
  const res = await api(`orders`);

  const data = await res.json();

  return Response.json(data);
}
