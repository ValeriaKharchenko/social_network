import { sum } from "./dummy";

describe("dummy test", () => {
  it("returns correct result", () => {
    expect(sum(2, 3)).toEqual(5);
    // expect(sum(2, 7)).toEqual(5);
  });
  it("returns false", () => {
    expect(sum(2, 7)).not.toBe(5);
  });
});
