import fs from "fs-extra";
import path from "path";
import TemplateManager from "./lib/template-manager";

const main = async () => {
  let data = {
    imageSrc: () => TemplateManager.embedSrc(path.join(__dirname, 'input/images', 'bquate.jpg')),
    name: 'Jonathan Rdz.',
    githubHref: 'https://github.com/joneldiablo/',
    github: 'joneldiablo'
  };
  let pathTemplate = path.join(__dirname, 'input', 'businesscard.html');
  let template = new TemplateManager(pathTemplate, data);
  let t = await template.render();
  await fs.writeFile(path.join(__dirname, 'output', 'handlebars.html'), t);

  let pathTemplate1 = path.join(__dirname, 'input', 'example-mjml.mjml');
  let t1 = await template.render(pathTemplate1);
  await fs.writeFile(path.join(__dirname, 'output', 'mjml.html'), t1);

  let pathTemplate2 = path.join(__dirname, 'input', 'example-mjml.pug');
  let t2 = await template.render(pathTemplate2);
  await fs.writeFile(path.join(__dirname, 'output', 'pug-mjml.html'), t2);
  //-----------
  console.log('done');
  process.exit(0);
}

main();