import { DTO } from "@/src/infra/types/dto";

export abstract class BaseRepository<T> {
  constructor() {}
  abstract findAll(query?: DTO): Promise<T[]>;
  abstract findOne?(id: string): Promise<T | undefined>;
  abstract createOne(obj: T): Promise<T>;
  abstract createMany(objs: T[]): Promise<T[]>;
  abstract updateOne(id: string, obj: T): Promise<T>;
  abstract deleteOne(id: string): Promise<void>;
}
