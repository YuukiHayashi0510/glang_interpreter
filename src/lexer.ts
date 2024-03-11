import type { Token } from "../types/token";
import { LiteralConsumeHelper, LiteralHelper } from "./literal";

export const runLexer = (input: string): Token[] => {
  const tokens: Token[] = [];
  let position = 0;

  while (position < input.length) {
    if (
      LiteralHelper.isBlank(input[position]) ||
      LiteralHelper.isNextLine(input[position])
    ) {
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

    // 関数
    if (input.slice(position, position + 3) === "def") {
      tokens.push({ type: "def" });
      position += 3;
      continue;
    }

    // 変数
    const variableStr = LiteralConsumeHelper.consumeVariable(
      input.slice(position)
    );
    if (variableStr) {
      tokens.push({ type: "variable", variable: variableStr });
      position += variableStr.length;
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

    // 終端文字
    if (input[position] === ";") {
      tokens.push({ type: "semicolon" });
      position++;
      continue;
    }

    if (input[position] === ",") {
      tokens.push({ type: "comma" });
      position++;
      continue;
    }

    // 代入
    if (input.slice(position, position + 2) === ":=") {
      tokens.push({ type: "assignment" });
      position += 2;
      continue;
    }

    throw new Error(`Invalid character: ${input[position]}`);
  }

  return tokens;
};
