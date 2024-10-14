import { IPromoBuilder } from "@td/types";
import { BaseRepository } from "@/src/infra/classes/BaseRepository";
import { promos } from "@/src/data/promos";

export class PromoBuilderCacheRepo extends BaseRepository<IPromoBuilder> {
  constructor() {
    super();
  }
  async findAll(): Promise<IPromoBuilder[]> {
    throw new Error("Method not implemented.");
  }
  async findOne(): Promise<IPromoBuilder | undefined> {
    const _promos = Object.values(promos);
    const data = {
      promos: _promos,
    };

    return data;
  }
  async createOne(obj: IPromoBuilder): Promise<IPromoBuilder> {
    throw new Error("Method not implemented.");
  }
  async createMany(objs: IPromoBuilder[]): Promise<IPromoBuilder[]> {
    throw new Error("Method not implemented.");
  }
  async updateOne(id: string, obj: IPromoBuilder): Promise<IPromoBuilder> {
    throw new Error("Method not implemented.");
  }
  async deleteOne(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
