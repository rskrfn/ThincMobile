import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import styles from './Style';
import {connect} from 'react-redux';
import {loginHandler} from '../../../redux/ActionCreators/auth';
import * as Animatable from 'react-native-animatable';
// import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Toast} from 'native-base';

// import CustomIcon from '../../components/customicon/icomoon';

function Login({navigation}) {
  const [data, setData] = useState({
    username: '',
    password: '',
    secureText: true,
  });

  const usernameHandler = username => {
    if (!username) {
      return;
    }
    setData({
      ...data,
      username: username,
    });
  };
  const passwordHandler = password => {
    if (!password || password.length < 8) {
      return;
    }
    setData({
      ...data,
      password: password,
    });
  };
  const updateSecureText = () => {
    setData({
      ...data,
      secureText: !data.secureText,
    });
  };
  let submitHandler = e => {
    e.preventDefault();
    const auth = {
      username: data.username,
      password: data.password,
    };
    if (!auth.email || !auth.password) {
      return Toast.show({
        text: 'Fill in your data',
      });
    }
  };

  // console.log('username', data.username);
  // console.log('password', data.password);

  return (
    <SafeAreaView fadeIn style={styles.container}>
      <ScrollView contentContainerstyle={styles.container}>
        <Animatable.View animation="fadeIn">
          <Text style={styles.header}>Login</Text>
          <View style={styles.inputGroup}>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Email or Username</Text>
              <TextInput
                style={styles.textInputUsername}
                autoCapitalize="none"
                onChangeText={username => {
                  usernameHandler(username);
                }}
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.textInputPassword}
                autoCapitalize="none"
                secureTextEntry={data.secureText ? true : false}
                onChangeText={password => {
                  passwordHandler(password);
                }}
              />
              <TouchableOpacity style={styles.eye} onPress={updateSecureText}>
                {data.secureText ? (
                  <MaterialIcons name="visibility" color="black" size={24} />
                ) : (
                  <MaterialIcons
                    name="visibility-off"
                    color="black"
                    size={24}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.input}>
              <TouchableOpacity style={styles.forgot}>
                <Text style={styles.forgottext}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.input}>
              <TouchableOpacity style={styles.btnlogin}>
                <Text style={styles.btntextlogin}>Login</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.input}>
              <TouchableOpacity style={styles.btngoogle}>
                <FontAwesome
                  name="google"
                  size={24}
                  style={styles.icongoogle}
                />
                <Text style={styles.btntextgoogle}>Login with Google</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animatable.View>
      </ScrollView>
    </SafeAreaView>
  );
}
// const mapStatetoProps = state => {
//   const {loginReducer} = state;
//   return {loginReducer};
// };

// const mapDispatchtoProps = dispatch => {
//   return {
//     onLoginHandler: data => {
//       dispatch(loginHandler(data));
//     },
//   };
// };

const connectedLogin = connect(null, null)(Login);
export default connectedLogin;
