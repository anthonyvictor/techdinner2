import { Router } from "express";
import { ItemsPanelController } from "@/src/app/controllers/items-panel.controller";
import { ItemsPanelService } from "@/src/app/services/items-panel.service";
import { ItemsPanelCacheRepo } from "@/src/app/repos/cache/items-panel.repo";

export const makeItemsPanel = () => {
  const router = Router();

  const controller = new ItemsPanelController(
    new ItemsPanelService(new ItemsPanelCacheRepo())
  );

  router.get("/", controller.get);
  router.post("/", controller.post);
  router.patch("/", controller.patch);
  router.put("/", controller.put);
  router.delete("/", controller.delete);

  return router;
};
