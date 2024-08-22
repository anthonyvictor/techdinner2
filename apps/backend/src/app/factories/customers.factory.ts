import { Router } from "express";
import { CustomersController } from "@/src/app/controllers/customers.controller";
import { CustomersService } from "@/src/app/services/customers.service";
import { CustomersCacheRepo } from "@/src/app/repos/cache/customers.repo";

export const makeCustomers = () => {
  const router = Router();

  const controller = new CustomersController(
    new CustomersService(new CustomersCacheRepo())
  );

  router.get("/", controller.get);
  router.post("/", controller.post);
  router.patch("/", controller.patch);
  router.put("/:id", controller.put);
  router.delete("/:id", controller.delete);

  return router;
};
