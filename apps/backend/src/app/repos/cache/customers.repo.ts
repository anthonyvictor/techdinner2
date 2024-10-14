import { ICustomer } from "@td/types";
import { BaseRepository } from "@/src/infra/classes/BaseRepository";
import { DTO } from "@/src/infra/types/dto";
import { customers } from "@/src/data/customers";

export class CustomersCacheRepo extends BaseRepository<ICustomer> {
  constructor() {
    super();
  }
  async findAll(query?: DTO): Promise<ICustomer[]> {
    const data = Object.values(customers);
    return data;
  }
  async findOne({ id }: DTO): Promise<ICustomer | undefined> {
    const data = Object.values(customers);
    return data.find((x) => x.id === id);
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
