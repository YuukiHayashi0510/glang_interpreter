import type { AST } from "../types/ast";
import type { Token } from "../types/token";

class Parser {
  private tokens: Token[];
  private position: number;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
    this.position = 0;
  }

  public runParse(): AST {
    return this.term2();
  }

  private getToken(): Token {
    if (this.position >= this.tokens.length)
      throw new Error("Unexpected end of input");

    return this.tokens[this.position];
  }

  private term2(): AST {
    let current = this.term1();

    while (this.position < this.tokens.length) {
      const token = this.getToken();
      if (token.type === "plus" || token.type === "minus") {
        this.position++;
        current = {
          type: "binaryOperator",
          operator: token.type,
          left: current,
          right: this.term1(),
        };
      } else break;
    }

    return current;
  }

  private term1(): AST {
    let current = this.term0();

    while (this.position < this.tokens.length) {
      const token = this.getToken();
      if (token.type === "multi" || token.type === "div") {
        this.position++;
        current = {
          type: "binaryOperator",
          operator: token.type,
          left: current,
          right: this.term0(),
        };
      } else break;
    }
    return current;
  }

  private term0(): AST {
    const token = this.getToken();
    if (token.type === "number") {
      this.position++;
      return { type: "number", value: token.number! };
    }

    if (token.type === "lparen") {
      this.position++;
      const exp = this.term2();
      if (this.tokens[this.position].type !== "rparen") {
        throw new Error("Expected )");
      }
      this.position++;
      return exp;
    }

    if (token.type === "minus") {
      this.position++;
      const num = this.expectNumber();

      return {
        type: "number",
        value: -num!,
      };
    }

    throw new Error("Expected number or '('");
  }

  private expectNumber(): AST {
    const token = this.getToken();
    if (token.type !== "number") throw new Error("Expected number");

    this.position++;
    return { type: "number", value: token.number! };
  }
}

export default Parser;
