import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import classes from './Style';
import * as Animatable from 'react-native-animatable';
// import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Toast} from 'native-base';
import axios from 'axios';

const Register = props => {
  const [data, setData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    repeat: '',
    timer: null,
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
  const [isemailValid, setValidate] = useState();
  let validateEmail = text => {
    let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      setValidate(false);
      setData({...data, email: text});
      return false;
    } else {
      setValidate(true);
      setData({...data, email: text});
      console.log('Email is Correct');
    }
  };
  let submitHandler = e => {
    e.preventDefault();
    if (!data.name || !data.email || !data.password || !data.username) {
      return Toast.show({
        text: 'Fill in your information',
        type: 'warning',
        textStyle: {textAlign: 'center'},
      });
    }
    if (data.username.length < 4) {
      return Toast.show({
        text: 'Username must be at least 4 character',
        type: 'danger',
        textStyle: {textAlign: 'center'},
      });
    }
    if (data.password.length <= 8) {
      return Toast.show({
        text: 'Password must be at least 8 character',
        type: 'danger',
        textStyle: {textAlign: 'center'},
      });
    }
    if (!isemailValid) {
      return Toast.show({text: 'Wrong Email', type: 'danger'});
    }
    if (data.password !== data.repeat) {
      return Toast.show({
        text: "Password doesn't match",
        type: 'danger',
        textStyle: {textAlign: 'center'},
      });
    } else {
      // console.log(register);
      axios
        .post('http://192.168.0.102:9080/users/register', {
          name: data.name,
          username: data.username,
          email: data.email,
          password: data.password,
        })
        .then(res => {
          Toast.show({
            text: 'Register Success, Redirecting to Login Page in 5 seconds',
            type: 'success',
            textStyle: {textAlign: 'center'},
          });
          data.timer = setTimeout(() => {
            props.navigation.navigate('Login');
          }, 5000);
          console.log(res);
        })
        .catch(error => {
          console.log(error);
          return Toast.show({
            text: 'Error',
            type: 'danger',
            textStyle: {textAlign: 'center'},
          });
        });
    }
  };
  console.log(data);
  return (
    <SafeAreaView fadeIn style={classes.container}>
      <ScrollView contentContainerstyle={classes.container}>
        <Animatable.View animation="fadeIn">
          <Text style={classes.header}>Register</Text>
          <View style={classes.inputGroup}>
            <View style={classes.input}>
              <Text style={classes.inputLabel}>Name</Text>
              <TextInput
                style={classes.textInputUsername}
                autoCapitalize="none"
                onChangeText={name => {
                  setData({...data, name: name});
                }}
              />
            </View>
            <View style={classes.input}>
              <Text style={classes.inputLabel}>Username</Text>
              <TextInput
                style={classes.textInputUsername}
                autoCapitalize="none"
                onChangeText={username => {
                  setData({...data, username: username});
                }}
              />
            </View>
            <View style={classes.input}>
              <Text style={classes.inputLabel}>Email</Text>
              <TextInput
                style={classes.textInputUsername}
                autoCapitalize="none"
                textContentType="emailAddress"
                onChangeText={email => {
                  validateEmail(email);
                }}
              />
            </View>
            <View style={classes.input}>
              <Text style={classes.inputLabel}>Password</Text>
              <TextInput
                style={classes.textInputPassword}
                autoCapitalize="none"
                secureTextEntry={eye.secureText ? true : false}
                onChangeText={password => {
                  setData({...data, password: password});
                }}
              />
              <TouchableOpacity style={classes.eye} onPress={updateSecureText}>
                {eye.secureText ? (
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
            <View style={classes.input2}>
              <Text style={classes.inputLabel}>Repeat Password</Text>
              <TextInput
                style={classes.textInputrepeatPassword}
                autoCapitalize="none"
                secureTextEntry={eye.secureText ? true : false}
                onChangeText={repeat => {
                  setData({...data, repeat: repeat});
                }}
              />
              <TouchableOpacity style={classes.eye} onPress={updateSecureText}>
                {eye.secureText ? (
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
            <View style={classes.input}>
              <TouchableOpacity
                style={classes.btnlogin}
                onPress={submitHandler}>
                <Text style={classes.btntextlogin}>Register</Text>
              </TouchableOpacity>
            </View>
            <View style={classes.input}>
              <TouchableOpacity style={classes.btngoogle}>
                <FontAwesome
                  name="google"
                  size={24}
                  style={classes.icongoogle}
                />
                <Text style={classes.btntextgoogle}>Register with Google</Text>
              </TouchableOpacity>
            </View>
            <View style={classes.register}>
              <Text style={classes.newusertext}>Already Registered?</Text>
              <Text
                style={classes.registertext}
                onPress={() => props.navigation.navigate('Login')}>
                Login
              </Text>
            </View>
          </View>
        </Animatable.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
