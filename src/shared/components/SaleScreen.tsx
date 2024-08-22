import { Box, Button, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { SaleTable } from "./SaleTable";

type OrderProps = Readonly<{
  onBack: () => void;
}>;
export function SaleScreen({ onBack }: OrderProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(8, 1fr)",
        gap: 2,
        gridTemplateRows: "2fr 4fr 1fr",
        gridTemplateAreas: `"backButton backButton header header header header info info"
  " . main main main main main main . "
  ". . . . . . footer footer"`,
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
      <Box sx={{ gridArea: "info" }}>
        <Button size="large" variant="text">
          Items 6
        </Button>
        <Button size="large" variant="text">
          Cost $41
        </Button>
      </Box>
      <Box sx={{ gridArea: "main", bgcolor: "secondary.main" }}>
        <SaleTable />
      </Box>
      <Box sx={{ gridArea: "footer" }}>
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
