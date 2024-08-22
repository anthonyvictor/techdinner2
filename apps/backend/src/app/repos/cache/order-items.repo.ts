import { IBuildingPizza, IBuildingPizzaFlavor, IOrderItem } from "@td/types";
import { BaseRepository } from "@/src/infra/classes/BaseRepository";
import { orders } from "@/src/data/orders";
import { OrderItemsGetDTO } from "@/src/infra/types/dto/order-items";

export class OrderItemsCacheRepo extends BaseRepository<IOrderItem> {
  constructor() {
    super();
  }
  async findAll(query?: OrderItemsGetDTO): Promise<IOrderItem[]> {
    if (!query?.orderId) return [];

    const data = orders.find((x) => x.id === query.orderId)?.items ?? [];

    return data;
  }
  async findOne(id: string): Promise<IOrderItem | undefined> {
    const data = orders
      .map((x) => x.items)
      .flat()
      .find((x) => x.id === id);
    return data;
  }
  async createOne(obj: IOrderItem): Promise<IOrderItem> {
    const order = orders.find((x) => x.id === obj.orderId);

    if (order) {
      order.items.push(obj);
      return obj;
    } else {
      throw new Error("Pedido não encontrado");
    }
  }
  async createMany(objs: IOrderItem[]): Promise<IOrderItem[]> {
    const order = orders.find((x) => x.id === objs[0].orderId);

    if (order) {
      order.items.push(...objs);
      return objs;
    } else {
      throw new Error("Pedido não encontrado");
    }
  }
  async updateOne(id: string, obj: IOrderItem): Promise<IOrderItem> {
    const foundItem = orders
      .map((x) => x.items)
      .flat()
      .find((x) => x.id === id);

    if (foundItem) {
      const orderIndex = orders.findIndex((x) =>
        x.items.some((y) => y.id === foundItem.id && y.type === foundItem.type)
      );

      if (!orderIndex) throw new Error("Pedido não encontrado");

      const itemIndex = orders[orderIndex].items.findIndex(
        (x) => x.id === foundItem.id && x.type === foundItem.type
      );
      if (!itemIndex) throw new Error("Item não encontrado");

      orders[orderIndex].items[itemIndex] = obj;

      return obj;
    } else {
      throw new Error("Pedido não encontrado");
    }
  }
  async deleteOne(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
