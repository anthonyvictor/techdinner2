import { TextField } from "@radix-ui/themes"
import { removeAccents } from "@td/functions"
import { ForwardedRef, forwardRef } from "react"
import { HiMagnifyingGlass } from "react-icons/hi2"
import { SetState } from "../infra/types/setState"

type SearchProps = {
  id: string
  value: string
  setValue: SetState<string>
  placeholder: string
}
const SearchComponent = (
  { id, value, setValue, placeholder }: SearchProps,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  const crasis = "`"
  return (
    <TextField.Root
      autoComplete="off"
      onKeyDown={(e) => {
        if (
          [
            ...["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"],
            ...",+-%@#$¨&()_=!;.?/|".split(""),
            ...(`'"\\\`´´´` + crasis).split(""),
          ].includes(e.key)
        )
          e.preventDefault()
      }}
      ref={ref}
      id={id}
      placeholder={placeholder}
      list="none"
      tabIndex={1}
      value={value}
      onChange={(e) => setValue(removeAccents(e.target.value, false))}
    >
      <TextField.Slot>
        <HiMagnifyingGlass />
      </TextField.Slot>
    </TextField.Root>
  )
}

export const Search = forwardRef(SearchComponent)
