import type { AST } from "../types/ast";

export const interpret = (ast: AST): number => {
  if (ast.type === "number") return ast.value;

  if (ast.type === "binaryOperator") {
    switch (ast.operator) {
      case "plus":
        return interpret(ast.left) + interpret(ast.right);
      case "minus":
        return interpret(ast.left) - interpret(ast.right);
      case "multi":
        return interpret(ast.left) * interpret(ast.right);
      case "div":
        return interpret(ast.left) / interpret(ast.right);
    }
  }

  throw new Error("Invalid AST");
};
