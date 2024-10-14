import { IOrder } from "@td/types";
import { BaseController } from "@/src/infra/classes/BaseController";
import { Request, Response } from "express";
import { OrdersGetDTO, OrdersPostDTO } from "@/src/infra/types/dto/orders";
import { HTTPError } from "@/src/infra/classes/HTTPError";
import { io } from "@/src";
import { getIsFrom } from "../../middlewares/from";

export class OrdersController extends BaseController<IOrder> {
  get = async (req: Request, res: Response) => {
    try {
      const from = getIsFrom(req);
      let data: IOrder[] | IOrder | undefined;
      const id = req?.params?.id;
      if (id) {
        data = await this.service.findOne({ id, from });
      } else {
        data = await this.service.findAll({
          ...req.query,
          from,
        } as OrdersGetDTO);
      }
      res.json(data);
    } catch (err) {
      console.error((err as Error).message, (err as Error).stack);
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
      let data: IOrder | undefined;

      const body = req.body;

      data = await this.service.createOne(body as IOrder);

      io.emit("orderCreated", data);

      res.json(data);
    } catch (err) {
      console.error((err as Error).message, (err as Error).stack);
      console.error(err.message);
      if (err instanceof HTTPError) {
        res.status(err.code).json({ message: (err as HTTPError).message });
      } else {
        res.status(500).json({ message: (err as Error).message });
      }
    }
  };
  patch = async (req: Request, res: Response) => {
    throw new HTTPError("Not implemented");
  };
  put = async (req: Request, res: Response) => {
    throw new HTTPError("Not implemented");
  };
  delete = async (req: Request, res: Response) => {
    throw new HTTPError("Not implemented");
  };
}
