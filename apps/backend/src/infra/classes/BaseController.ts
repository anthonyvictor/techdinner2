import { Request, Response } from "express";
import { BaseService } from "./BaseService";

export abstract class BaseController<T> {
  constructor(protected service: BaseService<T>) {}
  abstract get(req: Request, res: Response): Promise<void>;
  abstract post(req: Request, res: Response): Promise<void>;
  abstract put(req: Request, res: Response): Promise<void>;
  abstract patch(req: Request, res: Response): Promise<void>;
  abstract delete(req: Request, res: Response): Promise<void>;
}
