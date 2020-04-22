import { assert } from "chai";
import { add } from "..";

describe("Array", () => {
  describe("#indexOf()", () => {
    it("should return -1 when the value is not present", () => {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });

  describe("#add()", () => {
    it("add 1 and 2 should return 3", () => {
      const expectedValue: number = 3;
      const result = add(1, 2);
      assert.equal(result, expectedValue, "Result of add is incorect");
    });
  });
});
