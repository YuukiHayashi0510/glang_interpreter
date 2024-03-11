import Interpreter from "./src/interpret";
import { runLexer } from "./src/lexer";
import Parser from "./src/parser";

if (process.env.NODE_ENV === "test") process.exit(0);

const arg = process.argv.findIndex((arg) => arg === "-e");
if (arg !== -1) {
  const parser = new Parser(runLexer(process.argv[arg + 1]));
  const interpreter = new Interpreter();
  console.log(interpreter.interpret(parser.statements()));
} else {
  console.log(`Usage: bun run ${process.argv[1]} -e "expression"`);
}
