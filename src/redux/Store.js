import {createStore, combineReducers, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './Root';

const store = createStore(rootReducer, composeWithDevTools());
const persistor = persistStore(store);

const storeWithPersistor = {store, persistor};

export default storeWithPersistor;
