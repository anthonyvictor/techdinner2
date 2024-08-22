import { Router } from "express";
import { OrderPlatformController } from "@/src/app/controllers/order-platform.controller";
import { OrderPlatformService } from "@/src/app/services/order-platform.service";
import { OrderPlatformCacheRepo } from "@/src/app/repos/cache/order-platform.repo";

export const makeOrderPlatform = () => {
  const router = Router();

  const controller = new OrderPlatformController(
    new OrderPlatformService(new OrderPlatformCacheRepo())
  );

  router.get("/", controller.get);
  router.post("/", controller.post);
  router.patch("/", controller.patch);
  router.put("/:id", controller.put);
  router.delete("/:id", controller.delete);

  return router;
};
