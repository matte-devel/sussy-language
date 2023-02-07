export interface Token {
  typ: string;
  val: string;
}

export function token(typ: string, val: string): Token {
  return { typ: typ, val: val } as Token;
}
