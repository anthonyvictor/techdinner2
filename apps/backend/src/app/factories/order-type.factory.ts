import { Router } from "express";
import { OrderTypeController } from "@/src/app/controllers/order-type.controller";
import { OrderTypeService } from "@/src/app/services/order-type.service";
import { OrderTypeCacheRepo } from "@/src/app/repos/cache/order-type.repo";

export const makeOrderType = () => {
  const router = Router();

  const controller = new OrderTypeController(
    new OrderTypeService(new OrderTypeCacheRepo())
  );

  router.get("/", controller.get);
  router.post("/", controller.post);
  router.patch("/", controller.patch);
  router.put("/:id", controller.put);
  router.delete("/:id", controller.delete);

  return router;
};
