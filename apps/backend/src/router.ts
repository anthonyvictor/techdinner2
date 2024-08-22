import { Router } from "express";
import { makeOrders } from "./app/factories/orders.factory";
import { makeItemsPanel } from "./app/factories/items-panel.factory";
import { makePizzaBuilder } from "./app/factories/pizza-builder.factory";
import { makeCustomers } from "./app/factories/customers.factory";
import { makeOrderItems } from "./app/factories/order-items.factory";
import { makeOrderPlatform } from "./app/factories/order-platform.factory";

const router = Router();

router.use("/orders", makeOrders());
router.use("/order-items", makeOrderItems());
router.use("/order-platform", makeOrderPlatform());
router.use("/customers", makeCustomers());
router.use("/items-panel", makeItemsPanel());
router.use("/pizza-builder", makePizzaBuilder());

export default router;
