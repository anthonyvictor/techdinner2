import { ICustomer } from "@td/types";
import { BaseService } from "@/src/infra/classes/BaseService";
import { DTO } from "@/src/infra/types/dto";

export class CustomersService extends BaseService<ICustomer> {
  async findAll(query?: DTO): Promise<ICustomer[]> {
    const _data = await this.repo.findAll(query);
    const data = _data;
    return data;
  }
  async findOne(): Promise<ICustomer | undefined> {
    throw new Error("Method not implemented.");
  }
  async createOne(obj: ICustomer): Promise<ICustomer> {
    throw new Error("Method not implemented.");
  }
  async createMany(objs: ICustomer[]): Promise<ICustomer[]> {
    throw new Error("Method not implemented.");
  }
  async updateOne(id: string, obj: ICustomer): Promise<ICustomer> {
    throw new Error("Method not implemented.");
  }
  async deleteOne(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
