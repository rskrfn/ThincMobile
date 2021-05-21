import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Material from 'react-native-vector-icons/MaterialIcons';
import classes from '../../reset/verification/Style';
import resetImage from '../../../../assets/images/reset2.png';

const Verification = props => {
  const [code1, setCode1] = useState();
  const coderef1 = useRef();
  const [code2, setCode2] = useState();
  const coderef2 = useRef();
  const [code3, setCode3] = useState();
  const coderef3 = useRef();
  const [code4, setCode4] = useState();
  const coderef4 = useRef();
  const email = props[0]?.location.search.slice(7);
  console.log(props);

  return (
    <ScrollView style={classes.maincontainer}>
      <Material name="chevron-left" size={42} color={'#010620'} />
      <View style={classes.content}>
        <Text style={classes.header}>Account Verification</Text>
        <Image style={classes.image} source={resetImage} />
        <Text style={classes.desc1}>
          Enter verification code we just sent to your email address
        </Text>
        <View style={classes.inputbox}>
          <TextInput
            style={classes.codeinput}
            autoCapitalize="none"
            value={code1}
            maxLength={1}
            ref={coderef1}
            keyboardType="number-pad"
          />
          <TextInput
            style={classes.codeinput}
            autoCapitalize="none"
            value={code2}
            maxLength={1}
            ref={coderef2}
            keyboardType="number-pad"
          />
          <TextInput
            style={classes.codeinput}
            autoCapitalize="none"
            value={code3}
            maxLength={1}
            ref={coderef3}
            keyboardType="number-pad"
          />
          <TextInput
            style={classes.codeinput}
            autoCapitalize="none"
            value={code4}
            maxLength={1}
            ref={coderef4}
            keyboardType="number-pad"
          />
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
    </ScrollView>
  );
};

export default Verification;
