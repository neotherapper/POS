import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: SelectCashier,
});

function SelectCashier() {
  return (
    <div className="p-2">
      Cashier
      <Link
        to={"/sales/$id"}
        params={{
          id: "1",
        }}
        activeProps={{
          className: "font-bold",
        }}
      >
        Cashier 1
      </Link>
      <Link
        to={"/sales/$id"}
        params={{
          id: "2",
        }}
        activeProps={{
          className: "font-bold",
        }}
      >
        Cashier 2
      </Link>
    </div>
  );
}
