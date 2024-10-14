import { Router } from "express";
import { PromoBuilderController } from "@/src/app/controllers/promo-builder.controller";
import { PromoBuilderService } from "@/src/app/services/promo-builder.service";
import { PromoBuilderCacheRepo } from "@/src/app/repos/cache/promo-builder.repo";

export const makePromoBuilder = () => {
  const router = Router();

  const controller = new PromoBuilderController(
    new PromoBuilderService(new PromoBuilderCacheRepo())
  );

  router.get("/", controller.get);
  router.post("/", controller.post);
  router.patch("/", controller.patch);
  router.put("/", controller.put);
  router.delete("/", controller.delete);

  return router;
};
