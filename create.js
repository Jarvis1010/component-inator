const fs = require ('fs');
const {
  jsCreator,
  storyCreator,
  packageJSON,
  stylesCSS,
} = require ('./templates');

module.exports.createComponent = (dir, component) => {
  //make directory
  fs.mkdirSync (dir);

  //create files from templates
  fs.writeFileSync (`${dir}/${component}.js`, jsCreator (component));
  fs.writeFileSync (`${dir}/${component}.story.js`, storyCreator (component));
  fs.writeFileSync (`${dir}/package.json`, packageJSON (component));
  fs.writeFileSync (`${dir}/style.css`, stylesCSS ());
  console.log (`${component} successfully created at ${dir}`);
};