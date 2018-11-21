"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _mustache = require("mustache");

var _mustache2 = _interopRequireDefault(_mustache);

var _lite = require("mime/lite");

var _lite2 = _interopRequireDefault(_lite);

var _htmlMinifier = require("html-minifier");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TemplateManager = function () {
  function TemplateManager(fileName, variables) {
    var encoding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'utf8';

    _classCallCheck(this, TemplateManager);

    var template = this;
    template.fileName = fileName;
    template.variables = variables;
    template.encoding = encoding;
    for (var key in template.variables) {
      if (typeof template.variables[key] === 'function') {
        (function () {
          var func = template.variables[key];
          template.variables[key] = function () {
            return func(template);
          };
        })();
      }
    }
  }

  _createClass(TemplateManager, [{
    key: "render",
    value: function render() {
      var _this = this;

      var tg = this;
      return new Promise(function (resolve, reject) {
        _fs2.default.readFile(_this.fileName, _this.encoding, function read(err, data) {
          if (err) {
            reject(err);
          } else {
            var _minify;

            var html = (0, _htmlMinifier.minify)(_mustache2.default.render(data, tg.variables), (_minify = {
              removeAttributeQuotes: true,
              collapseWhitespace: true
            }, _defineProperty(_minify, "collapseWhitespace", true), _defineProperty(_minify, "trimCustomFragments", true), _defineProperty(_minify, "minifyCSS", true), _defineProperty(_minify, "minifyJS", true), _minify));
            resolve(html);
          }
        });
      });
    }
  }, {
    key: "getLibrary",
    value: function getLibrary() {
      return _mustache2.default;
    }
  }], [{
    key: "embedSrc",
    value: function embedSrc(path) {
      // read binary data
      var bitmap = _fs2.default.readFileSync(path);
      var toreturn = "data:" + _lite2.default.getType(path) + ";base64," + new Buffer(bitmap).toString('base64');
      // convert binary data to base64 encoded string
      return toreturn;
    }
  }]);

  return TemplateManager;
}();

exports.default = TemplateManager;
module.exports = exports.default;
module.exports.default = exports.default;