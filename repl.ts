import Lexer from "./lexer.ts";

while (true) {
  console.clear();
  console.log("[Sussy Language]\n");
  const source = prompt(">");
  if (!source || source == "quit" || source == "q") {
    console.clear();
    break;
  }
  const lexer = new Lexer(source);
  const tokens = lexer.run();
  console.clear();
  console.log(tokens);
  prompt("?");
}
