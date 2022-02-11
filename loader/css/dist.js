var depRelation = [{
      key: "index.js", 
      deps: ["app.js","style.css"],
      code: function(require, module, exports){
        "use strict";

var _app = _interopRequireDefault(require("./app.js"));

require("./style.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

console.log(_app["default"].value);
      }
    },{
      key: "app.js", 
      deps: [],
      code: function(require, module, exports){
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var app = {
  value: 'app'
};
var _default = app;
exports["default"] = _default;
      }
    },{
      key: "style.css", 
      deps: [],
      code: function(require, module, exports){
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var css = "body {\r\n  background-color: blue;\r\n}\r\n";

if (document) {
  var style = document.createElement('style');
  style.innerHTML = css;
  document.head.append(style);
}

var _default = css;
exports["default"] = _default;
      }
    }];
var modules = {};
execute(depRelation[0].key)

  function execute(key) {
    if (modules[key]) { return modules[key] }
    var item = depRelation.find(i => i.key === key)
    if (!item) { throw new Error(`${item} is not found`) }
    var pathToKey = (path) => {
      var dirname = key.substring(0, key.lastIndexOf('/') + 1)
      var projectPath = (dirname + path).replace(/\.\//g, '').replace(/\/\//, '/')
      return projectPath
    }
    var require = (path) => {
      return execute(pathToKey(path))
    }
    modules[key] = { __esModule: true }
    var module = { exports: modules[key] }
    item.code(require, module, module.exports)
    return modules[key]
  }
  