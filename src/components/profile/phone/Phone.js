import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import {Toast} from 'native-base';
import axios from 'axios';
import {API_URL} from '@env';
import {connect} from 'react-redux';
import Material from 'react-native-vector-icons/MaterialIcons';
import classes from './Styles';

const Phone = props => {
  const [phone, setPhone] = useState('');
  const TOKEN = props.loginReducers.user?.data.token;
  const userId = props.loginReducers.user?.data.data.id;
  let userPhone = props.route.params.phone;
  // console.log(props.route.params.phone);
  const FormData = require('form-data');
  const data = new FormData();
  data.append('id', userId);
  data.append('phone', phone);

  const config = {
    method: 'patch',
    url: `${API_URL}/profile/`,
    headers: {
      token: TOKEN,
    },
    data: data,
  };
  function submitHandler() {
    if (!phone) {
      return Toast.show({
        text: 'Enter your phone number',
        type: 'warning',
        textStyle: {textAlign: 'center'},
        duration: 3000,
      });
    }
    if (phone.slice(3).length < 10) {
      return Toast.show({
        text: 'Enter a correct phone number',
        type: 'warning',
        textStyle: {textAlign: 'center'},
        duration: 3000,
      });
    }
    if (phone.slice(3).length > 13) {
      return Toast.show({
        text: 'Enter a correct phone number',
        type: 'warning',
        textStyle: {textAlign: 'center'},
        duration: 3000,
      });
    }
    if (phone === userPhone) {
      return Toast.show({
        text: 'This is your current phone number',
        type: 'danger',
        textStyle: {textAlign: 'center'},
        duration: 3000,
      });
    }
    axios(config)
      .then(res => {
        if (res.data.message === 'Data Changed') {
          Toast.show({
            text: 'Phone number has been changed',
            type: 'success',
            textStyle: {textAlign: 'center'},
            duration: 3000,
          });
          return setTimeout(() => {
            props.navigation.goBack();
          }, 5000);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    // axios
    //   .get(`${API_URL}/profile`, {params: {id: userId}})
    //   .then(res => {
    //     console.log(res.data.phone);
    //     setPhone(res.data.phone);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    if (userPhone !== null) {
      setPhone(userPhone);
    }
  }, [userPhone]);

  return (
    <ScrollView style={classes.maincontainer}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={classes.buttonbar}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack();
          }}>
          <Material name="chevron-left" size={42} color={'#ADA9BB'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={submitHandler}>
          <Material name="save" size={32} color={'#5784BA'} />
        </TouchableOpacity>
      </View>
      <View style={classes.content}>
        <Text style={classes.header}>Phone Number</Text>
        <Material name="phone" size={200} color="#5784BA" />
        <Text style={classes.desc1}>Enter your phone number</Text>
        <Text style={classes.desc2}>
          Please make sure to use active phone number
        </Text>
        <View style={classes.input}>
          <Text style={classes.inputlabel}>Phone Number</Text>
          <TextInputMask
            style={classes.phoneinput}
            autoCapitalize="none"
            keyboardType="phone-pad"
            autoCompleteType="tel"
            mask={'+62 [000] [0000] [0000] [0000]'}
            value={phone}
            placeholder="+62"
            onChangeText={formatted => {
              let value = formatted.split(' ').join('').slice(1);
              // console.log(value);
              setPhone(value);
            }}
          />
        </View>
        <View style={classes.input}>
          <TouchableOpacity style={classes.btnsave} onPress={submitHandler}>
            <Text style={classes.btntextsave}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
const mapStateToProps = state => ({
  loginReducers: state.loginReducers,
});
const connectedPhone = connect(mapStateToProps)(Phone);
export default connectedPhone;
