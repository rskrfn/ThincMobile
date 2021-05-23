import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  Keyboard,
  Pressable,
  StatusBar,
} from 'react-native';
import {Toast} from 'native-base';
import axios from 'axios';
import Material from 'react-native-vector-icons/MaterialIcons';
import classes from '../../reset/verification/Style';
import resetImage from '../../../../assets/images/reset2.png';

const Verification = props => {
  const [code1, setCode1] = useState();
  const [code1focus, setFocus1] = useState();
  const coderef1 = useRef();
  const [code2, setCode2] = useState();
  const [code2focus, setFocus2] = useState();
  const coderef2 = useRef();
  const [code3, setCode3] = useState();
  const [code3focus, setFocus3] = useState();
  const coderef3 = useRef();
  const [code4, setCode4] = useState();
  const [code4focus, setFocus4] = useState();
  const coderef4 = useRef();

  const email = props.route.params.email;

  const submitHandler = e => {
    let code = [code1, code2, code3, code4].join('');
    let url = `http://192.168.0.102:9080/users?email=${email}&otp=${code}`;
    if (!code1 || !code2 || !code3 || !code4) {
      return Toast.show({
        text: 'Enter the code',
        type: 'warning',
        textStyle: {textAlign: 'center'},
        duration: 3000,
      });
    }
    props.navigation.replace('NewPassword', {email: email});
    axios
      .post(url)
      .then(res => {
        console.log(res);
        if (res.data.message === 'OTP valid') {
          props.navigation.navigate('NewPassword', {email: email});
        }
      })
      .catch(err => {
        if (err.response.data.message === 'Wrong otp code') {
          setCode1('');
          setCode2('');
          setCode3('');
          setCode4('');
          setFocus1('');
          setFocus2('');
          setFocus3('');
          setFocus4('');
          return Toast.show({
            text: 'Invalid Code',
            type: 'danger',
            textStyle: {textAlign: 'center'},
            duration: 3000,
          });
        }
        if (
          err.response?.data.message === 'Email empty' ||
          err.response?.data.message === 'Email not found'
        ) {
          return Toast.show({
            text: 'Email Not Found',
            type: 'danger',
            textStyle: {textAlign: 'center'},
            duration: 3000,
          });
        }
        if (err.response.data.message === 'OTP Expired') {
          Toast.show({
            text: 'OTP Expired, Redirecting...',
            type: 'danger',
            textStyle: {textAlign: 'center'},
            duration: 3000,
          });
          setTimeout(() => {
            props.navigation.replace('SendEmail');
          }, 5000);
        }
      });
  };

  return (
    <ScrollView style={classes.maincontainer}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Material name="chevron-left" size={42} color={'#010620'} />
      <View style={classes.content}>
        <Text style={classes.header}>Account Verification</Text>
        <Image style={classes.image} source={resetImage} />
        <Text style={classes.desc1}>
          Enter verification code we just sent to your email address
        </Text>
        <View style={classes.inputbox}>
          <TextInput
            style={code1focus ? classes.codeinputActive : classes.codeinput}
            autoCapitalize="none"
            value={code1}
            maxLength={1}
            ref={coderef1}
            keyboardType="number-pad"
            onChangeText={value => {
              if (value.length > 0) {
                setFocus1(true);
                coderef2.current.focus();
              }
              setCode1(value);
            }}
          />
          <TextInput
            style={code2focus ? classes.codeinputActive : classes.codeinput}
            autoCapitalize="none"
            value={code2}
            maxLength={1}
            ref={coderef2}
            keyboardType="number-pad"
            onChangeText={value => {
              if (value.length > 0) {
                setFocus2(true);
                coderef3.current.focus();
              }
              setCode2(value);
            }}
          />
          <TextInput
            style={code3focus ? classes.codeinputActive : classes.codeinput}
            autoCapitalize="none"
            value={code3}
            maxLength={1}
            ref={coderef3}
            keyboardType="number-pad"
            onChangeText={value => {
              if (value.length > 0) {
                setFocus3(true);
                coderef4.current.focus();
              }
              setCode3(value);
            }}
          />
          <TextInput
            style={code4focus ? classes.codeinputActive : classes.codeinput}
            autoCapitalize="none"
            value={code4}
            maxLength={1}
            ref={coderef4}
            keyboardType="number-pad"
            onChangeText={value => {
              if (value.length > 0) {
                setFocus4(true);
                Keyboard.dismiss();
              }
              setCode4(value);
            }}
          />
        </View>
        <View style={classes.input}>
          <Text style={classes.subtext}>Didn't Recieve a code?</Text>
          <Pressable
            style={classes.resendpressable}
            onPress={() => {
              props.navigation.navigate('SendEmail');
            }}>
            <Text style={classes.resendlink}>Resend</Text>
          </Pressable>
        </View>
        <View style={classes.input}>
          <Pressable
            style={classes.btnsend}
            onPress={() => {
              submitHandler();
            }}>
            <Text style={classes.btntextsend}>Verify</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default Verification;
