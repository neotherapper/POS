import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import SelectCashier from "./SelectCashier";
import { PosContextProvider } from "./shared/context/pos.context";
import SalesDashboard from "./shared/components/SalesDashboard";
import Cashiers from "../data/cashier.json";
import Products from "../data/products.json";
import Sales from "../data/sales.json";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    localStorage.setItem("cashiers", JSON.stringify(Cashiers));
    localStorage.setItem("products", JSON.stringify(Products));
    localStorage.setItem("sales", JSON.stringify(Sales));
  }, []);

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <PosContextProvider>
          <SelectCashier />
          <SalesDashboard />
        </PosContextProvider>
      </Box>
    </Container>
  );
}
