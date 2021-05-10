import {createStore, applyMiddleware, compose} from 'redux';
import {persistStore} from 'redux-persist';
import ReduxThunk from 'redux-thunk';
import rootReducer from './Root';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let enhancers = composeEnhancers(applyMiddleware(ReduxThunk));

if (process.env.NODE_ENV !== 'development') {
  enhancers = applyMiddleware(ReduxThunk);
}

const store = createStore(rootReducer, enhancers);
const persistor = persistStore(store);

const storeWithPersistor = {store, persistor};

export default storeWithPersistor;
