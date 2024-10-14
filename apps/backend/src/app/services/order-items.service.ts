import { IOrderItem } from "@td/types";
import { BaseService } from "@/src/infra/classes/BaseService";
import { DTO } from "@/src/infra/types/dto";
import { v4 as uuidv4 } from "uuid";

export class OrderItemsService extends BaseService<IOrderItem> {
  async findAll(query?: DTO): Promise<IOrderItem[]> {
    const _data = await this.repo.findAll(query);
    const data = _data;
    return data;
  }
  async findOne(): Promise<IOrderItem | undefined> {
    throw new Error("Method not implemented.");
  }
  async createOne(obj: IOrderItem): Promise<IOrderItem> {
    const id = uuidv4();
    const createdAt = new Date();

    const data = { ...obj, id, createdAt };

    this.repo.createOne(data);

    return data;
  }
  async createMany(objs: IOrderItem[]): Promise<IOrderItem[]> {
    const data = objs.map((x) => ({
      ...x,
      id: uuidv4(),
      createdAt: new Date(),
    }));

    this.repo.createMany(data);

    return data;
  }
  async updateOne(id: string, obj: IOrderItem): Promise<IOrderItem> {
    const _data = await this.repo.updateOne(id, obj);
    const data = _data;
    return data;
  }
  async deleteOne(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
