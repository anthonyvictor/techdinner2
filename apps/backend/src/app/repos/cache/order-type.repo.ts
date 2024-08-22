import { IOrderType } from "@td/types";
import { BaseRepository } from "@/src/infra/classes/BaseRepository";
import { orders } from "@/src/data/orders";
import { OrderTypeGetDTO } from "@/src/infra/types/dto/order-type";

export class OrderTypeCacheRepo extends BaseRepository<IOrderType> {
  constructor() {
    super();
  }
  async findAll(query?: OrderTypeGetDTO): Promise<IOrderType[]> {
    throw new Error("Method not implemented.");
  }
  async findOne(id: string): Promise<IOrderType | undefined> {
    throw new Error("Method not implemented.");
  }
  async createOne(obj: IOrderType): Promise<IOrderType> {
    throw new Error("Method not implemented.");
  }
  async createMany(objs: IOrderType[]): Promise<IOrderType[]> {
    throw new Error("Method not implemented.");
  }
  async updateOne(id: string, obj: IOrderType): Promise<IOrderType> {
    const order = orders.find((x) => x.id === id);

    const orderIndex = orders.findIndex((x) => x.id === id);

    if (!order || !orderIndex) throw new Error("Pedido não encontrado");

    orders[orderIndex].type = obj;

    return obj;
  }
  async deleteOne(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
