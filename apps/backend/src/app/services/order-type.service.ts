import { IOrderType } from "@td/types";
import { BaseService } from "@/src/infra/classes/BaseService";
import { DTO } from "@/src/infra/types/dto";
import { v4 as uuidv4 } from "uuid";

export class OrderTypeService extends BaseService<IOrderType> {
  async findAll(query?: DTO): Promise<IOrderType[]> {
    throw new Error("Method not implemented.");
  }
  async findOne(): Promise<IOrderType | undefined> {
    throw new Error("Method not implemented.");
  }
  async createOne(obj: IOrderType): Promise<IOrderType> {
    throw new Error("Method not implemented.");
  }
  async createMany(objs: IOrderType[]): Promise<IOrderType[]> {
    throw new Error("Method not implemented.");
  }
  async updateOne(id: string, obj: IOrderType): Promise<IOrderType> {
    const _data = await this.repo.updateOne(id, obj);
    const data = _data;
    return data;
  }
  async deleteOne(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
