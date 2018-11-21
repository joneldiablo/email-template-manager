import fs from "fs";
import Mustache from "mustache";
import mime from 'mime/lite';
import {
  minify
} from 'html-minifier';

export default class TemplateManager {
  constructor(fileName, variables, encoding = 'utf8') {
    let template = this;
    template.fileName = fileName;
    template.variables = variables;
    template.encoding = encoding;
    for (const key in template.variables) {
      if (typeof template.variables[key] === 'function') {
        let func = template.variables[key];
        template.variables[key] = () => func(template);
      }
    }
  }
  static embedSrc(path) {
    // read binary data
    var bitmap = fs.readFileSync(path);
    var toreturn = "data:" + mime.getType(path) + ";base64," + new Buffer(bitmap).toString('base64')
    // convert binary data to base64 encoded string
    return toreturn;
  }
  render() {
    const tg = this;
    return new Promise((resolve, reject) => {
      fs.readFile(this.fileName, this.encoding, function read(err, data) {
        if (err) {
          reject(err);
        } else {
          let html = minify(Mustache.render(data, tg.variables), {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            collapseWhitespace: true,
            trimCustomFragments: true,
            minifyCSS: true,
            minifyJS: true
          });
          resolve(html);
        }
      });
    });
  }
  getLibrary() {
    return Mustache;
  }
}