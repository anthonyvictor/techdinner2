"use client";
import { ICustomer, IOrder } from "@td/types";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import { dateTimeReviver } from "@td/functions/src/format";
import { api } from "../infra/util/api";

interface ICustomersContext {
  currentCustomer: ICustomer;
  customers: ICustomer[];
}
const CustomersContext = createContext<ICustomersContext>(
  {} as ICustomersContext
);

export const CustomersProvider = ({ children }: { children: ReactNode }) => {
  const [currentCustomer, setCurrentCustomer] = useState<ICustomer>(
    {} as ICustomer
  );

  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const pathname = usePathname();

  useLayoutEffect(() => {
    (async () => {
      const res = await api(`customers`);
      // fetch("/api/customers");

      if (res.ok) {
        const _data = JSON.stringify(await res.json());
        const data = JSON.parse(_data, dateTimeReviver);
        setCustomers(data);
      }
    })();
  }, []);

  return (
    <CustomersContext.Provider
      value={{
        customers,
        currentCustomer,
      }}
    >
      {children}
    </CustomersContext.Provider>
  );
};

export const useCustomers = () => {
  return useContext(CustomersContext);
};
