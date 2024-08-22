import Box from "@mui/material/Box";
import SelectCashier from "./SelectCashier";
import { PosContextProvider } from "./shared/context/pos.context";
import SalesDashboard from "./shared/components/SalesDashboard";
import Cashiers from "../data/cashier.json";
import Products from "../data/products.json";
import Sales from "../data/sales.json";
import { Cashier } from "./shared/models/cashier";
import useLocalStorage from "./shared/hooks/useLocalStorage";
import { Product } from "./shared/models/product";
import { Sale } from "./shared/models/sale";

export default function App() {
  useLocalStorage<Cashier[]>("cashiers", Cashiers);
  useLocalStorage<Product[]>("products", Products);
  useLocalStorage<Sale[]>("sales", Sales);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent={"center"}
      gap={4}
      p={2}
      minHeight={"100vh"}
    >
      <PosContextProvider>
        <SelectCashier />
        <SalesDashboard />
      </PosContextProvider>
    </Box>
  );
}
