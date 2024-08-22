import { usePizzaBuilder } from "@/app/context/itemBuilder/Pizza";
import { Search } from "../../Search";
import { RefObject } from "react";

export const SearchFlavors = () => {
  const { searchFlavors, setSearchFlavors, searchFlavorRef } =
    usePizzaBuilder();

  return (
    <Search
      id="search-pizza-flavors-builder"
      placeholder="Digite um sabor..."
      value={searchFlavors}
      setValue={setSearchFlavors}
      ref={searchFlavorRef as RefObject<HTMLInputElement>}
    />
  );
};
