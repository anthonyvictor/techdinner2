import { IDrinkBuilder } from "@td/types";
import { BaseService } from "@/src/infra/classes/BaseService";
import { DTO } from "@/src/infra/types/dto";
import { getAverage, isAvailable } from "@td/functions";

export class DrinkBuilderService extends BaseService<IDrinkBuilder> {
  async findAll(query?: DTO): Promise<IDrinkBuilder[]> {
    throw new Error("Method not implemented.");
  }
  async findOne(dto: DTO): Promise<IDrinkBuilder | undefined> {
    const _data = await this?.repo?.findOne?.(dto);

    if (!_data) return undefined;

    const categories = _data.categories
      .filter((x) => isAvailable(x.avails, dto.from))
      .map((x) => ({
        ...x,
        drinks: x.drinks.sort((a, b) => (a.sold > b.sold ? -1 : 1)),
      }))
      .filter((x) => x.drinks.length > 0)
      .sort((a, b) =>
        getAverage(a.drinks.map((x) => x.sold)) >
        getAverage(b.drinks.map((x) => x.sold))
          ? -1
          : 1
      );

    const discounts = _data.discounts
      .filter((x) => isAvailable(x.avails, dto.from))
      .sort((a, b) => (a.applied > b.applied ? -1 : 1));

    const data = {
      categories,
      discounts,
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
