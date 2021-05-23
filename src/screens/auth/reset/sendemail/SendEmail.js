import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  StatusBar,
} from 'react-native';
import {Toast} from 'native-base';
import axios from 'axios';
import Material from 'react-native-vector-icons/MaterialIcons';
import classes from '../../reset/sendemail/Style';
import resetImage from '../../../../assets/images/reset1.png';

const SendEmail = props => {
  const [email, setEmail] = useState('');
  const [isemailValid, setValidate] = useState();

  let validateEmail = text => {
    let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      setValidate(false);
      setEmail(text);
      return false;
    } else {
      setValidate(true);
      setEmail(text);
      // console.log('Email is Correct');
    }
  };

  const sendHandler = e => {
    e.preventDefault();
    // console.log('clicked');
    if (!email) {
      return Toast.show({
        text: 'Enter your registered email',
        type: 'warning',
        textStyle: {textAlign: 'center'},
        duration: 3000,
      });
    }
    if (!isemailValid) {
      return Toast.show({
        text: 'Wrong Email',
        type: 'danger',
        textStyle: {textAlign: 'center'},
        duration: 3000,
      });
    }

    let url = 'http://192.168.0.102:9080/users/sendemail';
    axios
      .post(url, {email: email})
      .then(res => {
        // console.log(res);
        props.navigation.navigate('Verification', {email: email});
      })
      .catch(err => {
        if (err.response.data.message === 'User not found') {
          return Toast.show({
            text: 'Account not found',
            type: 'danger',
            textStyle: {textAlign: 'center'},
            duration: 3000,
          });
        } else {
          console.log(err);
        }
      });
  };

  return (
    <ScrollView style={classes.maincontainer}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Material name="chevron-left" size={42} color={'#010620'} />
      <View style={classes.content}>
        <Text style={classes.header}>Reset Password</Text>
        <Image style={classes.image} source={resetImage} />
        <Text style={classes.desc1}>
          Enter your email address linked to this account.
        </Text>
        <Text style={classes.desc2}>
          We will send you the verification code to reset your password
        </Text>
        <View style={classes.input}>
          <Text style={classes.inputlabel}>Email</Text>
          <TextInput
            style={classes.emailinput}
            autoCapitalize="none"
            value={email}
            autoCompleteType="email"
            onChangeText={value => {
              validateEmail(value);
            }}
          />
        </View>
        <View style={classes.input}>
          <Pressable style={classes.btnsend} onPress={sendHandler}>
            <Text style={classes.btntextsend}>Send</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default SendEmail;
