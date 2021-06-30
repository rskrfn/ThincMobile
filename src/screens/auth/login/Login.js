/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {View, Text, TouchableOpacity, TextInput, Image} from 'react-native';
import styles from './Style';
import {connect} from 'react-redux';
import {loginAction} from '../../../redux/Action/auth';
import * as Animatable from 'react-native-animatable';
// import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Toast} from 'native-base';
import {API_URL} from '@env';
import {passwordValidation} from '../../../services/validation/inputValidation';

function Login(props) {
  const [data, setData] = useState({
    username: '',
    password: '',
  });
  const [eye, setEye] = useState({
    secureText: true,
  });
  const updateSecureText = () => {
    setEye({
      ...eye,
      secureText: !eye.secureText,
    });
  };
  const [warning, setWarning] = useState({
    passwordwarning: '',
  });
  // const [registerToken, setRegisterToken] = useState('');
  // const [fcmRegistered, setFcmRegistered] = useState(false);

  // const onRegister = token => {
  //   setRegisterToken(token.token);
  //   setFcmRegistered(true);
  // };

  // const onNotif = notif => {
  //   Alert.alert(notif.title, notif.message);
  // };

  // const notif = new NotifService(onRegister, onNotif);

  // const handlePerm = perms => {
  //   Alert.alert('Permissions', JSON.stringify(perms));
  // };

  let submitHandler = e => {
    if (!data.username || !data.password) {
      return Toast.show({
        text: 'Fill in your data',
        type: 'warning',
        textStyle: {textAlign: 'center'},
        duration: 3000,
      });
    }
    if (warning.passwordwarning) {
      return Toast.show({
        text: warning.passwordwarning,
        type: 'warning',
        textStyle: {textAlign: 'center'},
        duration: 3000,
      });
    } else {
      // console.log(props);
      //  notif.localNotif();
      props.onLoginHandler(data);
    }
  };
  const ref = useRef();
  useEffect(() => {
    if (!ref.current) {
      ref.current = true;
    } else {
      if (
        props.loginReducer.err?.data?.message === 'Incorrect Email or Password'
      ) {
        setData({...data, username: '', password: ''});
        return Toast.show({
          text: 'Incorrect Email or Password',
          type: 'danger',
          textStyle: {textAlign: 'center'},
        });
      }
      if (props.loginReducer.err?.data?.message === 'Network Error') {
        return Toast.show({
          text: 'Network Error',
          type: 'danger',
          textStyle: {textAlign: 'center'},
        });
      }
    }
  }, [props.loginReducer.err]);

  // console.log(warning);
  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeIn" style={styles.content}>
        <Text style={styles.header}>Login</Text>
        <View style={styles.inputGroup}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email or Username</Text>
            <TextInput
              style={styles.textInputUsername}
              autoCapitalize="none"
              value={data.username}
              onChangeText={username => {
                setData({
                  ...data,
                  username: username,
                });
              }}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.textInputPassword}
              autoCapitalize="none"
              value={data.password}
              secureTextEntry={eye.secureText ? true : false}
              onChangeText={value => {
                setWarning({...warning, passwordwarning: ''});
                setData({
                  ...data,
                  password: value,
                });
                setWarning({
                  ...warning,
                  passwordwarning: passwordValidation(value),
                });
              }}
            />
            <TouchableOpacity style={styles.eye} onPress={updateSecureText}>
              {eye.secureText ? (
                <MaterialIcons name="visibility" color="black" size={24} />
              ) : (
                <MaterialIcons name="visibility-off" color="black" size={24} />
              )}
            </TouchableOpacity>
          </View>
          {warning.passwordwarning ? (
            <Text style={styles.inputwarning}>{warning.passwordwarning}</Text>
          ) : (
            <View style={{marginBottom: '5%'}} />
          )}
          <View style={styles.forgot}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('SendEmail');
              }}>
              <Text style={styles.forgottext}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.input}>
            <TouchableOpacity style={styles.btnlogin} onPress={submitHandler}>
              <Text style={styles.btntextlogin}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.input}>
            <TouchableOpacity
              style={styles.btngoogle}
              onPress={() => {
                console.log(API_URL);
              }}>
              <Image
                style={styles.googleicon}
                source={require('../../../assets/icons/icon_google.png')}
              />
              <Text style={styles.btntextgoogle}>Login with Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animatable.View>
      <View style={styles.register}>
        <Text style={styles.newusertext}>New user?</Text>
        <Text
          style={styles.registertext}
          onPress={() => props.navigation.navigate('Register')}>
          Register
        </Text>
      </View>
    </View>
  );
}
const mapStatetoProps = state => {
  return {
    loginReducer: state.loginReducers,
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    onLoginHandler: data => {
      dispatch(loginAction(data));
    },
  };
};

const connectedLogin = connect(mapStatetoProps, mapDispatchtoProps)(Login);
export default connectedLogin;
