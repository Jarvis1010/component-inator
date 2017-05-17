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

//check for arguments and log a message if none provided
if (process.argv.length < 3) {
  console.log (
    'Usage: componentinator ComponentName [path=path/for/component]'
  );
  process.exit (-1);
}

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

const component = options.name;

if (fs.existsSync (options.path)) {
  const dir = `${options.path}/${component}`;

  //check if directory exists and log a message if it does
  if (!fs.existsSync (dir)) {
    fs.mkdirSync (dir);

    //create files from templates
    fs.writeFileSync (`${dir}/${component}.js`, jsCreator (component));
    fs.writeFileSync (`${dir}/${component}.story.js`, storyCreator (component));
    fs.writeFileSync (`${dir}/package.json`, packageJSON (component));
    fs.writeFileSync (`${dir}/style.css`, stylesCSS ());
  } else {
    console.log (`${dir} already exists.`);
  }
} else {
  console.log (`${parentDir} does not exist.`);
}
