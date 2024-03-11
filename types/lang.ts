import type { NumberToken, OperatorToken, VariableToken } from "./token";
import type { UnionFromTypeArray } from "./utility";

export type GLang = Statement[];

export type Statement = Definition | ExpressionStatement;

type Definition = {
  type: "definition";
  name: string;
  arguments: string[];
  body: Expression;
};

type ExpressionStatement = {
  type: "expression";
  expression: Expression;
};

export type Expression = UnionFromTypeArray<
  [NumberToken, VariableToken, BinaryOperator, Call]
>;

type BinaryOperator = {
  type: "binaryOperator";
  operator: OperatorToken["type"];
  left: Expression;
  right: Expression;
};

type Call = {
  type: "call";
  name: string;
  arguments: Expression[];
};
