"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a},_createClass=function(){function a(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),_fsExtra=require("fs-extra"),_fsExtra2=_interopRequireDefault(_fsExtra),_handlebars=require("handlebars"),_handlebars2=_interopRequireDefault(_handlebars),_lite=require("mime/lite"),_lite2=_interopRequireDefault(_lite),_mjml=require("mjml"),_mjml2=_interopRequireDefault(_mjml),_pug2=require("pug"),_pug3=_interopRequireDefault(_pug2),_isValidPath=require("is-valid-path"),_isValidPath2=_interopRequireDefault(_isValidPath),_path=require("path"),_path2=_interopRequireDefault(_path),_htmlMinifier=require("html-minifier"),_package=require("../package.json");function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var TemplateManager=function(){/**
   * 
   * @param {*} filePath 
   * @param {*} data 
   * @param {*} encoding 
   */function a(b,c){var d=2<arguments.length&&void 0!==arguments[2]?arguments[2]:"utf8";_classCallCheck(this,a);var e=this;for(var f in e.filePath=b,e.data=c,e.encoding=d,e.data)"function"==typeof e.data[f]&&function(){var a=e.data[f];e.data[f]=function(){return a(e)}}()}/**
   * 
   * @param {*} filePath 
   */return _createClass(a,[{key:"readFile",/**
   * 
   * @param {*} filePath 
   * @param {*} encoding 
   */value:function c(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:this.filePath,b=1<arguments.length&&void 0!==arguments[1]?arguments[1]:this.encoding;return(0,_isValidPath2.default)(a)?_fsExtra2.default.readFile(a,b).catch(function(a){return console.error(a),""}):a}/**
   * 
   * @param {*} filePath 
   * @param {*} data 
   * @param {*} encoding 
   */},{key:"handlebars",value:async function h(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:this.filePath,b=1<arguments.length&&void 0!==arguments[1]?arguments[1]:this.data,c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:this.encoding,d=this,e=await d.readFile(a,c),f=_handlebars2.default.compile(e),g=(0,_htmlMinifier.minify)(f(b),{removeAttributeQuotes:!0,collapseWhitespace:!0,trimCustomFragments:!0,minifyCSS:!0,minifyJS:!0});return g}/**
   * 
   * @param {*} filePath 
   * @param {*} encoding 
   */},{key:"mjml",value:async function e(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:this.filePath,b=1<arguments.length&&void 0!==arguments[1]?arguments[1]:this.encoding,c=await this.readFile(a,b),d=(0,_mjml2.default)(c);return d.erros&&console.log(d.errors),d.html}/**
   * 
   * @param {*} [data] 
   * @param {*} [filePath] 
   */},{key:"pug",value:async function e(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:this.filePath,b=1<arguments.length&&void 0!==arguments[1]?arguments[1]:this.data,c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:this.encoding,d=await this.readFile(a,c);return _pug3.default.render(d,_extends({},b,{filename:a}))}},{key:"render",value:async function d(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:this.filePath,b=1<arguments.length&&void 0!==arguments[1]?arguments[1]:this.data,c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:this.encoding;switch(_path2.default.extname(a)){case".pug":var e=await this.pug(a,b);return this.mjml(e);case".mjml":return this.mjml(a);default:return this.handlebars(a,b,c);}}/**
   * 
   */},{key:"version",get:function a(){return _package.version}}],[{key:"embedSrc",value:function d(a){// read binary data
var b=_fsExtra2.default.readFileSync(a),c="data:"+_lite2.default.getType(a)+";base64,"+new Buffer(b).toString("base64");// convert binary data to base64 encoded string
return c}}]),a}();exports.default=TemplateManager,module.exports=exports.default,module.exports.default=exports.default;
//# sourceMappingURL=template-manager.js.map