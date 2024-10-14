import { IOrderPlatform } from "@td/types";
import { BaseRepository } from "@/src/infra/classes/BaseRepository";
import { orders } from "@/src/data/orders";
import { OrderPlatformGetDTO } from "@/src/infra/types/dto/order-platform";

export class OrderPlatformCacheRepo extends BaseRepository<IOrderPlatform> {
  constructor() {
    super();
  }
  async findAll(query?: OrderPlatformGetDTO): Promise<IOrderPlatform[]> {
    throw new Error("Method not implemented.");
  }
  async findOne(): Promise<IOrderPlatform | undefined> {
    throw new Error("Method not implemented.");
  }
  async createOne(obj: IOrderPlatform): Promise<IOrderPlatform> {
    throw new Error("Method not implemented.");
  }
  async createMany(objs: IOrderPlatform[]): Promise<IOrderPlatform[]> {
    throw new Error("Method not implemented.");
  }
  async updateOne(id: string, obj: IOrderPlatform): Promise<IOrderPlatform> {
    const order = orders.find((x) => x.id === id);

    const orderIndex = orders.findIndex((x) => x.id === id);

    if (!order || orderIndex === -1) throw new Error("Pedido não encontrado");

    orders[orderIndex].platform = obj;

    return obj;
  }
  async deleteOne(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
