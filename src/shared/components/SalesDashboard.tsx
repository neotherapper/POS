import { Box, Button, Typography } from "@mui/material";
import { useCashierState, useCashierStateUpdater, useSalesState } from "../context/pos.context";
import { BarChart } from "@mui/x-charts/BarChart";
import { Sale } from "../models/sale";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import { SaleScreen } from "./SaleScreen";

const dashboardChartSetting = {
  yAxis: [
    {
      label: "Total Sales Amount",
    },
  ],
  width: 500,
  height: 300,
};

function DashboardBarChart({ data }: { data: Sale[] | null }) {
  if (!data) {
    return;
  }

  const xData = data.reduce(
    (acc, sale) => {
      acc[sale.cashierId + ""] += sale.saleAmount;
      return acc;
    },
    {
      "1": 0,
      "2": 0,
      "3": 0,
    } as Record<string, number>
  );

  console.log(xData);

  const uData = [xData[1], xData[2], xData[3]];
  const xLabels = ["Cashier 1", "Cashier 2", "Cashier 3"];

  return (
    <BarChart
      series={[{ data: uData, label: "sales", id: "uvId" }]}
      xAxis={[{ data: xLabels, scaleType: "band" }]}
      {...dashboardChartSetting}
    />
  );
}

export default function SalesDashboard() {
  const cashier = useCashierState();
  const cashierUpdater = useCashierStateUpdater();
  const sales = useSalesState();
  const [IsOrderVisible, setIsOrderVisible] = useState(false);

  if (!cashier) {
    return;
  }

  const onSwitchCashier = () => {
    cashierUpdater(null);
  };
  const onShowOrder = () => {
    setIsOrderVisible(true);
  };

  const onHideOrder = () => {
    setIsOrderVisible(false);
  };

  return (
    <>
      {!IsOrderVisible && (
        <span>
          <Typography
            style={{
              position: "absolute",
              top: "30px",
              right: "30px",
              display: "flex",
              alignItems: "center",
            }}
            variant="button"
          >
            <PersonIcon fontSize="large" />
            {cashier?.name}
          </Typography>
          <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
            Cashier Sales Statistics
          </Typography>
          <DashboardBarChart data={sales} />

          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12rem" }}>
            <Button
              variant="contained"
              onClick={() => {
                onSwitchCashier();
              }}
            >
              Switch Cashier
            </Button>

            <Button
              variant="outlined"
              onClick={() => {
                onShowOrder();
              }}
            >
              Add Sale
            </Button>
          </Box>
        </span>
      )}
      {IsOrderVisible && <SaleScreen onBack={onHideOrder} />}
    </>
  );
}
