/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Toast} from 'native-base';
import axios from 'axios';
import {API_URL} from '@env';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import classes from './Style';
import {connect} from 'react-redux';
import {passwordValidation} from '../../../services/validation/inputValidation';

const ChangePassword = props => {
  const TOKEN = props.loginReducers.user?.token;
  const userId = props.loginReducers.user?.data.id;
  const [password, setPassword] = useState();
  const [newpassword, setNewPassword] = useState();
  const [repeat, setRepeat] = useState();
  const [eye, setEye] = useState({
    securePass: true,
    secureRepeat: true,
  });
  const [warning, setWarning] = useState({
    passwordwarning: '',
    newpasswordwarning: '',
    repeatwarning: '',
  });
  const FormData = require('form-data');
  const data = new FormData();

  const submitHandler = e => {
    const config = {
      method: 'patch',
      url: `${API_URL}/profile/`,
      headers: {
        token: TOKEN,
      },
      data: data,
    };

    if (!password || !newpassword || !repeat) {
      return Toast.show({
        text: 'Fill out the form!',
        type: 'warning',
        textStyle: {textAlign: 'center'},
        duration: 3000,
      });
    }
    if (
      warning.passwordwarning ||
      warning.newpasswordwarning ||
      warning.repeatwarning !== 'Password match'
    ) {
      return Toast.show({
        text:
          warning.passwordwarning ||
          warning.newpasswordwarning ||
          warning.repeatwarning,
        type: 'warning',
        textStyle: {textAlign: 'center'},
        duration: 3000,
      });
    }
    data.append('id', userId);
    data.append('password', password);
    data.append('newpassword', newpassword);
    axios(config)
      .then(res => {
        console.log(res);
        if (res.data.message === 'Data Changed') {
          Toast.show({
            text: 'Change password success',
            type: 'success',
            textStyle: {textAlign: 'center'},
            duration: 3000,
          });
          setPassword('');
          setNewPassword('');
          setRepeat('');
          props.navigation.goBack();
          return;
        }
      })
      .catch(err => {
        console.log({err});
        if (err.response.data?.message === 'Same Password') {
          Toast.show({
            text: 'Password must be different from previous one',
            type: 'danger',
            textStyle: {textAlign: 'center'},
            duration: 3000,
          });
          setPassword('');
          setNewPassword('');
          setRepeat('');
          setWarning({
            ...warning,
            passwordwarning: '',
            newpasswordwarning: '',
            repeatwarning: '',
          });
          return;
        }
        if (err.response.data?.message === 'Wrong Password') {
          Toast.show({
            text: 'Your password is incorrect',
            type: 'danger',
            textStyle: {textAlign: 'center'},
            duration: 3000,
          });
          setPassword('');
          setNewPassword('');
          setRepeat('');
          return;
        }
      });
  };

  return (
    <View style={classes.maincontainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <View style={classes.buttonbar}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}>
            <MaterialIcons name="chevron-left" size={42} color={'#ADA9BB'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={submitHandler}>
            <MaterialIcons name="save" size={32} color={'#5784BA'} />
          </TouchableOpacity>
        </View>
        <View style={classes.content}>
          <Text style={classes.header}>Change Password</Text>
          <Text style={classes.desc1}>
            Your new password must be different from previous used password!
          </Text>
          <View style={{...classes.input}}>
            <Text style={classes.inputlabel}>Password</Text>
            <TextInput
              style={classes.textInputPassword}
              autoCapitalize="none"
              secureTextEntry={eye.securePass ? true : false}
              value={password}
              onChangeText={value => {
                setWarning({...warning, passwordwarning: ''});
                setPassword(value);
                setWarning({
                  ...warning,
                  passwordwarning: passwordValidation(value),
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
                <MaterialIcons name="visibility-off" color="black" size={24} />
              )}
            </TouchableOpacity>
          </View>
          {warning.passwordwarning ? (
            <Text style={classes.inputwarning}>{warning.passwordwarning}</Text>
          ) : (
            <View style={{marginBottom: '8%'}} />
          )}
          <View style={classes.input}>
            <Text style={classes.inputlabel}>New Password</Text>
            <TextInput
              style={classes.textInputPassword}
              autoCapitalize="none"
              secureTextEntry={eye.securePass ? true : false}
              value={newpassword}
              onChangeText={value => {
                setWarning({...warning, newpasswordwarning: ''});
                setNewPassword(value);
                setWarning({
                  ...warning,
                  newpasswordwarning: passwordValidation(value),
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
                <MaterialIcons name="visibility-off" color="black" size={24} />
              )}
            </TouchableOpacity>
          </View>
          {warning.newpasswordwarning ? (
            <Text style={classes.inputwarning}>
              {warning.newpasswordwarning}
            </Text>
          ) : (
            <View style={{marginBottom: '8%'}} />
          )}
          <View style={classes.input2}>
            <Text style={classes.inputlabel}>Repeat Password</Text>
            <TextInput
              style={classes.textInputrepeatPassword}
              autoCapitalize="none"
              secureTextEntry={eye.secureRepeat ? true : false}
              value={repeat}
              onChangeText={value => {
                setWarning({...warning, repeatwarning: ''});
                setRepeat(value);
                setWarning({
                  ...warning,
                  repeatwarning: passwordValidation(value, newpassword),
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
                <MaterialIcons name="visibility-off" color="black" size={24} />
              )}
            </TouchableOpacity>
          </View>
          {warning.repeatwarning ? (
            warning.repeatwarning === 'Password match' ? (
              <Text style={{...classes.inputwarning, color: 'green'}}>
                {warning.repeatwarning}
              </Text>
            ) : (
              <Text style={classes.inputwarning}>{warning.repeatwarning}</Text>
            )
          ) : (
            <View style={{marginBottom: '5%'}} />
          )}
          <View style={classes.input}>
            <TouchableOpacity
              style={classes.btnsend}
              onPress={() => {
                submitHandler();
              }}>
              <Text style={classes.btntextsend}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const mapStateToProps = state => ({
  loginReducers: state.loginReducers,
});
const connectedChangePassword = connect(mapStateToProps)(ChangePassword);

export default connectedChangePassword;
