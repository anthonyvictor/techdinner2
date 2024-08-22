import { IOrder, IOrderItem, IOrderPayment, IOrderStatus } from "@td/types";
import { BaseService } from "@/src/infra/classes/BaseService";
import { DTO } from "@/src/infra/types/dto";
import { OrdersPostDTO } from "@/src/infra/types/dto/orders";
import { randomUUID } from "crypto";

export class OrdersService extends BaseService<IOrder> {
  async findAll(query?: DTO): Promise<IOrder[]> {
    const _data = await this.repo.findAll(query);

    // const today = _data.filter(x => isInCurrentWorkingHour(x.createdAt))

    // const notToday = _data.filter(x => !today.map(y => y.id).includes(x.id) )

    const data = _data;
    return data;
  }
  async findOne(id: string): Promise<IOrder | undefined> {
    throw new Error("Method not implemented.");
  }
  async createOne({
    createdAt,
    customer,
    title,
    description,
    address: _address,
    items: _items,
    platform: _platform,
    type: _type,
  }: OrdersPostDTO): Promise<IOrder> {
    const itemsService = this.modules?.find((x) => x.name === "items")?.service;

    const address = _type !== "withdraw" ? _address : undefined;
    const type = address ? "delivery" : _type;

    const items = (
      _items ? await itemsService?.createMany(_items) : []
    ) as IOrderItem[];
    // const payments = (_payments ? await paymentsService?.createMany(_payments) : []) as IOrderPayment[];

    const payments: IOrderPayment[] = [];
    const prints = 0;
    const status: IOrderStatus = "going";

    const todayOrdersLength = (await this.repo.findAll()).length;

    const _data = await this.repo.createOne({
      id: randomUUID(),
      createdAt,
      type,
      address,
      customer,
      title,
      description,
      items,
      payments,
      prints,
      status,
      number: todayOrdersLength + 1,
    } as IOrder);

    const orders = await this.repo.findAll();

    const data = { ..._data, number: orders.length };

    return data;
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
