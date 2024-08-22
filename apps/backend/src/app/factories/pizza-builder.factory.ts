import { Router } from "express";
import { PizzaBuilderController } from "@/src/app/controllers/pizza-builder.controller";
import { PizzaBuilderService } from "@/src/app/services/pizza-builder.service";
import { PizzaBuilderCacheRepo } from "@/src/app/repos/cache/pizza-builder.repo";

export const makePizzaBuilder = () => {
  const router = Router();

  const controller = new PizzaBuilderController(
    new PizzaBuilderService(new PizzaBuilderCacheRepo())
  );

  router.get("/", controller.get);
  router.post("/", controller.post);
  router.patch("/", controller.patch);
  router.put("/", controller.put);
  router.delete("/", controller.delete);

  return router;
};
