import { Router } from "express";
import { OrdersController } from "@/src/app/controllers/orders.controller";
import { OrdersService } from "@/src/app/services/orders.service";
import { OrdersCacheRepo } from "@/src/app/repos/cache/orders.repo";
import { orderItemsService } from "../factories/order-items.factory";

export const makeOrders = () => {
  const router = Router();

  const controller = new OrdersController(
    new OrdersService(new OrdersCacheRepo(), [
      {
        name: "items",
        service: orderItemsService,
      },
    ])
  );

  router.get("/", controller.get);
  router.post("/", controller.post);
  router.patch("/", controller.patch);
  router.put("/:id", controller.put);
  router.delete("/:id", controller.delete);

  return router;
};
