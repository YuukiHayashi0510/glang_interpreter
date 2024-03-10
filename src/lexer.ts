import type { Token } from "../types/token";
import { LiteralConsumeHelper, LiteralHelper } from "./literal";

export const runLexer = (input: string): Token[] => {
  const tokens: Token[] = [];
  let position = 0;

  while (position < input.length) {
    if (LiteralHelper.isBlank(input[position])) {
      position++;
      continue;
    }

    const numberStr = LiteralConsumeHelper.consumeNumberLiteral(
      input.slice(position)
    );
    if (numberStr) {
      tokens.push({ type: "number", number: parseFloat(numberStr) });
      position += numberStr.length;
      continue;
    }

    // 演算子
    if (input[position] === "+") {
      tokens.push({ type: "plus" });
      position++;
      continue;
    }
    if (input[position] === "-") {
      tokens.push({ type: "minus" });
      position++;
      continue;
    }
    if (input[position] === "*") {
      tokens.push({ type: "multi" });
      position++;
      continue;
    }
    if (input[position] === "/") {
      tokens.push({ type: "div" });
      position++;
      continue;
    }

    // 括弧
    if (input[position] === "(") {
      tokens.push({ type: "lparen" });
      position++;
      continue;
    }
    if (input[position] === ")") {
      tokens.push({ type: "rparen" });
      position++;
      continue;
    }

    throw new Error(`Invalid character: ${input[position]}`);
  }

  return tokens;
};
