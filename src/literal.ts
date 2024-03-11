const numberLiteralExp = /^\-?\d+(\.\d+)?/;
const variableExp = /^[a-zA-Z_][a-zA-Z0-9_]*/;

export class LiteralConsumeHelper {
  static consumeNumberLiteral = (t: string): string =>
    t.match(numberLiteralExp)?.[0] ?? "";

  static consumeVariable = (t: string): string =>
    t.match(variableExp)?.[0] ?? "";
}

export class LiteralHelper {
  static isBlank = (t: string): boolean => t.trim() === "";

  static isNextLine = (t: string): boolean => t.startsWith("\n");
}
