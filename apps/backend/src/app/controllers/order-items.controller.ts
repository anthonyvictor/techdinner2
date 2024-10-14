import { IOrderItem } from "@td/types";
import { BaseController } from "@/src/infra/classes/BaseController";
import { Request, Response } from "express";
import { OrderItemsGetDTO } from "@/src/infra/types/dto/order-items";
import { HTTPError } from "@/src/infra/classes/HTTPError";
import { io } from "@/src";
import { getIsFrom } from "../../middlewares/from";

export class OrderItemsController extends BaseController<IOrderItem> {
  get = async (req: Request, res: Response) => {
    try {
      const from = getIsFrom(req);
      let data: IOrderItem[] | IOrderItem | undefined;
      const id = req?.params?.id;
      if (id) {
        data = await this.service.findOne({ id, from });
      } else {
        data = await this.service.findAll(
          req.query as unknown as OrderItemsGetDTO
        );
      }
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
      let data: IOrderItem;
      const obj = req.body?.data;
      if (!obj) throw new HTTPError("Bad request");
      data = await this.service.createOne(obj);

      io.emit("orderItemUpdated", data);

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
  put = async (req: Request, res: Response) => {
    try {
      let data: IOrderItem;
      const id = req?.params?.id;
      if (!id) {
        throw new HTTPError("Bad request");
      }
      const obj = req.body?.data;
      if (!obj) throw new HTTPError("Bad request");

      data = await this.service.updateOne(id, obj);

      io.emit("orderItemUpdated", data);

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
      let data: IOrderItem[];
      const objs = req.body?.data as IOrderItem[];
      if (!objs.length) throw new HTTPError("Bad request");

      data = await this.service.createMany(objs);

      io.emit("orderItemsUpdated", data);

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
