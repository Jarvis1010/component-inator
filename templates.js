module.exports.jsCreator = component => {
  return `import React from 'react';
import styles from './style.css';
import classes from 'join-classnames';

export const ${component} = ({className}) => (
    <div className={className}>
           
    </div>
);


export default ${component};
`;
};

module.exports.storyCreator = component => {
  return `import {storiesOf, action} from '@kadira/storybook';
import ${component} from './${component}';

storiesOf ('${component}', module)
  .add ('default', () => <${component} />)
`;
};

module.exports.packageJSON = component => {
  return `{
  "main": "${component}.js"
}
`;
};

module.exports.stylesCSS = () => {
  return `@import '../../variables.css';

.default{

}
`;
};
