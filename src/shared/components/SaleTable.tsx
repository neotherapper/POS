import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Product } from "../models/product";
import useLocalStorage from "../hooks/useLocalStorage";

export function SaleTable() {
  const { value: products } = useLocalStorage<Product[]>("products", []);
  return (
    <TableContainer sx={{ width: 300 }} component={Paper}>
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
              <TableCell align="right">Qty</TableCell>
              <TableCell align="right">{product.price * 1}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
