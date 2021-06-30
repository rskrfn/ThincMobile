import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
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
import {API_URL} from '@env';
import resetImage from '../../../assets/images/reset3.png';
import {
  nameValidation,
  emailValidation,
  passwordValidation,
  usernameValidation,
} from '../../../services/validation/inputValidation';

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
  const [warning, setWarning] = useState({
    namewarning: '',
    usernamewarning: '',
    emailwarning: '',
    passwordwarning: '',
    repeatwarning: '',
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
    if (
      !data.name ||
      !data.email ||
      !data.username ||
      !data.password ||
      !data.repeat
    ) {
      return Toast.show({
        text: 'Fill in your information',
        type: 'warning',
        textStyle: {textAlign: 'center'},
        duration: 3000,
      });
    }
    if (
      warning.namewarning ||
      warning.usernamewarning ||
      warning.emailwarning ||
      warning.passwordwarning ||
      warning.repeatwarning !== 'Password match'
    ) {
      return Toast.show({
        text:
          warning.namewarning ||
          warning.usernamewarning ||
          warning.emailwarning ||
          warning.passwordwarning ||
          warning.repeatwarning,
        type: 'warning',
        textStyle: {textAlign: 'center'},
        duration: 3000,
      });
    } else {
      // console.log(register);
      axios
        .post(`${API_URL}/users/register`, {
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
    <View style={classes.container}>
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
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Login');
            }}>
            <Text style={classes.textmodal}>Go to login page</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View>
        <ScrollView>
          <Text style={classes.header}>Register</Text>
          <View style={classes.inputGroup}>
            <View style={classes.input}>
              <Text style={classes.inputLabel}>Name</Text>
              <TextInput
                style={classes.textInputUsername}
                autoCapitalize="none"
                onChangeText={name => {
                  setWarning({...warning, namewarning: ''});
                  setData({...data, name: name});
                  setWarning({...warning, namewarning: nameValidation(name)});
                }}
              />
            </View>
            {warning.namewarning ? (
              <Text style={classes.inputwarning}>{warning.namewarning}</Text>
            ) : (
              <View style={{marginBottom: '9%'}} />
            )}
            <View style={classes.input}>
              <Text style={classes.inputLabel}>Username</Text>
              <TextInput
                style={classes.textInputUsername}
                autoCapitalize="none"
                onChangeText={username => {
                  setWarning({...warning, usernamewarning: ''});
                  setData({...data, username: username});
                  setWarning({
                    ...warning,
                    usernamewarning: usernameValidation(username),
                  });
                }}
              />
            </View>
            {warning.usernamewarning ? (
              <Text style={classes.inputwarning}>
                {warning.usernamewarning}
              </Text>
            ) : (
              <View style={{marginBottom: '5%'}} />
            )}
            <View style={classes.input}>
              <Text style={classes.inputLabel}>Email</Text>
              <TextInput
                style={classes.textInputUsername}
                autoCapitalize="none"
                textContentType="emailAddress"
                onChangeText={email => {
                  setWarning({...warning, emailwarning: ''});
                  validateEmail(email);
                  setWarning({
                    ...warning,
                    emailwarning: emailValidation(email),
                  });
                }}
              />
            </View>
            {warning.emailwarning ? (
              <Text style={classes.inputwarning}>{warning.emailwarning}</Text>
            ) : (
              <View style={{marginBottom: '5%'}} />
            )}
            <View style={classes.input}>
              <Text style={classes.inputLabel}>Password</Text>
              <TextInput
                style={classes.textInputPassword}
                autoCapitalize="none"
                secureTextEntry={eye.securePass ? true : false}
                onChangeText={password => {
                  setWarning({...warning, passwordwarning: ''});
                  setData({...data, password: password});
                  setWarning({
                    ...warning,
                    passwordwarning: passwordValidation(password),
                  });
                }}
              />
              <TouchableOpacity
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
              </TouchableOpacity>
            </View>
            {warning.passwordwarning ? (
              <Text style={classes.inputwarning}>
                {warning.passwordwarning}
              </Text>
            ) : (
              <View style={{marginBottom: '5%'}} />
            )}
            <View style={classes.input2}>
              <Text style={classes.inputLabel}>Repeat Password</Text>
              <TextInput
                style={classes.textInputrepeatPassword}
                autoCapitalize="none"
                secureTextEntry={eye.secureRepeat ? true : false}
                onChangeText={repeat => {
                  setWarning({...warning, repeatwarning: ''});
                  setData({...data, repeat: repeat});
                  setWarning({
                    ...warning,
                    repeatwarning: passwordValidation(repeat, data.password),
                  });
                }}
              />
              <TouchableOpacity
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
              </TouchableOpacity>
            </View>
            {warning.repeatwarning ? (
              warning.repeatwarning === 'Password match' ? (
                <Text style={{...classes.inputwarning, color: 'green'}}>
                  {warning.repeatwarning}
                </Text>
              ) : (
                <Text style={classes.inputwarning}>
                  {warning.repeatwarning}
                </Text>
              )
            ) : (
              <View style={{marginBottom: '5%'}} />
            )}
            <View style={classes.input}>
              <TouchableOpacity
                style={classes.btnlogin}
                onPress={submitHandler}>
                <Text style={classes.btntextlogin}>Register</Text>
              </TouchableOpacity>
            </View>
            <View style={classes.input}>
              <TouchableOpacity style={classes.btngoogle}>
                <Image
                  style={classes.googleicon}
                  source={require('../../../assets/icons/icon_google.png')}
                />
                <Text style={classes.btntextgoogle}>Register with Google</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={classes.login}>
            <Text style={classes.logintext}>Already Registered?</Text>
            <Text
              style={classes.login2text}
              onPress={() => props.navigation.navigate('Login')}>
              Login
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Register;
