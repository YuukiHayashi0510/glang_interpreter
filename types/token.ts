import type { UnionFromTypeArray } from "./utility";

export interface OperatorToken {
  type: "plus" | "minus" | "multi" | "div";
}

export interface NumberToken {
  type: "number";
  number: number;
}

interface ParenthesisToken {
  type: "lparen" | "rparen";
}

export interface VariableToken {
  type: "variable";
  variable: string;
}

interface AssignmentToken {
  type: "assignment";
}

interface FunctionToken {
  type: "def";
}

interface CommaToken {
  type: "comma";
}

interface EndToken {
  type: "semicolon";
}

export type Token = UnionFromTypeArray<
  [
    OperatorToken,
    NumberToken,
    ParenthesisToken,
    VariableToken,
    AssignmentToken,
    FunctionToken,
    CommaToken,
    EndToken
  ]
>;
