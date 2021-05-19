import React from 'react';
import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Material from 'react-native-vector-icons/MaterialIcons';
import classes from '../../reset/verification/Style';
import resetImage from '../../../../assets/images/reset2.png';

const CELL_COUNT = 4;

const Verification = props => {
  return (
    <KeyboardAwareScrollView style={classes.maincontainer}>
      <Material name="chevron-left" size={42} color={'#010620'} />
      <View style={classes.content}>
        <Text style={classes.header}>Account Verification</Text>
        <Image style={classes.image} source={resetImage} />
        <Text style={classes.desc1}>
          Enter verification code we just sent to your email address
        </Text>
        <View style={classes.inputbox}>
          <TextInput style={classes.codeinput} autoCapitalize="none" />
          <TextInput style={classes.codeinput} autoCapitalize="none" />
          <TextInput style={classes.codeinput} autoCapitalize="none" />
          <TextInput style={classes.codeinput} autoCapitalize="none" />
        </View>
        <View style={classes.input}>
          <TouchableOpacity
            style={classes.btnsend}
            onPress={() => {
              props.navigation.navigate('Login');
            }}>
            <Text style={classes.btntextsend}>Verify</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Verification;
