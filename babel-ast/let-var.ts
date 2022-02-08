import { parse } from "@babel/parser"; //parse把ES6代码转换成AST
import { traverse } from "@babel/core"; //traverse遍历AST进行修改
import generate from "@babel/generator"; //generate把AST转换成ES5代码

const code = `let string = 'string'; let number = 2;`;
const ast = parse(code, { sourceType: "module" });
traverse(ast, {
  enter: (item) => {
    if (item.node.type === "VariableDeclaration") {
      if (item.node.kind === "let") {
        item.node.kind = "var";
      }
    }
  },
});
const codeMap = generate(ast, {}, code);
console.log(codeMap.code);
