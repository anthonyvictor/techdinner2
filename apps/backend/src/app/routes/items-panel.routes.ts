import { makePizzaBuilder } from "@/src/app/factories/pizza-builder.factory";
import router from "@/src/router";

router.use("/pizza-builder", makePizzaBuilder());
