import type { Expression, GLang, Statement } from "../types/lang";
import type { Token } from "../types/token";

class Parser {
  private tokens: Token[];
  private position: number;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
    this.position = 0;
  }

  statements = (): GLang => {
    const stmts: GLang = [];
    while (this.position < this.tokens.length) {
      stmts.push(this.statement());

      if (this.position < this.tokens.length) {
        this.expect("semicolon");
      }
    }
    return stmts;
  };

  private statement = (): Statement => {
    const token = this.getToken();
    if (token.type === "def") {
      return this.definition();
    }

    const expr = this.expression();
    return { type: "expression", expression: expr };
  };

  private definition = (): Statement => {
    this.expect("def");

    const name = this.expectVariable();
    this.expect("lparen");
    const arg = this.expectVariable();
    this.expect("rparen");

    this.expect("assignment");

    const body = this.expression();

    return { type: "definition", name, arguments: [arg], body };
  };

  private expression = (): Expression => {
    return this.term2();
  };

  private term2(): Expression {
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

  private term1(): Expression {
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

  private term0(): Expression {
    const token = this.getToken();
    if (token.type === "number") {
      this.position++;
      return { type: "number", number: token.number! };
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

    if (token.type === "variable") {
      this.position++;

      if (
        this.position < this.tokens.length &&
        this.tokens[this.position].type === "lparen"
      ) {
        this.position++;
        const args = [];

        while (this.getToken().type !== "rparen") {
          args.push(this.expression());

          const nextToken = this.getToken();
          if (nextToken.type === "comma") {
            this.position++;
          } else break;
        }

        this.expect("rparen");
        return {
          type: "call",
          name: token.variable!,
          arguments: args,
        };
      } else {
        return {
          type: "variable",
          variable: token.variable!,
        };
      }
    }

    if (token.type === "minus") {
      this.position++;
      const num = this.expectNumber();

      return {
        type: "number",
        number: -num!,
      };
    }

    throw new Error("Expected expression");
  }

  private getToken(): Token {
    if (this.position >= this.tokens.length)
      throw new Error("Unexpected end of input");

    return this.tokens[this.position];
  }

  private expect = (type: Token["type"]): Token => {
    const token = this.getToken();
    if (token.type !== type) {
      throw new Error(`Expected ${type}`);
    }
    this.position++;
    return token;
  };

  private expectNumber(): Expression {
    const token = this.getToken();
    if (token.type !== "number") throw new Error("Expected number");

    this.position++;
    return { type: "number", number: token.number! };
  }

  private expectVariable = (): string => {
    const token = this.getToken();
    if (token.type !== "variable") {
      throw new Error("Expected variable");
    }
    this.position++;
    return token.variable!;
  };
}

export default Parser;
