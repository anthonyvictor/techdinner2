import { IItemsPanel } from "@td/types";
import { BaseService } from "@/src/infra/classes/BaseService";
import { DTO } from "@/src/infra/types/dto";

export class ItemsPanelService extends BaseService<IItemsPanel> {
  async findAll(query?: DTO): Promise<IItemsPanel[]> {
    throw new Error("Method not implemented.");
  }
  async findOne(id: string): Promise<IItemsPanel | undefined> {
    const _data = await this?.repo?.findOne?.(id);
    const data = _data;
    return data;
  }
  async createOne(obj: IItemsPanel): Promise<IItemsPanel> {
    throw new Error("Method not implemented.");
  }
  async createMany(objs: IItemsPanel[]): Promise<IItemsPanel[]> {
    throw new Error("Method not implemented.");
  }
  async updateOne(id: string, obj: IItemsPanel): Promise<IItemsPanel> {
    throw new Error("Method not implemented.");
  }
  async deleteOne(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
