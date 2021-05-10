import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import storeWithPersistor from './src/redux/Store';
import {Root} from 'native-base';
// import RNBootSplash from 'react-native-bootsplash';

const RouterRedux = () => {
  // React.useEffect(() => {
  //   RNBootSplash.hide({fade: true});
  // }, []);
  return (
    <Root>
      <Provider store={storeWithPersistor.store}>
        <PersistGate loading={null} persistor={storeWithPersistor.persistor}>
          <App />
        </PersistGate>
      </Provider>
    </Root>
  );
};

AppRegistry.registerComponent(appName, () => RouterRedux);
