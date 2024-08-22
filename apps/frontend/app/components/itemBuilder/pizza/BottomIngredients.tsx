import { usePizzaBuilder } from "@/app/context/itemBuilder/Pizza";
import { Flex } from "@radix-ui/themes";

import { useSelectIngredients } from "./SelectIngredients";
import { ModalBottom } from "../../ModalBottom";

export const BottomIngredients = () => {
  const { addFlavor } = usePizzaBuilder();
  const { flavor, nextButtonRef } = useSelectIngredients();

  return (
    <Flex direction={"column"} gap="2">
      <ModalBottom
        type="dialog"
        nextRef={nextButtonRef}
        onNext={() => addFlavor(flavor)}
      />
    </Flex>
  );
};
