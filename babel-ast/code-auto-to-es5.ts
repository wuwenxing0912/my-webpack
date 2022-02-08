import { parse } from "@babel/parser";
import * as babel from "@babel/core";

const code = `let string = 'string'; const number = 1; const fn = (a, b)=> a + b`;
const ast = parse(code, { sourceType: "module" });
const codeMap = babel.transformFromAstSync(ast, code, {
  presets: ["@babel/preset-env"],
});
console.log(codeMap.code);
