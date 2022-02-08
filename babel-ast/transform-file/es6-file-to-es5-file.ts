import { parse } from "@babel/parser";
import * as babel from "@babel/core";
import * as fs from "fs";

const code = fs.readFileSync(__dirname + "/source-file.ts");
const codeString = code.toString();
const ast = parse(codeString, { sourceType: "module" });
const codeMap = babel.transformFromAstSync(ast, codeString, {
  presets: ["@babel/preset-env"],
});
fs.writeFileSync(__dirname + "/target-file.ts", codeMap.code);
