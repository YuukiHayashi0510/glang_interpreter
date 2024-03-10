import { interpret } from "./src/interpret";
import { runLexer } from "./src/lexer";
import { runParse } from "./src/parser";

const arg = process.argv.findIndex((arg) => arg === "-e");
if (arg !== -1) {
  console.log(interpret(runParse(runLexer(process.argv[arg + 1]))));
} else {
  console.log(`Usage: bun run ${process.argv[1]} -e "expression"`);
}
