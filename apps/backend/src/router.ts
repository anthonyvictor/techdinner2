import { Router } from "express";
import { makeOrders } from "./app/factories/orders.factory";
import { makeItemsPanel } from "./app/factories/items-panel.factory";
import { makePizzaBuilder } from "./app/factories/pizza-builder.factory";
import { makeCustomers } from "./app/factories/customers.factory";
import { makeOrderItems } from "./app/factories/order-items.factory";
import { makeOrderPlatform } from "./app/factories/order-platform.factory";
import { makeOrderType } from "./app/factories/order-type.factory";
import { makeDrinkBuilder } from "./app/factories/drink-builder.factory";
import { makeOtherBuilder } from "./app/factories/other-builder.factory";
import { makePromoBuilder } from "./app/factories/promo-builder.factory";

const router = Router();

router.use("/orders", makeOrders());
router.use("/order-items", makeOrderItems());
router.use("/order-platform", makeOrderPlatform());
router.use("/order-type", makeOrderType());
router.use("/customers", makeCustomers());
router.use("/items-panel", makeItemsPanel());
router.use("/pizza-builder", makePizzaBuilder());
router.use("/drink-builder", makeDrinkBuilder());
router.use("/other-builder", makeOtherBuilder());
router.use("/promo-builder", makePromoBuilder());

export default router;
