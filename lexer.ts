import { Token, token } from "./token.ts";

export default class Lexer {
  private source: Array<string>;
  private tokens: Array<Token>;
  private curren: string | null;
  private counte: number;
  private string: string;
  private buffer: string;
  private quotes: boolean;

  constructor(source: string) {
    this.source = source.split("");
    this.tokens = new Array<Token>();
    this.curren = null;
    this.counte = -1;
    this.string = "";
    this.buffer = "";
    this.quotes = false;
    this.advance();
  }

  private advance(): void {
    this.counte++;
    if (this.source.length > this.counte) {
      this.curren = this.source[this.counte];
    } else {
      this.curren = null;
    }
  }

  private flushBuffer(): void {
    if (this.buffer.length > 0) {
      if (this.isNumber(this.buffer)) {
        this.tokens.push(token("num", this.buffer.toString()));
      } else if (this.isKeyword(this.buffer)) {
        this.tokens.push(token("key", this.buffer.toString()));
      } else {
        this.tokens.push(token("ide", this.buffer.toString()));
      }
    }
    this.buffer = "";
  }

  private flushString(): void {
    if (this.string.length > 0) {
      this.tokens.push(token("str", this.string.toString()));
    }
    this.string = "";
  }

  private isNumber(contents: string): boolean {
    const c = contents.charCodeAt(0);
    const bounds = ["0".charCodeAt(0), "9".charCodeAt(0)];
    return c >= bounds[0] && c <= bounds[1];
  }

  private isKeyword(contents: string): boolean {
    if (contents === "print") {
      return true;
    } else {
      return false;
    }
  }

  private isOperation(contents: string): boolean {
    if (contents === "+") {
      return true;
    } else if (contents === "-") {
      return true;
    } else if (contents === "*") {
      return true;
    } else if (contents === "/") {
      return true;
    } else {
      return false;
    }
  }

  private isSymbol(contents: string): boolean {
    if (contents === "(") {
      return true;
    } else if (contents === ")") {
      return true;
    } else if (contents === "{") {
      return true;
    } else if (contents === "}") {
      return true;
    } else if (contents === "[") {
      return true;
    } else if (contents === "]") {
      return true;
    } else if (contents === ",") {
      return true;
    } else if (contents === "?") {
      return true;
    } else if (contents === ";") {
      return true;
    } else if (contents === ".") {
      return true;
    } else if (contents === ":") {
      return true;
    } else if (contents === "!") {
      return true;
    } else {
      return false;
    }
  }

  private isWhitespace(contents: string): boolean {
    if (contents === " ") {
      return true;
    } else if (contents === "\n") {
      return true;
    } else if (contents === "\t") {
      return true;
    } else {
      return false;
    }
  }

  public run(): Token[] {
    while (this.curren !== null) {
      if (this.curren === '"' && this.quotes === false) {
        this.flushBuffer();
        this.quotes = true;
        this.advance();
      } else if (this.curren === '"' && this.quotes === true) {
        this.flushString();
        this.quotes = false;
        this.advance();
      } else if (this.curren !== '"' && this.quotes === true) {
        this.string += this.curren;
        this.advance();
      } else if (this.curren !== '"' && this.quotes === false) {
        if (this.isWhitespace(this.curren)) {
          this.flushBuffer();
          this.advance();
        } else if (this.isOperation(this.curren)) {
          this.flushBuffer();
          this.tokens.push(token("ope", this.curren));
          this.advance();
        } else if (this.isSymbol(this.curren)) {
          this.flushBuffer();
          this.tokens.push(token("spe", this.curren));
          this.advance();
        } else {
          this.buffer += this.curren;
          this.advance();
        }
      }
    }
    this.flushString();
    this.flushBuffer();
    this.tokens.push(token("spe", "EOF"));
    return this.tokens;
  }
}
