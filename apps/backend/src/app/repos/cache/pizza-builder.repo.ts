import { IPizzaBuilder } from "@td/types";
import { BaseRepository } from "@/src/infra/classes/BaseRepository";
import {
  crusts,
  doughBakingLevels,
  doughThicknesses,
  doughTypes,
  extras,
  flavors,
  groups,
  ingredients,
  sizes,
} from "@/src/data/pizza";
import { discounts } from "@/src/data/discounts";

export class PizzaBuilderCacheRepo extends BaseRepository<IPizzaBuilder> {
  constructor() {
    super();
  }
  async findAll(): Promise<IPizzaBuilder[]> {
    throw new Error("Method not implemented.");
  }
  async findOne(): Promise<IPizzaBuilder | undefined> {
    const _sizes = Object.values(sizes);
    const _flavors = Object.values(flavors);
    const _doughThicknesses = Object.values(doughThicknesses);
    const _doughTypes = Object.values(doughTypes);
    const _doughBakingLevels = Object.values(doughBakingLevels);
    const _extras = Object.values(extras);
    const _crusts = Object.values(crusts);
    const _ingredients = Object.values(ingredients);
    const _groups = Object.values(groups).map((x) => ({
      ...x,
      flavors: _flavors.filter((y) => y.group.id === x.id),
    }));
    const _discounts = discounts.filter((x) => x.to.includes("pizza"));

    const data = {
      sizes: _sizes,
      doughThicknesses: _doughThicknesses,
      doughTypes: _doughTypes,
      extras: _extras,
      crusts: _crusts,
      ingredients: _ingredients,
      groups: _groups,
      discounts: _discounts,
      doughBakingLevels: _doughBakingLevels,
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
