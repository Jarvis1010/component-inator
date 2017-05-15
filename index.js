const fs = require ('fs');
const {
  jsCreator,
  storyCreator,
  packageJSON,
  stylesCSS,
} = require ('./templates');

const component = process.argv[2];

const dir =
  process.argv[3] || `${__dirname}/../../src/app/components/${component}`;

if (!fs.existsSync (dir)) {
  fs.mkdirSync (dir);
  fs.writeFileSync (`${dir}/${component}.js`, jsCreator (component));
  fs.writeFileSync (`${dir}/${component}.story.js`, storyCreator (component));
  fs.writeFileSync (`${dir}/package.json`, packageJSON (component));
  fs.writeFileSync (`${dir}/style.css`, stylesCSS ());
} else {
  console.log (`${dir} already exists.`);
}
