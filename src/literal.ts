const numberLiteralExp = /^\-?\d+(\.\d+)?/;

export class LiteralConsumeHelper {
  static consumeNumberLiteral = (t: string): string =>
    t.match(numberLiteralExp)?.[0] ?? "";
}

export class LiteralHelper {
  static isBlank = (t: string): boolean => t.trim() === "";
}
