import { BaseController } from "@/src/infra/classes/BaseController";
import { Request, Response } from "express";
import { IPizzaBuilder } from "@td/types";
import { HTTPError } from "@/src/infra/classes/HTTPError";
import { getIsFrom } from "../../middlewares/from";

export class PizzaBuilderController extends BaseController<IPizzaBuilder> {
  get = async (req: Request, res: Response) => {
    try {
      const from = getIsFrom(req);

      const data = await this.service.findOne({ id: "", from });
      res.json(data);
    } catch (err) {
      console.error(err.message);
      if (err instanceof HTTPError) {
        res.status(err.code).json({ message: (err as HTTPError).message });
      } else {
        res.status(500).json({ message: (err as Error).message });
      }
    }
  };
  post = async (req: Request, res: Response) => {
    try {
      throw new HTTPError("Not implemented");
    } catch (err) {
      console.error(err.message);
      if (err instanceof HTTPError) {
        res.status(err.code).json({ message: (err as HTTPError).message });
      } else {
        res.status(500).json({ message: (err as Error).message });
      }
    }
  };
  patch = async (req: Request, res: Response) => {
    try {
      throw new HTTPError("Not implemented");
    } catch (err) {
      console.error(err.message);
      if (err instanceof HTTPError) {
        res.status(err.code).json({ message: (err as HTTPError).message });
      } else {
        res.status(500).json({ message: (err as Error).message });
      }
    }
  };
  put = async (req: Request, res: Response) => {
    try {
      throw new HTTPError("Not implemented");
    } catch (err) {
      console.error(err.message);
      if (err instanceof HTTPError) {
        res.status(err.code).json({ message: (err as HTTPError).message });
      } else {
        res.status(500).json({ message: (err as Error).message });
      }
    }
  };
  delete = async (req: Request, res: Response) => {
    try {
      throw new HTTPError("Not implemented");
    } catch (err) {
      console.error(err.message);
      if (err instanceof HTTPError) {
        res.status(err.code).json({ message: (err as HTTPError).message });
      } else {
        res.status(500).json({ message: (err as Error).message });
      }
    }
  };
}
