/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
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
    if (newpassword.length < 8) {
      return Toast.show({
        text: 'Password must be at least 8 characters',
        type: 'warning',
        textStyle: {textAlign: 'center'},
        duration: 3000,
      });
    }
    if (newpassword !== repeat) {
      return Toast.show({
        text: "Password didn't match",
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
            text: 'Password has been changed',
            type: 'success',
            textStyle: {textAlign: 'center'},
            duration: 3000,
          });
          setPassword('');
          setNewPassword('');
          setRepeat('');
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

  function passwordWarning() {
    if (newpassword.length < 8) {
      return (
        <View style={classes.warning}>
          <Text style={{...classes.inputwarning, color: '#010620'}}>
            Must be at least 8 characters
          </Text>
        </View>
      );
    }
    if (newpassword.length > 16) {
      return (
        <View style={classes.warning}>
          <Text style={{...classes.inputwarning, color: '#FF1313'}}>
            Can not exceed 16 characters
          </Text>
          <MaterialIcons
            style={classes.warninglogo}
            name="cancel"
            size={16}
            color="#FF1313"
          />
        </View>
      );
    }
  }
  function repeatWarning() {
    if (repeat.length < 8) {
      return (
        <View style={classes.warning}>
          <Text style={{...classes.inputwarning, color: '#010620'}}>
            Must be at least 8 characters
          </Text>
        </View>
      );
    }
    if (repeat.length > 16) {
      return (
        <View style={classes.warning}>
          <Text style={{...classes.inputwarning, color: '#FF1313'}}>
            Can not exceed 16 characters
          </Text>
          <MaterialIcons
            style={classes.warninglogo}
            name="cancel"
            size={16}
            color="#FF1313"
          />
        </View>
      );
    }
    if (repeat !== newpassword) {
      return (
        <View style={classes.warning}>
          <Text style={{...classes.inputwarning, color: '#FF1313'}}>
            Password didn't match
          </Text>
          <MaterialIcons
            style={classes.warninglogo}
            name="cancel"
            size={16}
            color="#FF1313"
          />
        </View>
      );
    }
    if (repeat === newpassword) {
      return (
        <View style={classes.warning}>
          <Text style={{...classes.inputwarning, color: '#0EAA00'}}>
            Password match
          </Text>
          <MaterialIcons
            style={classes.warninglogo}
            name="check-circle"
            size={16}
            color="#0EAA00"
          />
        </View>
      );
    }
  }

  useEffect(() => {}, []);
  return (
    <ScrollView
      style={classes.maincontainer}
      showsVerticalScrollIndicator={false}>
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
        <View style={{...classes.input, marginBottom: '5%'}}>
          <Text style={classes.inputlabel}>Password</Text>
          <TextInput
            style={classes.textInputPassword}
            autoCapitalize="none"
            secureTextEntry={eye.securePass ? true : false}
            value={password}
            onChangeText={value => {
              setPassword(value);
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
        <View style={classes.input}>
          <Text style={classes.inputlabel}>New Password</Text>
          <TextInput
            style={classes.textInputPassword}
            autoCapitalize="none"
            secureTextEntry={eye.securePass ? true : false}
            value={newpassword}
            onChangeText={value => {
              setNewPassword(value);
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
        {newpassword ? passwordWarning() : null}
        <View style={classes.input2}>
          <Text style={classes.inputlabel}>Repeat Password</Text>
          <TextInput
            style={classes.textInputrepeatPassword}
            autoCapitalize="none"
            secureTextEntry={eye.secureRepeat ? true : false}
            value={repeat}
            onChangeText={value => {
              setRepeat(value);
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
        {repeat ? repeatWarning() : null}
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
  );
};
const mapStateToProps = state => ({
  loginReducers: state.loginReducers,
});
const connectedChangePassword = connect(mapStateToProps)(ChangePassword);

export default connectedChangePassword;
