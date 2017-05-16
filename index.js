const fs = require ('fs');
const path = require ('path');
const sanitize = require ('sanitize-filename');
const {
  jsCreator,
  storyCreator,
  packageJSON,
  stylesCSS,
} = require ('./templates');

//check for arguments and log a message if none provided
if (process.argv.length < 3) {
  console.log ('You must provide a component name');
} else {
  const component = sanitize (process.argv[2]);

  const parentDir = process.argv.length > 3
    ? path.resolve (`${process.cwd ()}/${process.argv[3]}`)
    : path.resolve (`${__dirname}/../../src/app/components`);

  if (fs.existsSync (parentDir)) {
    const dir = `/${component}`;

    //check if directory exists and log a message if it does
    if (!fs.existsSync (dir)) {
      //create path if it doesn't exist'
      fs.mkdirSync (dir);

      //create files from templates
      fs.writeFileSync (`${dir}/${component}.js`, jsCreator (component));
      fs.writeFileSync (
        `${dir}/${component}.story.js`,
        storyCreator (component)
      );
      fs.writeFileSync (`${dir}/package.json`, packageJSON (component));
      fs.writeFileSync (`${dir}/style.css`, stylesCSS ());
    } else {
      console.log (`${dir} already exists.`);
    }
  } else {
    console.log (`${parentDir} does not exist.`);
  }
}
