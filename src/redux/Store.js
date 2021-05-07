import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';
import rpm from 'redux-promise-middleware';
import loginReducers from './Reducers/login';
import registerReducers from './Reducers/register';

const logger = createLogger();
const devtools = composeWithDevTools(applyMiddleware(rpm, logger));
// const enhancers = applyMiddleware(rpm, logger);
const reducers = combineReducers({
  loginReducers,
  registerReducers,
});
const reduxStore = createStore(reducers, devtools);

export default reduxStore;
