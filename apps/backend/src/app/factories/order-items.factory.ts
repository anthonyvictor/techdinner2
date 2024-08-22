import { Router } from "express";
import { OrderItemsController } from "@/src/app/controllers/order-items.controller";
import { OrderItemsService } from "@/src/app/services/order-items.service";
import { OrderItemsCacheRepo } from "@/src/app/repos/cache/order-items.repo";

export const orderItemsService = new OrderItemsService(
  new OrderItemsCacheRepo()
);

export const makeOrderItems = () => {
  const router = Router();

  const controller = new OrderItemsController(orderItemsService);

  router.get("/", controller.get);
  router.post("/", controller.post);
  router.patch("/", controller.patch);
  router.put("/:id", controller.put);
  router.delete("/:id", controller.delete);

  return router;
};
