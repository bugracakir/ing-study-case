import { expect } from "@wdio/globals";
import { generateRandomId } from "../../src/utils.js";

describe("Employees List Test", () => {
  it("generateRandomId randomness test", async () => {
    const id1 = generateRandomId();
    const id2 = generateRandomId();

    expect(id1).not.toEqual(id2);
  });
});