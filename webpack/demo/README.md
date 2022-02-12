```
一、入口文件
EntryPlugin.createDependency(开始创建依赖)
---> this.hooks.addEntry.call(添加入口)

二、创建depRelation
---> this.addModuleChain(创建依赖链)
---> this.handleModuleCreation(处理模块创建)
---> this.moduleGraph(收集依赖模块)
---> this.factorizeModule(对模块进行处理, 包括创建模块、添加模块、build模块)
---> this.addModule(判断是否存在，不存在就存入)
---> this.buildModule

三、得到 sourceCode 且根据 sourceCode 生成 AST
---> module.build
---> build(NormalModule中的定义的方法，定义source、AST)
---> this.doBuild(调用回调函数this.parser.parse(引入第三方库acorn) 得到AST)
---> runLoaders(执行Loader)
---> processResult(处理css等，得到source code)

四、traverse AST 寻找 import
---> blockPreWalkStatements(遍历语句)
---> blockPreWalkStatement(对于不同的声明，调用不同的方法)

五、写入一个文件(当代码需要异步加载某个文件时，那么就要存在main.js和这个已经处理过的文件chunk)
---> emitAssets
---> emitFiles(compilation.getAssets 得到要写入的文件)
---> getContent(Compiler中的，得到文件内容)
---> doWrite(写文件)


整个过程：
1、使用 JavascriptParser 对 index.js 进行 parse 得到 ast，然后遍历 ast
2、发现依赖声明就将其添加到 module 的 dependencies 或 blocks 中
3、seal 阶段，webpack 将 module 转为 chunk，可能会把多个 module 通过 codeGeneration 合并为一个 chunk
4、seal 之后，为每个 chunk 创建文件，并写到硬盘上

```
