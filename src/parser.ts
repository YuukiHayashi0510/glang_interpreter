import type { AST } from "../types/ast";
import type { Token } from "../types/token";

export const runParse = (tokens: Token[]): AST => {
  let position = 0;

  const term2 = (): AST => {
    let current = term1();

    while (position < tokens.length) {
      const token = tokens[position];
      if (token.type === "plus" || token.type === "minus") {
        position++;
        current = {
          type: "binaryOperator",
          operator: token.type,
          left: current,
          right: number(),
        };
      } else break;
    }

    return current;
  };

  const term1 = (): AST => {
    let current = term0();

    while (position < tokens.length) {
      const token = tokens[position];
      if (token.type === "multi" || token.type === "div") {
        position++;
        current = {
          type: "binaryOperator",
          operator: token.type,
          left: current,
          right: term0(),
        };
      } else break;
    }
    return current;
  };

  const term0 = (): AST => {
    const token = tokens[position];
    if (token.type === "number") {
      position++;
      return { type: "number", value: token.number! };
    }

    if (token.type === "lparen") {
      position++;
      const exp = term2();
      if (tokens[position].type !== "rparen") {
        throw new Error("Expected )");
      }
      position++;
      return exp;
    }

    throw new Error("Expected number or '('");
  };

  const number = (): AST => {
    const token = tokens[position];
    if (token.type === "number") {
      position++;
      return { type: "number", value: token.number! };
    }

    throw new Error("Expected number");
  };

  return term2();
};
