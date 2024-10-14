import { IDrinkBuilder } from "@td/types";
import { BaseRepository } from "@/src/infra/classes/BaseRepository";
import { discounts } from "@/src/data/discounts";
import { categories, drinks } from "@/src/data/drinks";
import { DrinkBuilderGetDTO } from "@/src/infra/types/dto/drinkBuilder";

export class DrinkBuilderCacheRepo extends BaseRepository<IDrinkBuilder> {
  constructor() {
    super();
  }
  async findAll(): Promise<IDrinkBuilder[]> {
    throw new Error("Method not implemented.");
  }
  async findOne(dto: DrinkBuilderGetDTO): Promise<IDrinkBuilder | undefined> {
    //redis
    const _drinks = Object.values(drinks);
    const _categories = Object.values(categories).map((x) => ({
      ...x,
      drinks: _drinks.filter((y) => y.category.id === x.id),
    }));
    const _discounts = discounts.filter((x) => x.to.includes("drink"));

    const data = {
      categories: _categories,
      discounts: _discounts,
    };

    return data;
  }
  async createOne(obj: IDrinkBuilder): Promise<IDrinkBuilder> {
    throw new Error("Method not implemented.");
  }
  async createMany(objs: IDrinkBuilder[]): Promise<IDrinkBuilder[]> {
    throw new Error("Method not implemented.");
  }
  async updateOne(id: string, obj: IDrinkBuilder): Promise<IDrinkBuilder> {
    throw new Error("Method not implemented.");
  }
  async deleteOne(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
