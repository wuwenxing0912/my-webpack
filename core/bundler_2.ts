import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import * as babel from "@babel/core";
import { readFileSync } from "fs";
import { resolve, relative, dirname } from "path";

// 设置根目录
const projectRoot = resolve(__dirname, "item");
// 类型声明
type DepRelation = { key: string; deps: string[]; code: string }[];
// 初始化一个空的 depRelation，用于收集依赖
const depRelation: DepRelation = []; // 数组！

// 将入口文件的绝对路径传入函数
collectCodeAndDeps(resolve(projectRoot, "index.js"));

console.log(depRelation);
console.log("done");

function collectCodeAndDeps(filepath: string) {
  const key = getProjectPath(filepath); // 文件的项目路径，如 index.js
  // 获取文件内容，将内容放至 depRelation
  if (depRelation.find((i) => i.key === key)) return;
  const code = readFileSync(filepath).toString();
  const { code: es5Code } = babel.transform(code, {
    presets: ["@babel/preset-env"],
  });
  // 初始化 depRelation[key]
  const item = { key, deps: [], code: es5Code };
  depRelation.push(item);
  // 将代码转为 AST
  const ast = parse(code, { sourceType: "module" });
  // 分析文件依赖，将内容放至 depRelation
  traverse(ast, {
    enter: (path) => {
      if (path.node.type === "ImportDeclaration") {
        // path.node.source.value 往往是一个相对路径，如 ./a.js，需要先把它转为一个绝对路径
        const depAbsolutePath = resolve(
          dirname(filepath),
          path.node.source.value
        );
        // 然后转为项目路径
        const depProjectPath = getProjectPath(depAbsolutePath);
        // 把依赖写进 depRelation
        item.deps.push(depProjectPath);
        collectCodeAndDeps(depAbsolutePath);
      }
    },
  });
}
// 获取文件相对于根目录的相对路径
function getProjectPath(path: string) {
  return relative(projectRoot, path).replace(/\\/g, "/");
}
