import { IOtherBuilder } from "@td/types";
import { BaseService } from "@/src/infra/classes/BaseService";
import { DTO } from "@/src/infra/types/dto";
import { getAverage, isAvailable } from "@td/functions";

export class OtherBuilderService extends BaseService<IOtherBuilder> {
  async findAll(query?: DTO): Promise<IOtherBuilder[]> {
    throw new Error("Method not implemented.");
  }
  async findOne(dto: DTO): Promise<IOtherBuilder | undefined> {
    const _data = await this?.repo?.findOne?.(dto);

    if (!_data) return undefined;

    const categories = _data.categories
      .filter((x) => isAvailable(x.avails, dto.from))
      .map((x) => ({
        ...x,
        others: x.others.sort((a, b) => (a.sold > b.sold ? -1 : 1)),
      }))
      .filter((x) => x.others.length > 0)
      .sort((a, b) =>
        getAverage(a.others.map((x) => x.sold)) >
        getAverage(b.others.map((x) => x.sold))
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
