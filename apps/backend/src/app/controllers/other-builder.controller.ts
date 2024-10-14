import { BaseController } from "@/src/infra/classes/BaseController";
import { Request, Response } from "express";
import { IOtherBuilder } from "@td/types";
import { HTTPError } from "@/src/infra/classes/HTTPError";
import { OtherBuilderGetDTO } from "@/src/infra/types/dto/otherBuilder";
import { getIsFrom } from "../../middlewares/from";

export class OtherBuilderController extends BaseController<IOtherBuilder> {
  get = async (req: Request, res: Response) => {
    const query = req.body as OtherBuilderGetDTO;
    query.from = getIsFrom(req);
    try {
      const data = await this.service.findOne(query);
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
