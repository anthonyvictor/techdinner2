import { IOrder } from "@td/types";
import { BaseRepository } from "@/src/infra/classes/BaseRepository";
import { DTO } from "@/src/infra/types/dto";
import { orders } from "@/src/data/orders";

export class OrdersCacheRepo extends BaseRepository<IOrder> {
  constructor() {
    super();
  }
  async findAll(query?: DTO): Promise<IOrder[]> {
    const data = orders;
    return data;
  }
  async findOne(id: string): Promise<IOrder | undefined> {
    const data = orders;
    return data.find((x) => x.id === id);
  }
  async createOne(obj: IOrder): Promise<IOrder> {
    orders.push(obj);

    return obj;
  }
  async createMany(objs: IOrder[]): Promise<IOrder[]> {
    throw new Error("Method not implemented.");
  }
  async updateOne(id: string, obj: IOrder): Promise<IOrder> {
    throw new Error("Method not implemented.");
  }
  async deleteOne(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
