import { LiteralConsumeHelper, LiteralHelper } from "./literal";

interface OperatorToken {
  type: "plus" | "minus" | "multi" | "div";
}

interface NumberToken {
  type: "number";
  number: number;
}

type Token = OperatorToken | NumberToken;

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

    throw new Error("Invalid character: " + input[position]);
  }

  return tokens;
};
