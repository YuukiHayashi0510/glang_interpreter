import { runLexer } from "../src/lexer";
import { it, expect, describe } from "vitest";

const tests = [
  {
    input: "1 + 2 * 4 / 2",
    want: [
      { type: "number", number: 1 },
      { type: "plus" },
      { type: "number", number: 2 },
      { type: "multi" },
      { type: "number", number: 4 },
      { type: "div" },
      { type: "number", number: 2 },
    ],
  },
  {
    input: "3 - -7.4",
    want: [
      { type: "number", number: 3 },
      { type: "minus" },
      { type: "number", number: -7.4 },
    ],
  },
];

describe("lexer", () => {
  for (const test of tests) {
    it(`should return ${JSON.stringify(test.want)} for ${test.input}`, () => {
      expect(runLexer(test.input)).toEqual(test.want);
    });
  }
});
