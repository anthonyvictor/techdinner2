import { Router } from "express";
import { DrinkBuilderController } from "@/src/app/controllers/drink-builder.controller";
import { DrinkBuilderService } from "@/src/app/services/drink-builder.service";
import { DrinkBuilderCacheRepo } from "@/src/app/repos/cache/drink-builder.repo";

export const makeDrinkBuilder = () => {
  const router = Router();

  const controller = new DrinkBuilderController(
    new DrinkBuilderService(new DrinkBuilderCacheRepo())
  );

  router.get("/", controller.get);
  router.post("/", controller.post);
  router.patch("/", controller.patch);
  router.put("/", controller.put);
  router.delete("/", controller.delete);

  return router;
};
