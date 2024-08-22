import { IOrderType } from "@td/types";
import { BaseController } from "@/src/infra/classes/BaseController";
import { Request, Response } from "express";
import { HTTPError } from "@/src/infra/classes/HTTPError";

export class OrderTypeController extends BaseController<IOrderType> {
  get = async (req: Request, res: Response) => {
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
  post = async (req: Request, res: Response) => {
    try {
      throw new HTTPError("Not implemented");
    } catch (err) {
      console.error((err as Error).message, (err as Error).stack);
      if (err instanceof HTTPError) {
        res.status(err.code).json({ message: (err as HTTPError).message });
      } else {
        res.status(500).json({ message: (err as Error).message });
      }
    }
  };
  put = async (req: Request, res: Response) => {
    try {
      let data: IOrderType;
      const id = req?.params?.id;
      if (!id) throw new HTTPError("Bad request");

      const obj = req.body?.data;
      if (!obj) throw new HTTPError("Bad request");

      data = await this.service.updateOne(id, obj);

      res.json(data);
    } catch (err) {
      console.error((err as Error).message, (err as Error).stack);
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
      console.error((err as Error).message, (err as Error).stack);
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
      console.error((err as Error).message, (err as Error).stack);
      if (err instanceof HTTPError) {
        res.status(err.code).json({ message: (err as HTTPError).message });
      } else {
        res.status(500).json({ message: (err as Error).message });
      }
    }
  };
}
