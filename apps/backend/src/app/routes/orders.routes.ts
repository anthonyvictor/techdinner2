import { makeOrders } from "@/src/app/factories/orders.factory";
import router from "@/src/router";

router.use("/orders", makeOrders());
