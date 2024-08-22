import { IItemsPanel } from "@td/types";
import { BaseRepository } from "@/src/infra/classes/BaseRepository";
import { DTO } from "@/src/infra/types/dto";
import { drinks } from "@/src/data/drinks";
import { pizzas } from "@/src/data/pizzas";
import { others } from "@/src/data/others";
import { combos } from "@/src/data/combos";

export class ItemsPanelCacheRepo extends BaseRepository<IItemsPanel> {
  constructor() {
    super();
  }
  async findAll(query?: DTO): Promise<IItemsPanel[]> {
    throw new Error("Method not implemented.");
  }
  async findOne(): Promise<IItemsPanel | undefined> {
    const _drinks = Object.values(drinks);
    _drinks.sort((a, b) => (a.sold > b.sold ? -1 : 1));
    const _pizzas = Object.values(pizzas);
    _pizzas.sort((a, b) => ((a?.sold ?? 0) > (b?.sold ?? 0) ? -1 : 1));
    const _others = Object.values(others);
    _others.sort((a, b) => (a.sold > b.sold ? -1 : 1));
    const _combos = Object.values(combos);
    _combos.sort((a, b) => (a.sold > b.sold ? -1 : 1));

    const data = {
      drinks: _drinks,
      pizzas: _pizzas,
      others: _others,
      combos: _combos,
    };
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
