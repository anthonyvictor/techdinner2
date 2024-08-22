import { IOrder } from "@td/types";
import { BaseRepository } from "@/src/infra/classes/BaseRepository";
import { db } from "@/src/infra/config/jsondb";
import { OrdersGetDTO } from "@/src/infra/types/dto/orders";

export class OrdersJsonDbRepo extends BaseRepository<IOrder> {
  constructor() {
    super();
  }
  async findAll(query?: OrdersGetDTO): Promise<IOrder[]> {
    const data = (await db.getData("oders")) as IOrder[];
    return data;
  }
  async findOne(id: string): Promise<IOrder | undefined> {
    const data = (await db.getData("oders")) as IOrder[];
    return data.find((x) => x.id === id);
  }
  async updateOne(id: string, obj: IOrder): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async deleteOne(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
