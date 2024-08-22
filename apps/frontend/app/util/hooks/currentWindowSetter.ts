import { useCurrentWindow } from "@/app/context/CurrentWindow";
import { useEffect } from "react";

export const useCurrentWindowSetter = (id: string) => {
  const { currentWindow, setCurrentWindow } = useCurrentWindow();

  useEffect(() => {
    setCurrentWindow(id);

    return () => {
      setCurrentWindow(currentWindow);
    };
  }, []); // eslint-disable-line
};
