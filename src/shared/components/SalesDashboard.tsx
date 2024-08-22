import { Typography } from "@mui/material";
import { useCashierState, useSalesState } from "../context/pos.context";
import { BarChart } from "@mui/x-charts/BarChart";
import { Sale } from "../models/sale";
import PersonIcon from "@mui/icons-material/Person";

const dashboardChartSetting = {
  yAxis: [
    {
      label: "Total Sales Amount",
    },
  ],
  width: 500,
  height: 300,
};

[
  {
    cashierId: 1,
    saleAmount: 100.0,
  },
  {
    cashierId: 1,
    saleAmount: 200.0,
  },
  {
    cashierId: 2,
    saleAmount: 500.0,
  },
  {
    cashierId: 1,
    saleAmount: 150.0,
  },
  {
    cashierId: 3,
    saleAmount: 300.0,
  },
];

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
    }
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
  const sales = useSalesState();

  if (!cashier) {
    return;
  }

  return (
    <>
      <Typography variant="h2" component="h1" sx={{ mb: 2 }}>
        Cashier Sales Statistics
      </Typography>
      <DashboardBarChart data={sales} />
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
    </>
  );
}
