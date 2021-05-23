import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  SafeAreaView,
  Image,
  Modal,
} from 'react-native';
import classes from './Style';
import * as Animatable from 'react-native-animatable';
// import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Toast} from 'native-base';
import axios from 'axios';
import resetImage from '../../../assets/images/reset3.png';

const Register = props => {
  const [data, setData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    repeat: '',
  });
  const [eye, setEye] = useState({
    securePass: true,
    secureRepeat: true,
  });
  const [isemailValid, setValidate] = useState();
  const [modal, setModal] = useState(false);
  let validateEmail = text => {
    let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      setValidate(false);
      setData({...data, email: text});
      return false;
    } else {
      setValidate(true);
      setData({...data, email: text});
      // console.log('Email is Correct');
    }
  };
  let submitHandler = e => {
    e.preventDefault();
    if (!data.name || !data.email || !data.password || !data.username) {
      return Toast.show({
        text: 'Fill in your information',
        type: 'warning',
        textStyle: {textAlign: 'center'},
        duration: 3000,
      });
    }
    if (data.username.length < 4) {
      return Toast.show({
        text: 'Username must be at least 4 character',
        type: 'danger',
        textStyle: {textAlign: 'center'},
        duration: 3000,
      });
    }
    if (data.password.length < 8) {
      return Toast.show({
        text: 'Password must be at least 8 character',
        type: 'danger',
        textStyle: {textAlign: 'center'},
        duration: 3000,
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
        duration: 3000,
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
          if (res.data.message === 'Registered Successfully') {
            setModal(!modal);
            setData({});
          }
          setTimeout(() => {
            props.navigation.navigate('Login');
          }, 5000);
          console.log(res);
        })
        .catch(error => {
          console.log({error});
          if (
            error.response?.data.message === 'Password cannot contain your name'
          ) {
            return Toast.show({
              text: 'Password cannot contain your name',
              type: 'danger',
              textStyle: {textAlign: 'center'},
              duration: 3000,
            });
          }
          if (error.response?.data.message === 'Fullname required') {
            return Toast.show({
              text: 'Full Name required',
              type: 'danger',
              textStyle: {textAlign: 'center'},
              duration: 3000,
            });
          }
          return Toast.show({
            text: 'Error',
            type: 'danger',
            textStyle: {textAlign: 'center'},
            duration: 3000,
          });
        });
    }
  };
  // console.log(eye);
  return (
    <SafeAreaView style={classes.container}>
      <Modal
        visible={modal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => {
          return;
        }}>
        <View style={classes.modalcontainer}>
          <Text style={classes.modalheader}>Registered Successfully!</Text>
          <Image style={classes.image} source={resetImage} />
          <View>
            <Text style={classes.textmodal}>Redirecting to login page...</Text>
          </View>
        </View>
      </Modal>
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
                secureTextEntry={eye.securePass ? true : false}
                onChangeText={password => {
                  setData({...data, password: password});
                }}
              />
              <Pressable
                style={classes.eye}
                onPress={() => {
                  setEye({
                    ...eye,
                    securePass: !eye.securePass,
                  });
                }}>
                {eye.securePass ? (
                  <MaterialIcons name="visibility" color="black" size={24} />
                ) : (
                  <MaterialIcons
                    name="visibility-off"
                    color="black"
                    size={24}
                  />
                )}
              </Pressable>
            </View>
            <View style={classes.input2}>
              <Text style={classes.inputLabel}>Repeat Password</Text>
              <TextInput
                style={classes.textInputrepeatPassword}
                autoCapitalize="none"
                secureTextEntry={eye.secureRepeat ? true : false}
                onChangeText={repeat => {
                  setData({...data, repeat: repeat});
                }}
              />
              <Pressable
                style={classes.eye}
                onPress={() => {
                  setEye({
                    ...eye,
                    secureRepeat: !eye.secureRepeat,
                  });
                }}>
                {eye.secureRepeat ? (
                  <MaterialIcons name="visibility" color="black" size={24} />
                ) : (
                  <MaterialIcons
                    name="visibility-off"
                    color="black"
                    size={24}
                  />
                )}
              </Pressable>
            </View>
            <View style={classes.input}>
              <Pressable style={classes.btnlogin} onPress={submitHandler}>
                <Text style={classes.btntextlogin}>Register</Text>
              </Pressable>
            </View>
            <View style={classes.input}>
              <Pressable style={classes.btngoogle}>
                <Image
                  style={classes.googleicon}
                  source={require('../../../assets/icons/icon_google.png')}
                />
                <Text style={classes.btntextgoogle}>Register with Google</Text>
              </Pressable>
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
