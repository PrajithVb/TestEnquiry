/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import store from './redux/store';
//import configureStore from './store/configureStore';

//const store = configureStore();

// const RNRedux = () => (
//   <Provider store={store}>
//     <App {...this.props} />
//   </Provider>
// );
// AppRegistry.registerComponent(appName, () => RNRedux);

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
AppRegistry.registerComponent(appName, () => RNRedux);
