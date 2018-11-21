import fs from "fs";
import path from "path";
import TemplateManager from "./src/template-manager";
let variables = {
  imageSrc: () => TemplateManager.embedSrc(path.join(__dirname, 'assets', 'bquate.jpg')),
  name: 'Jonathan Rdz.',
  githubHref: 'https://github.com/joneldiablo/',
  github: 'joneldiablo'
}
let template = new TemplateManager(path.join(__dirname, 'assets', 'businesscard.html'), variables);
template.render().then(t => {
  fs.writeFile(path.join(__dirname, 'assets', 'result.html'), t, (err) => {
    if (err) throw err;
    console.log('done');
    return process.exit(0);
  });
});