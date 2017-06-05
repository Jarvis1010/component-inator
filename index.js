#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const sanitize = require('sanitize-filename');
const { createComponent, createView, createContainer } = require('./create');

const defaultPaths = {
  component: path.resolve(`${__dirname}/../../src/app/components`),
  view: path.resolve(`${__dirname}/../../src/app/views`),
  container: path.resolve(`${__dirname}/../../src/app/containers`),
};

const runTypes = {
  component: createComponent,
  view: createView,
  container: createContainer,
};

const options = process.argv.reduce(
  (object, value) => {
    let valueObj;
    if (value.indexOf('=') > -1) {
      const option = value.split('=');
      valueObj = {
        [option[0]]: option[0] == 'path'
          ? path.resolve(`${process.cwd()}/${option[1]}`)
          : option[1],
      };
    } else {
      const name = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      valueObj = { name: sanitize(name) };
    }
    return Object.assign({}, object, valueObj);
  },
  { type: 'component' },
);

//add default path if none provided
options.path = options.path ? options.path : defaultPaths[options.type];

//check for arguments and log a message if none provided
if (process.argv.length < 3 || !options.name || !options.path) {
  console.log(
    'Usage: componentinator ComponentName [path=path/for/component] [type=component|view|container]',
  );
  process.exit();
}

if (fs.existsSync(options.path)) {
  const dir = `${options.path}/${options.name}`;
  //check if directory exists and log a message if it does
  if (!fs.existsSync(dir)) {
    runTypes[options.type](dir, options.name);
  } else {
    console.log(`${dir} already exists.`);
  }
} else {
  console.log(`${options.path} does not exist.`);
}
