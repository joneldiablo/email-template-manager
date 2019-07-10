import fs from "fs-extra";
import Handlebars from "handlebars";
import mime from 'mime/lite';
import mjml2html from "mjml";
import pug from "pug";
import isValidPath from "is-valid-path";
import path from "path";
import {
  minify
} from 'html-minifier';
import { version } from "../package.json";

export default class TemplateManager {

  /**
   * 
   * @param {*} filePath 
   * @param {*} data 
   * @param {*} encoding 
   */
  constructor(filePath, data, encoding = 'utf8') {
    let tm = this;
    tm.filePath = filePath;
    tm.data = data;
    tm.encoding = encoding;
    for (const key in tm.data) {
      if (typeof tm.data[key] === 'function') {
        let func = tm.data[key];
        tm.data[key] = () => func(tm);
      }
    }
  }

  /**
   * 
   * @param {*} filePath 
   */
  static embedSrc(filePath) {
    // read binary data
    var bitmap = fs.readFileSync(filePath);
    var toreturn = "data:" + mime.getType(filePath) + ";base64," + new Buffer(bitmap).toString('base64')
    // convert binary data to base64 encoded string
    return toreturn;
  }

  /**
   * 
   * @param {*} filePath 
   * @param {*} encoding 
   */
  readFile(filePath = this.filePath, encoding = this.encoding) {
    if (!isValidPath(filePath))
      return filePath;
    return fs.readFile(filePath, encoding)
      .catch(e => {
        console.error(e);
        return '';
      });
  }

  /**
   * 
   * @param {*} filePath 
   * @param {*} data 
   * @param {*} encoding 
   */
  async handlebars(filePath = this.filePath, data = this.data, encoding = this.encoding) {
    const tm = this;
    let templateContent = await tm.readFile(filePath, encoding);
    let compile = Handlebars.compile(templateContent);
    let html = minify(compile(data), {
      removeAttributeQuotes: true,
      collapseWhitespace: true,
      trimCustomFragments: true,
      minifyCSS: true,
      minifyJS: true
    });
    return html;
  }

  /**
   * 
   * @param {*} filePath 
   * @param {*} encoding 
   */
  async mjml(filePath = this.filePath, encoding = this.encoding) {
    let template = await this.readFile(filePath, encoding);
    let r = mjml2html(template);
    if (r.erros) {
      console.log(r.errors);
    }
    return r.html;
  }

  /**
   * 
   * @param {*} [data] 
   * @param {*} [filePath] 
   */
  async pug(filePath = this.filePath, data = this.data, encoding = this.encoding) {
    let template = await this.readFile(filePath, encoding);
    return pug.render(template, data);
  }

  async render(filePath = this.filePath, data = this.data, encoding = this.encoding) {
    switch (path.extname(filePath)) {
      case '.pug':
        let t = await this.pug(filePath, data);
        return this.mjml(t);
      case '.mjml':
        return this.mjml(filePath);
      default:
        return this.handlebars(filePath, data, encoding);
    }
  }

  /**
   * 
   */
  get version() {
    return version
  }

}