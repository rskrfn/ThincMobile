import React from 'react';
import {AppRegistry} from 'react-native';
import Router from './Router';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import storeWithPersistor from './src/redux/Store';
import {Root} from 'native-base';
import {SocketProvider} from './src/context/SocketProvider';

const RouterRedux = () => {
  return (
    <Root>
      <SocketProvider>
        <Provider store={storeWithPersistor.store}>
          <PersistGate loading={null} persistor={storeWithPersistor.persistor}>
            <Router />
          </PersistGate>
        </Provider>
      </SocketProvider>
    </Root>
  );
};

AppRegistry.registerComponent(appName, () => RouterRedux);
