import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  BackHandler,
  Alert,
  ScrollView,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {Toast} from 'native-base';
import axios from 'axios';
import {API_URL} from '@env';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import classes from '../../reset/newpassword/Style';
import resetImage from '../../../../assets/images/reset3.png';
import {passwordValidation} from '../../../../services/validation/inputValidation';

const NewPassword = props => {
  const [password, setPassword] = useState();
  const [repeat, setRepeat] = useState();
  const [eye, setEye] = useState({
    securePass: true,
    secureRepeat: true,
  });
  const [modal, setModal] = useState(false);
  const [warning, setWarning] = useState({
    passwordWarning: '',
    repeatWarning: '',
  });

  const email = props.route.params.email;

  const submitHandler = e => {
    let url = `${API_URL}/users/forgot`;

    if (!password || !repeat) {
      return Toast.show({
        text: 'Enter your new password!',
        type: 'warning',
        textStyle: {textAlign: 'center'},
        duration: 3000,
      });
    }
    if (warning.passwordWarning || warning.repeatWarning !== 'Password match') {
      return Toast.show({
        text: warning.passwordWarning || warning.repeatWarning,
        type: 'warning',
        textStyle: {textAlign: 'center'},
        duration: 3000,
      });
    }
    axios
      .patch(url, {email: email, newpassword: password})
      .then(res => {
        console.log(res);
        if (res.data?.message === 'Password Changed') {
          setModal(!modal);
        }
      })
      .catch(err => {
        if (err.message === 'Network Error') {
          Toast.show({
            text: 'Network Error',
            type: 'danger',
            textStyle: {textAlign: 'center'},
            duration: 3000,
          });
        } else if (err) {
          Toast.show({
            text: 'An Error Occured',
            type: 'danger',
            textStyle: {textAlign: 'center'},
            duration: 3000,
          });
        }
      });
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'All progress will be lost', [
        {
          text: 'CANCEL',
          onPress: () => {
            setPassword('');
            setRepeat('');
          },
        },
        {
          text: 'OK',
          onPress: () => props.navigation.navigate('Login'),
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [props.navigation]);
  return (
    <ScrollView style={classes.maincontainer}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Modal
        visible={modal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => {
          return;
        }}>
        <View style={classes.modalcontainer}>
          <Text style={classes.header}>Password Changed!</Text>
          <Image style={classes.image} source={resetImage} />
          <TouchableOpacity
            onPress={() => {
              props.navigation.replace('Login');
            }}>
            <Animatable.Text
              animation="pulse"
              easing="ease-out"
              iterationCount="infinite"
              style={classes.textmodal}>
              Login to your account
            </Animatable.Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={classes.backbtn}>
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Hold on!', 'All progress will be lost', [
              {
                text: 'CANCEL',
                onPress: () => {
                  setPassword('');
                  setRepeat('');
                },
              },
              {
                text: 'OK',
                onPress: () => props.navigation.navigate('Login'),
              },
            ]);
            return true;
          }}>
          <MaterialIcons name="chevron-left" size={42} color={'#010620'} />
        </TouchableOpacity>
      </View>
      <View style={classes.content}>
        <Text style={classes.header}>Create New Password</Text>
        <Text style={classes.desc1}>
          Your new password must be different from previous used password!
        </Text>
        <View style={classes.input}>
          <Text style={classes.inputlabel}>Password</Text>
          <TextInput
            style={classes.textInputPassword}
            autoCapitalize="none"
            secureTextEntry={eye.securePass ? true : false}
            value={password}
            onChangeText={value => {
              setWarning({...warning, passwordWarning: ''});
              setPassword(value);
              setWarning({
                ...warning,
                passwordWarning: passwordValidation(value),
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
        {warning.passwordWarning ? (
          <Text style={classes.inputwarning}>{warning.passwordWarning}</Text>
        ) : (
          <View style={{marginBottom: '3%'}} />
        )}
        <View style={classes.input2}>
          <Text style={classes.inputlabel}>Repeat Password</Text>
          <TextInput
            style={classes.textInputrepeatPassword}
            autoCapitalize="none"
            secureTextEntry={eye.secureRepeat ? true : false}
            value={repeat}
            onChangeText={value => {
              setWarning({...warning, repeatWarning: ''});
              setRepeat(value);
              setWarning({
                ...warning,
                repeatWarning: passwordValidation(value, password),
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
        {warning.repeatWarning ? (
          warning.repeatWarning === 'Password match' ? (
            <Text style={{...classes.inputwarning, color: 'green'}}>
              {warning.repeatWarning}
            </Text>
          ) : (
            <Text style={classes.inputwarning}>{warning.repeatWarning}</Text>
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
  );
};

export default NewPassword;
