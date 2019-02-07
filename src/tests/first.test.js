import { sum } from "./sum";
test("test sum", () => {
  expect(sum(2, 3)).toBeGreaterThan(1);
});
