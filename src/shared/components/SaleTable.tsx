import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Input,
} from "@mui/material";
import { Product } from "../models/product";
import useLocalStorage from "../hooks/useLocalStorage";
import { useQuantityState, useQuantityUpdater } from "../context/pos.context";

export function SaleTable() {
  const { value: products } = useLocalStorage<Product[]>("products", []);
  const quantityInput = useQuantityState();
  const updateQuantity = useQuantityUpdater();

  return (
    <TableContainer sx={{ width: 350 }} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Qty</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell
                component="th"
                scope="row"
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <div>{product.name}</div>
                <div>{product.descr}</div>
              </TableCell>
              <TableCell align="right">{product.price}</TableCell>
              <TableCell align="right">
                <Input
                  name={product.name}
                  value={quantityInput?.[product.sku]}
                  onChange={(event) => updateQuantity(product.sku, event.target.value)}
                />
              </TableCell>
              <TableCell align="right">{product.price * 1}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
