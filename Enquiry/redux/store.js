import {createStore} from 'redux';
import itemReducer from './enqApp';

const store = createStore(itemReducer);

export default store;
