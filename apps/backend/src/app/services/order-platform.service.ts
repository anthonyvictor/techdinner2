import { IOrderPlatform } from "@td/types";
import { BaseService } from "@/src/infra/classes/BaseService";
import { DTO } from "@/src/infra/types/dto";
import { v4 as uuidv4 } from "uuid";

export class OrderPlatformService extends BaseService<IOrderPlatform> {
  async findAll(query?: DTO): Promise<IOrderPlatform[]> {
    throw new Error("Method not implemented.");
  }
  async findOne(id: string): Promise<IOrderPlatform | undefined> {
    throw new Error("Method not implemented.");
  }
  async createOne(obj: IOrderPlatform): Promise<IOrderPlatform> {
    throw new Error("Method not implemented.");
  }
  async createMany(objs: IOrderPlatform[]): Promise<IOrderPlatform[]> {
    throw new Error("Method not implemented.");
  }
  async updateOne(id: string, obj: IOrderPlatform): Promise<IOrderPlatform> {
    const _data = await this.repo.updateOne(id, obj);
    const data = _data;
    return data;
  }
  async deleteOne(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
