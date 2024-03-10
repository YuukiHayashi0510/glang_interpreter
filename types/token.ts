interface OperatorToken {
  type: "plus" | "minus" | "multi" | "div";
}

interface NumberToken {
  type: "number";
  number: number;
}

interface ParenthesisToken {
  type: "lparen" | "rparen";
}

export type Token = OperatorToken | NumberToken | ParenthesisToken;
