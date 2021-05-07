import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/screens/auth/login/Login';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import storeWithPersistor from './src/redux/Store';

const Router = () => {
  const {Navigator, Screen} = createStackNavigator();
  return (
    <Provider store={storeWithPersistor.store}>
      <PersistGate loading={null} persistor={storeWithPersistor.persistor}>
        <NavigationContainer>
          <Navigator headerMode={'none'}>
            <Screen name="Login" component={Login} />
          </Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default Router;
