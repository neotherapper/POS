import { QuantityInput } from "../models/quantity";

export function getTotalQuantity(quantity: QuantityInput) {
  return Object.values(quantity).reduce((acc, quantityValue) => acc + quantityValue, 0);
}
