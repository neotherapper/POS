import { useCashierState } from "../context/pos.context";

export default function SalesDashboard() {
  const cashier = useCashierState();

  return <h1>{cashier?.name}</h1>;
}
