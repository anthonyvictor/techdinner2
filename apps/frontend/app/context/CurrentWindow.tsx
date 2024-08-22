"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface ICurrentWindowContext {
  currentWindowRef: RefObject<HTMLElement | undefined>;
  currentWindow: string;
  setCurrentWindow: Dispatch<SetStateAction<string>>;
}
const CurrentWindowContext = createContext<ICurrentWindowContext>(
  {} as ICurrentWindowContext
);

export const CurrentWindowProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [currentWindow, setCurrentWindow] = useState("");
  const currentWindowRef = useRef<HTMLElement>();

  return (
    <CurrentWindowContext.Provider
      value={{
        currentWindow,
        setCurrentWindow,
        currentWindowRef,
      }}
    >
      {children}
    </CurrentWindowContext.Provider>
  );
};

export const useCurrentWindow = () => {
  return useContext(CurrentWindowContext);
};
