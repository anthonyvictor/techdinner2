import { TextField } from "@radix-ui/themes";
import {
  Dispatch,
  ForwardedRef,
  forwardRef,
  RefObject,
  SetStateAction,
} from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";

type SearchProps = {
  id: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeholder: string;
};
const SearchComponent = (
  { id, value, setValue, placeholder }: SearchProps,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const crasis = "`";
  return (
    <TextField.Root
      autoComplete="off"
      onKeyDown={(e) => {
        if (
          [
            ...["ArrowUp", "ArrowDown"],
            ...",+-%@#$¨&()_=!;.?/|".split(""),
            ...(`'"\\\`´´´` + crasis).split(""),
          ].includes(e.key)
        )
          e.preventDefault();
      }}
      ref={ref}
      id={id}
      placeholder={placeholder}
      list="none"
      tabIndex={1}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      <TextField.Slot>
        <HiMagnifyingGlass />
      </TextField.Slot>
    </TextField.Root>
  );
};

export const Search = forwardRef(SearchComponent);
