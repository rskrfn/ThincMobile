import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Material from 'react-native-vector-icons/MaterialIcons';
import classes from '../../reset/sendemail/Style';
import resetImage from '../../../../assets/images/reset1.png';

const SendEmail = props => {
  return (
    <ScrollView style={classes.maincontainer}>
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
          <TextInput style={classes.emailinput} autoCapitalize="none" />
        </View>
        <View style={classes.input}>
          <TouchableOpacity
            style={classes.btnsend}
            onPress={() => {
              props.navigation.navigate('Verification');
            }}>
            <Text style={classes.btntextsend}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SendEmail;
