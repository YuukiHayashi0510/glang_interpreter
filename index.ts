import { interpret } from "./src/interpret";
import { runLexer } from "./src/lexer";
import Parser from "./src/parser";

const arg = process.argv.findIndex((arg) => arg === "-e");
if (arg !== -1) {
  const parser = new Parser(runLexer(process.argv[arg + 1]));
  console.log(interpret(parser.runParse()));
} else {
  console.log(`Usage: bun run ${process.argv[1]} -e "expression"`);
}
