module.exports.jsCreator = component => {
  return `import React from 'react';
import styles from './style.css';
import classes from 'join-classnames';

export const ${component} = ({className}) => (
    <div className={classes(className, styles.default)}>
           
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

module.exports.viewJS = () => {
  return `import React from 'react';
import 'normalize.css';
import styles from './style.css';


export default () => (

    <div className={styles.view}>

    </div>
);
`;
};

module.exports.containerJS = component => {
  return `import React, {Component} from 'react';
import { connect } from 'react-redux';
import { setPageMeta } from '../actions/page-meta';
import LandingView from '../views/LandingView';

const pageMeta = {
  title: "...",
  tags: [
      {"name": "description", "content": "A React Starter"},
      {"property": "og:type", "content": "article"}
  ]
};

// takes values from the redux store and maps them to props
const mapStateToProps = state => ({
  //propName: state.data.specificData
});

// binds the result of action creators to redux dispatch, wrapped in callable functions
const bindActionsToDispatch = dispatch => ({
  setPageMeta: (meta) => { dispatch(setPageMeta(meta)) }
});

// takes the result of mapStateToProps as store, and bindActionsToDispatch as actions
// returns the final resulting props which will be passed to the component
const mergeAllProps = (store, actions) => ({
  ...store,
  init: () => actions.setPageMeta(pageMeta),
  //propName:data
});


const storeConnector = connect(
  mapStateToProps, 
  bindActionsToDispatch, 
  mergeAllProps
);



class ${component} extends Component {

  static onServer(props, store) {
    return store.dispatch(setPageMeta(pageMeta))
  }

  componentDidMount() {
    this.props.init();
  }

  render() {
    return <LandingView {...this.props} />
  }

}

export default storeConnector(${component});
`;
};
