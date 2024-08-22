import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import SelectCashier from "./SelectCashier";
import { PosContextProvider } from "./shared/context/pos.context";
import SalesDashboard from "./shared/components/SalesDashboard";

export default function App() {
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
