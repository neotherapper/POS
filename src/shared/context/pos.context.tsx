import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Cashier } from "../models/cashier";
import { Sale } from "../models/sale";

const CashierContext = createContext<Cashier | null | undefined>(undefined);
const CashierStateUpdater = createContext<
  React.Dispatch<React.SetStateAction<Cashier | null>> | undefined
>(undefined);

const SalesContext = createContext<Sale[] | null | undefined>(undefined);
const SalesStateUpdater = createContext<
  React.Dispatch<React.SetStateAction<Sale[] | null>> | undefined
>(undefined);

type PosContextProviderProps = Readonly<PropsWithChildren>;
export function PosContextProvider({ children }: PosContextProviderProps) {
  const [cashier, setCashier] = useState<Cashier | null>(null);
  const [sales, setSales] = useState<Sale[] | null>(null);
  return (
    <CashierContext.Provider value={cashier}>
      <CashierStateUpdater.Provider value={setCashier}>
        <SalesContext.Provider value={sales}>
          <SalesStateUpdater.Provider value={setSales}>{children}</SalesStateUpdater.Provider>
        </SalesContext.Provider>
      </CashierStateUpdater.Provider>
    </CashierContext.Provider>
  );
}

export function useCashierState() {
  const cashierState = useContext(CashierContext);
  if (typeof cashierState === "undefined") {
    throw new Error("useCashierState must be used withing CashierState");
  }
  return cashierState;
}

export function useCashierStateUpdater() {
  const cashierStateUpdate = useContext(CashierStateUpdater);
  if (typeof cashierStateUpdate === "undefined") {
    throw new Error("useCashierStateUpdater must be used withing CashierState");
  }

  return cashierStateUpdate;
}
