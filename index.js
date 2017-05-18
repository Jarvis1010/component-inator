#!/usr/bin/env node
const fs = require ('fs');
const path = require ('path');
const sanitize = require ('sanitize-filename');
const {
  jsCreator,
  storyCreator,
  packageJSON,
  stylesCSS,
} = require ('./templates');

const defaults = {
  path: path.resolve (`${__dirname}/../../src/app/components`),
  type: 'component',
};

const options = process.argv.reduce ((object, value) => {
  let valueObj;
  if (value.indexOf ('=') > -1) {
    const option = value.split ('=');
    valueObj = {
      [option[0]]: option[0] == 'path'
        ? path.resolve (`${process.cwd ()}/${option[1]}`)
        : option[1],
    };
  } else {
    valueObj = {name: sanitize (value)};
  }
  return Object.assign ({}, object, valueObj);
}, defaults);

//check for arguments and log a message if none provided or if component name not provided
if (process.argv.length < 3 || !options.name) {
  console.log (
    'Usage: componentinator ComponentName [path=path/for/component]'
  );
  process.exit ();
}

const component = options.name;

if (fs.existsSync (options.path)) {
  const dir = `${options.path}/${options.name}`;

  //check if directory exists and log a message if it does
  if (!fs.existsSync (dir)) {
    //make directory
    fs.mkdirSync (dir);

    //create files from templates
    fs.writeFileSync (`${dir}/${options.name}.js`, jsCreator (options.name));
    fs.writeFileSync (
      `${dir}/${options.name}.story.js`,
      storyCreator (options.name)
    );
    fs.writeFileSync (`${dir}/package.json`, packageJSON (options.name));
    fs.writeFileSync (`${dir}/style.css`, stylesCSS ());
    console.log (`${options.name} successfully created at ${options.path}`);
  } else {
    console.log (`${dir} already exists.`);
  }
} else {
  console.log (`${options.path} does not exist.`);
}
