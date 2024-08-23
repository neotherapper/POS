import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Cashier } from "../models/cashier";
import { Sale } from "../models/sale";
import { QuantityInput } from "../models/quantity";

// QuantityInput
const QuantityContext = createContext<QuantityInput | null | undefined>(undefined);
const QuantityUpdater = createContext<((sku: number, quantity: string) => void) | undefined>(
  undefined
);

// Cashier
const CashierContext = createContext<Cashier | null | undefined>(undefined);
const CashierStateUpdater = createContext<
  React.Dispatch<React.SetStateAction<Cashier | null>> | undefined
>(undefined);

// Sales
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

  const [quantity, setQuantity] = useState<QuantityInput>({ "1": 0, "2": 0, "3": 0 });

  const updateSales = (newSale: Sale) => {
    if (!sales) {
      return;
    }

    const updatedSaleIndex = sales?.findIndex((sale) => sale.cashierId === newSale.cashierId);

    const updatedSales = sales?.splice(updatedSaleIndex, 1, newSale);
    setSales(updatedSales);
    localStorage.setItem("sales", JSON.stringify(updatedSales));
  };

  const quantityUpdater = (sku: number, quantity: string) => {
    const validatedQuantity = Number(quantity) <= 0 ? 0 : Number(quantity);
    setQuantity((prev) => {
      return {
        ...prev,
        [sku + ""]: validatedQuantity,
      };
    });
  };

  return (
    <CashierContext.Provider value={cashier}>
      <CashierStateUpdater.Provider value={setCashier}>
        <SalesContext.Provider value={sales}>
          <SalesStateUpdater.Provider value={updateSales}>
            <QuantityContext.Provider value={quantity}>
              <QuantityUpdater.Provider value={quantityUpdater}>
                {children}
              </QuantityUpdater.Provider>
            </QuantityContext.Provider>
          </SalesStateUpdater.Provider>
        </SalesContext.Provider>
      </CashierStateUpdater.Provider>
    </CashierContext.Provider>
  );
}
export function useQuantityState() {
  const cashierState = useContext(QuantityContext);
  if (typeof cashierState === "undefined") {
    throw new Error("useCashierState must be used withing PosContextProvider");
  }
  return cashierState;
}

export function useQuantityUpdater() {
  const quantityUpdater = useContext(QuantityUpdater);
  if (typeof quantityUpdater === "undefined") {
    throw new Error("useQuantityUpdater must be used withing PosContextProvider");
  }
  return quantityUpdater;
}

export function useCashierState() {
  const cashierState = useContext(CashierContext);
  if (typeof cashierState === "undefined") {
    throw new Error("useCashierState must be used withing PosContextProvider");
  }
  return cashierState;
}

export function useCashierStateUpdater() {
  const cashierStateUpdater = useContext(CashierStateUpdater);
  if (typeof cashierStateUpdater === "undefined") {
    throw new Error("useCashierStateUpdater must be used withing PosContextProvider");
  }

  return cashierStateUpdater;
}

export function useSalesState() {
  const salesState = useContext(SalesContext);
  if (typeof salesState === "undefined") {
    throw new Error("useSalesState must be used withing PosContextProvider");
  }
  return salesState;
}
