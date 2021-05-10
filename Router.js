import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
import Login from './src/screens/auth/login/Login';
import Register from './src/screens/auth/register/Register';

const Router = props => {
  // let init = async () => {
  //   // …do multiple async tasks
  // };

  useEffect(() => {}, []);
  console.log(props);
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={'none'}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStatetoProps = state => {
  return {
    loginReducer: state.loginReducer,
  };
};
const connectedRouter = connect(mapStatetoProps)(Router);
export default connectedRouter;
