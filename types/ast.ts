type BinaryOperator = {
  type: "binaryOperator";
  operator: "plus" | "minus" | "multi" | "div";
  left: AST;
  right: AST;
};

// Abstract Syntax Tree, 抽象構文木
export type AST = BinaryOperator | { type: "number"; value: number };
