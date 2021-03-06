react-component-inator
=========

  react-component-inator is a simple tool to build a react-component skeleton.  It was designed to compliment the [tuxsudo/react-starter](https://github.com/tuxsudo/react-starter) kit, but can be used for any react project.
  
  It accepts three arguments, in any order: the component name, the path where you want the component skeleton to be created, and the type of component (view, container, or component). The default type is a component. Component names are converted to PascalCase.  The path argument must be a relative path to the current working directory.  If the path argument is omitted, it will default to [project root]/src/app/[components|containers|views]/.  
  
  **Note:** 
  If the path provided does not exist, it will not work.
  You must be using Node version 6.x.x or higher for this module to work  

  The Skeleton assumes that you are using the @kadira/storybook module and creates *.storybook.js files needed for it.

## Installation

  npm install component-inator --save-dev

## Usage

```
componentinator [path=path/for/component] [type=view|component|container] ComponentName
```
## Example
```
"scripts":{
  "create:component":"componentinator path=/src/components",
  "create:view":"componentinator path=/src/components type=view",
  "create:containter":"componentinator type=container"
}
```

## Contributing

In lieu of a formal styleguide, please format your code using the 'prettier' formating tool prior to commit.

## Release History

* 1.0.0 Initial Stable Release
* 1.0.1-1.0.2 Minor bug fixes
* 1.1.0 Choose between a view or component
* 1.2.0 Container added as one of the types
* 1.2.1 Minor bug fixes 
* 1.3.0 Enforce best practise by requiring propercase in names
* 1.3.1-1.3.3 Minor bug fixes
* 1.4.0 Converts name provided to Pascal case
* 1.5.0 Update to Template to allow for more intuitive names
* 1.5.1-1.5.3 Minor bug fixes