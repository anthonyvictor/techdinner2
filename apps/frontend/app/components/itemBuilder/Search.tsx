import { Search } from "@/app/components/Search"
import { SetState } from "../../infra/types/setState"
import { Ref } from "../../infra/types/ref"

export const ItemSearch = ({
  id,
  search,
  setSearch,
  searchRef,
}: {
  id: string
  search: string
  setSearch: SetState<string>
  searchRef: Ref<HTMLInputElement | undefined>
}) => {
  return (
    <Search
      id={id}
      placeholder="Pesquise por um item..."
      value={search}
      setValue={setSearch}
      ref={searchRef as Ref<HTMLInputElement>}
    />
  )
}
