import { Box, Button, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { SaleTable } from "./SaleTable";
import { useQuantityState } from "../context/pos.context";
import { getTotalQuantity } from "../utils/totalQuantity";
import { QuantityInput } from "../models/quantity";

type OrderProps = Readonly<{
  onBack: () => void;
}>;
export function SaleScreen({ onBack }: OrderProps) {
  const quantityState = useQuantityState();
  const totalQuantity = getTotalQuantity(quantityState as QuantityInput);
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 1,
        gridTemplateRows: "auto",
        gridTemplateAreas: `"backButton header header info"
          " . main main . "
          ". . . footer"`,
      }}
    >
      <Box sx={{ gridArea: "backButton" }}>
        <Button
          size="large"
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => {
            onBack();
          }}
        >
          Back
        </Button>
      </Box>
      <Box sx={{ gridArea: "header" }}>
        <Typography variant="h3" component="h2" sx={{ mb: 2, textAlign: "center" }}>
          Sale
        </Typography>
      </Box>
      <Box
        gap={1}
        sx={{
          gridArea: "info",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <Button size="medium" variant="outlined" color="info" sx={{ textAlign: "end" }}>
          Items {totalQuantity}
        </Button>
        <Button size="medium" variant="outlined" color="info" sx={{ textAlign: "end" }}>
          Cost $41
        </Button>
      </Box>
      <Box sx={{ gridArea: "main", display: "flex", justifyContent: "center" }}>
        <SaleTable />
      </Box>
      <Box sx={{ gridArea: "footer", display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            onBack();
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
