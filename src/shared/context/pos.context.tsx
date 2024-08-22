import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Cashier } from "../models/cashier";
import { Sale } from "../models/sale";

const CashierContext = createContext<Cashier | null | undefined>(undefined);
const CashierStateUpdater = createContext<
  React.Dispatch<React.SetStateAction<Cashier | null>> | undefined
>(undefined);

const SalesContext = createContext<Sale[] | null | undefined>(undefined);
const SalesStateUpdater = createContext<((sale: Sale) => void) | undefined>(undefined);

type PosContextProviderProps = Readonly<PropsWithChildren>;
export function PosContextProvider({ children }: PosContextProviderProps) {
  const [cashier, setCashier] = useState<Cashier | null>(null);
  const [sales, setSales] = useState<Sale[] | null>(() => {
    const savedSales = localStorage.getItem("sales");
    const initiaSales: Sale[] = savedSales ? JSON.parse(savedSales) : null;
    return initiaSales;
  });

  const updateSales = (newSale: Sale) => {
    if (!sales) {
      return;
    }

    const updatedSaleIndex = sales?.findIndex((sale) => sale.cashierId === newSale.cashierId);

    const updatedSales = sales?.splice(updatedSaleIndex, 1, newSale);
    setSales(updatedSales);
    localStorage.setItem("sales", JSON.stringify(updatedSales));
  };

  return (
    <CashierContext.Provider value={cashier}>
      <CashierStateUpdater.Provider value={setCashier}>
        <SalesContext.Provider value={sales}>
          <SalesStateUpdater.Provider value={updateSales}>{children}</SalesStateUpdater.Provider>
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

export function useSalesState() {
  const salesState = useContext(SalesContext);
  if (typeof salesState === "undefined") {
    throw new Error("useSalesState must be used withing CashierState");
  }
  return salesState;
}
