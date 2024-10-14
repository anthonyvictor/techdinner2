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
  async findOne(): Promise<IOrder | undefined> {
    throw new Error("Method not implemented.");
  }
  async createOne({
    createdAt,
    customer,
    title,
    description,
    address: _address,
    items: _items,
    items: _payments,
    platform: _platform,
    type: _type,
  }: OrdersPostDTO): Promise<IOrder> {
    const address = _type !== "withdraw" ? _address : undefined;
    const type = address ? "delivery" : _type;

    const items: IOrderItem[] = [];
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

    if (_items?.length) {
      const itemsService = this.modules?.find(
        (x) => x.name === "items"
      )?.service;
      if (itemsService) {
        const items = (await itemsService?.createMany(
          _items.map((x) => ({ ...x, orderId: data.id }))
        )) as IOrderItem[];

        data.items = items;
      }
    }
    if (_payments?.length) {
      // const paymentsService = this.modules?.find((x) => x.name === "payments")?.service;
      // if(paymentsService){
      // const payments = ( await paymentsService?.createMany(_payments.map(x => ({...x, orderId: data.id}))) ) as IOrderPayment[];
      // }
    }

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
