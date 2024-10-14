import { IOtherBuilder } from "@td/types";
import { BaseRepository } from "@/src/infra/classes/BaseRepository";
import { discounts } from "@/src/data/discounts";
import { categories, others } from "@/src/data/others";
import { OtherBuilderGetDTO } from "@/src/infra/types/dto/otherBuilder";
import { getAvailability, objToString } from "@td/functions";

export class OtherBuilderCacheRepo extends BaseRepository<IOtherBuilder> {
  constructor() {
    super();
  }
  async findAll(): Promise<IOtherBuilder[]> {
    throw new Error("Method not implemented.");
  }
  async findOne(dto: OtherBuilderGetDTO): Promise<IOtherBuilder | undefined> {
    //redis
    const _others = Object.values(others);
    const _categories = Object.values(categories).map((x) => ({
      ...x,
      others: _others.filter((y) => y.category.id === x.id),
    }));
    const _discounts = discounts.filter((x) => x.to.includes("other"));

    const data = {
      categories: _categories,
      discounts: _discounts,
    };

    return data;
  }
  async createOne(obj: IOtherBuilder): Promise<IOtherBuilder> {
    throw new Error("Method not implemented.");
  }
  async createMany(objs: IOtherBuilder[]): Promise<IOtherBuilder[]> {
    throw new Error("Method not implemented.");
  }
  async updateOne(id: string, obj: IOtherBuilder): Promise<IOtherBuilder> {
    throw new Error("Method not implemented.");
  }
  async deleteOne(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
