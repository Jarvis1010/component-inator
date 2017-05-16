const fs = require ('fs');
const path = require ('path');
const {
  jsCreator,
  storyCreator,
  packageJSON,
  stylesCSS,
} = require ('./templates');
if (process.argv.length < 3) {
  console.log ('You must provide a component name');
} else {
  const component = process.argv[2];

  const dir = process.argv.length > 3
    ? path.resolve (`${process.cwd ()}/${process.argv[3]}/${component}`)
    : path.resolve (`${__dirname}/../../src/app/components/${component}`);

  //check if directory exists
  if (!fs.existsSync (dir)) {
    //create path if it doesn't exist'
    dir.split ('/').reduce ((path, folder) => {
      path += folder + '/';
      if (!fs.existsSync (path)) {
        fs.mkdirSync (path);
      }
      return path;
    }, '');

    //create files from templates
    fs.writeFileSync (`${dir}/${component}.js`, jsCreator (component));
    fs.writeFileSync (`${dir}/${component}.story.js`, storyCreator (component));
    fs.writeFileSync (`${dir}/package.json`, packageJSON (component));
    fs.writeFileSync (`${dir}/style.css`, stylesCSS ());
  } else {
    console.log (`${dir} already exists.`);
  }
}
