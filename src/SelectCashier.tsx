import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Cashiers from "../data/cashier.json";
import { Cashier } from "./shared/models/cashier";
import { useCashierState, useCashierStateUpdater } from "./shared/context/pos.context";
import { Checkbox } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

function CashierListItem({ cashier }: { cashier: Cashier }) {
  return (
    <ListItem
      alignItems="flex-start"
      secondaryAction={<Checkbox icon={<CircleIcon fontSize="large" />} edge="end" />}
      disablePadding
    >
      <ListItemText
        primaryTypographyProps={{ variant: "h4", component: "span", textAlign: "center" }}
        primary={cashier.name}
      />
    </ListItem>
  );
}

export default function SelectCashier() {
  const cashierUpdater = useCashierStateUpdater();
  const cashier = useCashierState();

  if (cashier) {
    return null;
  }

  return (
    <List
      sx={{ width: "100%", maxWidth: 300, bgcolor: "background.paper", border: "1px solid black" }}
    >
      <Typography variant="h4" component="h1" textAlign="center" sx={{ mb: 2 }}>
        Select Cashier
      </Typography>
      <Divider variant="fullWidth" component="li" />
      {Cashiers.map((cashier) => {
        return (
          <div onClick={() => cashierUpdater(cashier)}>
            <CashierListItem cashier={cashier} />
            <Divider variant="fullWidth" component="li" />
          </div>
        );
      })}
    </List>
  );
}
