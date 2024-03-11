import type { Expression, GLang, Statement } from "../types/lang";

class Interpreter {
  private defs: Record<string, Statement> = {};

  interpret(ast: GLang): number {
    for (const stmt of ast) {
      if (stmt.type === "definition") {
        this.defs[stmt.name] = stmt;
      } else if (stmt.type === "expression") {
        return this.interpretExpression(stmt.expression, {});
      } else {
        throw new Error("Invalid AST");
      }
    }

    throw new Error("No expression found");
  }

  private interpretExpression(
    ast: Expression,
    assignments: Record<string, number>
  ): number {
    if (ast.type === "number") return ast.number;

    if (ast.type === "binaryOperator") {
      const left = this.interpretExpression(ast.left, assignments);
      const right = this.interpretExpression(ast.right, assignments);

      switch (ast.operator) {
        case "plus":
          return left + right;
        case "minus":
          return left - right;
        case "multi":
          return left * right;
        case "div":
          return left / right;
      }
    }

    if (ast.type === "call") {
      const statement = this.defs[ast.name];
      if (statement.type === "expression") {
        throw new Error("Expected function definition");
      }

      const newAssignments = { ...assignments };
      for (let i = 0; i < statement.arguments.length; i++) {
        newAssignments[statement.arguments[i]] = this.interpretExpression(
          ast.arguments[i],
          newAssignments
        );
      }

      return this.interpretExpression(statement.body, newAssignments);
    }
    if (ast.type === "variable") {
      return assignments[ast.variable];
    }

    throw new Error("Invalid AST");
  }
}

export default Interpreter;
