import { describe, expect, test } from "vitest";
import { getTotalQuantity } from "./totalQuantity";
import { QuantityInput } from "../models/quantity";

describe("getTotalQuantity", () => {
  test("should return 0 when all inputs are nil", () => {
    const mockQuantity: QuantityInput = { "1": 0, "2": 0, "3": 0 };
    expect(getTotalQuantity(mockQuantity)).toBe(0);
  });
  test("hould return the total value when at least one input has value", () => {
    const mockQuantity: QuantityInput = { "1": 2, "2": 0, "3": 0 };
    expect(getTotalQuantity(mockQuantity)).toBe(2);

    const mockQuantityTwo: QuantityInput = { "1": 3, "2": 3, "3": 4 };
    expect(getTotalQuantity(mockQuantityTwo)).toBe(10);
  });
});
