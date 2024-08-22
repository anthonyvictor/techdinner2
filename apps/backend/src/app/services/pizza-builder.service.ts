import {
  IPizzaBuilder,
  IPizzaDoughBakingLevel,
  IPizzaSizeValue,
} from "@td/types";
import { BaseService } from "@/src/infra/classes/BaseService";
import { DTO } from "@/src/infra/types/dto";
import { getAverage, name } from "@td/functions";

export class PizzaBuilderService extends BaseService<IPizzaBuilder> {
  async findAll(query?: DTO): Promise<IPizzaBuilder[]> {
    throw new Error("Method not implemented.");
  }
  async findOne(id: string): Promise<IPizzaBuilder | undefined> {
    const _data = await this?.repo?.findOne?.(id);

    type ItemWilSort = { values: IPizzaSizeValue[] };
    const sortByValueAverage = (a: ItemWilSort, b: ItemWilSort) => {
      return getAverage(a.values.map((x) => x.value)) >
        getAverage(b.values.map((x) => x.value))
        ? -1
        : 1;
    };

    const sortByPos = (a, b) => (a.position > b.position ? 1 : -1);

    if (!_data) return undefined;

    const sizes = _data.sizes.sort((a, b) =>
      a.pieces + a.maxflavors + a.approximateCm >
      b.pieces + b.maxflavors + b.approximateCm
        ? 1
        : -1
    );
    const doughThicknesses = _data.doughThicknesses.sort(sortByPos);
    const doughTypes = _data.doughTypes.sort(sortByPos);
    const extras = _data.extras.sort(sortByValueAverage);
    const crusts = _data.crusts.sort(sortByPos);
    const ingredients = _data.ingredients.sort((a, b) =>
      name(b) ?? "" > name(b) ? -1 : 1
    );
    const doughBakingLevels = _data.doughBakingLevels.sort(sortByPos);
    const groups = _data.groups
      .map((x) => ({
        ...x,
        flavors: x.flavors.sort((a, b) => (a.sold > b.sold ? -1 : 1)),
      }))
      .sort((a, b) =>
        getAverage(a.flavors.map((x) => x.sold)) >
        getAverage(b.flavors.map((x) => x.sold))
          ? -1
          : 1
      );

    const discounts = _data.discounts.sort((a, b) =>
      a.applied > b.applied ? -1 : 1
    );

    const data = {
      sizes,
      doughThicknesses,
      doughTypes,
      doughBakingLevels,
      extras,
      crusts,
      ingredients,
      groups,
      discounts,
    };

    return data;
  }
  async createOne(obj: IPizzaBuilder): Promise<IPizzaBuilder> {
    throw new Error("Method not implemented.");
  }
  async createMany(objs: IPizzaBuilder[]): Promise<IPizzaBuilder[]> {
    throw new Error("Method not implemented.");
  }
  async updateOne(id: string, obj: IPizzaBuilder): Promise<IPizzaBuilder> {
    throw new Error("Method not implemented.");
  }
  async deleteOne(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
