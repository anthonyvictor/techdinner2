import { Router } from "express";
import { OtherBuilderController } from "@/src/app/controllers/other-builder.controller";
import { OtherBuilderService } from "@/src/app/services/other-builder.service";
import { OtherBuilderCacheRepo } from "@/src/app/repos/cache/other-builder.repo";

export const makeOtherBuilder = () => {
  const router = Router();

  const controller = new OtherBuilderController(
    new OtherBuilderService(new OtherBuilderCacheRepo())
  );

  router.get("/", controller.get);
  router.post("/", controller.post);
  router.patch("/", controller.patch);
  router.put("/", controller.put);
  router.delete("/", controller.delete);

  return router;
};
