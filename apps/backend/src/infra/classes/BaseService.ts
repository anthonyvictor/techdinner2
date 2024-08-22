import { DTO } from "@/src/infra/types/dto";
import { BaseRepository } from "./BaseRepository";

interface Module<T> {
  name: string;
  service: BaseService<T>;
}

export abstract class BaseService<T> {
  constructor(
    protected repo: BaseRepository<T>,
    protected modules?: Module<any>[]
  ) {}
  abstract findAll(query?: DTO): Promise<T[]>;
  abstract findOne(id: string): Promise<T | undefined>;
  abstract createOne(obj: T): Promise<T>;
  abstract createMany(objs: T[]): Promise<T[]>;
  abstract updateOne(id: string, obj: T): Promise<T>;
  abstract deleteOne(id: string): Promise<void>;
}
