import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/screens/auth/Login';

const Router = () => {
  const {Navigator, Screen} = createStackNavigator();
  return (
    <NavigationContainer>
      <Navigator headerMode={'none'}>
        <Screen name="Login" component={Login} />
      </Navigator>
    </NavigationContainer>
  );
};

export default Router;
