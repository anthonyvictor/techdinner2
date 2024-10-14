import { IPromoBuilder } from "@td/types";
import { BaseService } from "@/src/infra/classes/BaseService";
import { DTO } from "@/src/infra/types/dto";
import { isAvailable } from "@td/functions";

export class PromoBuilderService extends BaseService<IPromoBuilder> {
  async findAll(query?: DTO): Promise<IPromoBuilder[]> {
    throw new Error("Method not implemented.");
  }
  async findOne(dto: DTO): Promise<IPromoBuilder | undefined> {
    const _data = await this?.repo?.findOne?.(dto);

    if (!_data) return undefined;
    const { promos: _promos } = _data;
    const promos = _promos.filter((x) => isAvailable(x.avails, dto.from));
    return { promos };
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
