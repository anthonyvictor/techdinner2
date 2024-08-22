import { useSelectIngredients } from "./SelectIngredients";
import { RefObject } from "react";
import { Search } from "../../Search";

export const SearchIngredients = () => {
  const { searchIngredients, setSearchIngredients, searchIngredientsRef } =
    useSelectIngredients();

  return (
    <Search
      id="search-pizza-ingredients-builder"
      placeholder="Digite um ingrediente..."
      value={searchIngredients}
      setValue={setSearchIngredients}
      ref={searchIngredientsRef as RefObject<HTMLInputElement>}
    />
  );
};
