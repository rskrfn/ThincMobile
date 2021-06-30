import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import {Toast} from 'native-base';
import axios from 'axios';
import {API_URL} from '@env';
import Material from 'react-native-vector-icons/MaterialIcons';
import classes from '../../reset/sendemail/Style';
import resetImage from '../../../../assets/images/reset1.png';
import {emailValidation} from '../../../../services/validation/inputValidation';

const SendEmail = props => {
  const [email, setEmail] = useState('');
  const [warning, setWarning] = useState();

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
    if (warning) {
      return Toast.show({
        text: warning,
        type: 'warning',
        textStyle: {textAlign: 'center'},
        duration: 3000,
      });
    }
    let url = `${API_URL}/users/sendemail`;
    axios
      .post(url, {email: email})
      .then(res => {
        console.log(res);
        setEmail('');
        setWarning('');
        props.navigation.navigate('Verification', {email: email});
      })
      .catch(err => {
        if (err.response.data?.message === 'User not found') {
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
      <View style={classes.backbtn}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack();
          }}>
          <Material name="chevron-left" size={42} color={'#010620'} />
        </TouchableOpacity>
      </View>
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
              setWarning('');
              setEmail(value);
              setWarning(emailValidation(value));
            }}
          />
        </View>
        {warning ? (
          <Text style={classes.inputwarning}>{warning}</Text>
        ) : (
          <View style={{marginBottom: '3%'}} />
        )}
        <View style={classes.input}>
          <TouchableOpacity style={classes.btnsend} onPress={sendHandler}>
            <Text style={classes.btntextsend}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SendEmail;
