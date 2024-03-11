import type { Token } from "../types/token";
import { LiteralConsumeHelper, LiteralHelper } from "./literal";

export class Lexer {
  private input: string;
  private tokens: Token[];

  constructor(input: string) {
    this.input = input;
    this.tokens = [];
  }

  run(): Token[] {
    let position = 0;

    while (position < this.input.length) {
      if (
        LiteralHelper.isBlank(this.input[position]) ||
        LiteralHelper.isNextLine(this.input[position])
      ) {
        position++;
        continue;
      }

      const numberStr = LiteralConsumeHelper.consumeNumberLiteral(
        this.input.slice(position)
      );
      if (numberStr) {
        this.tokens.push({ type: "number", number: parseFloat(numberStr) });
        position += numberStr.length;
        continue;
      }

      if (this.input.slice(position, position + 3) === "def") {
        this.tokens.push({ type: "def" });
        position += 3;
        continue;
      }

      const variableStr = LiteralConsumeHelper.consumeVariable(
        this.input.slice(position)
      );
      if (variableStr) {
        this.tokens.push({ type: "variable", variable: variableStr });
        position += variableStr.length;
        continue;
      }

      // 演算子の処理
      try {
        position = this.handleOperator(position);
        continue;
      } catch (error) {
        throw error;
      }
    }

    return this.tokens;
  }

  private handleOperator(position: number): number {
    switch (this.input[position]) {
      case "+":
        this.tokens.push({ type: "plus" });
        position++;
        break;
      case "-":
        this.tokens.push({ type: "minus" });
        position++;
        break;
      case "*":
        this.tokens.push({ type: "multi" });
        position++;
        break;
      case "/":
        this.tokens.push({ type: "div" });
        position++;
        break;
      case "(":
        this.tokens.push({ type: "lparen" });
        position++;
        break;
      case ")":
        this.tokens.push({ type: "rparen" });
        position++;
        break;
      case ";":
        this.tokens.push({ type: "semicolon" });
        position++;
        break;
      case ",":
        this.tokens.push({ type: "comma" });
        position++;
        break;
      case ":":
        if (this.input[position + 1] === "=") {
          this.tokens.push({ type: "assignment" });
          position += 2;
        }
        break;
      default:
        throw new Error(`Invalid character: ${this.input[position]}`);
    }
    return position;
  }
}

export default Lexer;
