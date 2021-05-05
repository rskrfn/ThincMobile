import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screens/Home';

const Router = () => {
  const {Navigator, Screen} = createStackNavigator();
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="Home" component={Home} />
      </Navigator>
    </NavigationContainer>
  );
};

export default Router;
