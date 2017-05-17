component-inator
=========

  Simple tool to build a react-component skeleton.  It accepts two arguments: The Component name and the path where you want the component skeleton to be created.  The second argument must be a relative path from the directory it is running in. 
  
  If the second argument is omitted, it will default to [project root]/src/app/components/ relative to the root directory of the project.  
  
  **Note:** if the path does not exit, it will not run.

  The Skeleton assumes that you are using the @kadira/storybook module and creates storybook.js files needed for it.

## Installation

  npm install component-inator --save-dev

## Usage

```
componentinator ComponentName [path=path/for/component]
```

## Contributing

In lieu of a formal styleguide, please format your code using the 'prettier' formating tool prior to commit.

## Release History

* 0.1.0 Unstable Release
* 2.0.0 Initial Stable Release
* 2.0.1 Improved argument 