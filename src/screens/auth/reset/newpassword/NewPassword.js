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
  Pressable,
  Modal,
} from 'react-native';
import {Toast} from 'native-base';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import classes from '../../reset/newpassword/Style';
import resetImage from '../../../../assets/images/reset3.png';

const NewPassword = props => {
  const [password, setPassword] = useState();
  const [repeat, setRepeat] = useState();
  const [eye, setEye] = useState({
    securePass: true,
    secureRepeat: true,
  });
  const [modal, setModal] = useState(false);

  const email = props.route.params.email;

  const submitHandler = e => {
    let url = 'http://192.168.0.102:9080/users/forgot';

    if (!password || !repeat) {
      return Toast.show({
        text: 'Enter your new password!',
        type: 'warning',
        textStyle: {textAlign: 'center'},
        duration: 3000,
      });
    }
    if (password.length < 8) {
      return Toast.show({
        text: 'Password must be at least 8 characters',
        type: 'warning',
        textStyle: {textAlign: 'center'},
        duration: 3000,
      });
    }
    if (password !== repeat) {
      return Toast.show({
        text: "Password didn't match",
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

  function passwordWarning() {
    if (password.length < 8) {
      return (
        <View style={classes.warning}>
          <Text style={{...classes.inputwarning, color: '#010620'}}>
            Must be at least 8 characters
          </Text>
        </View>
      );
    }
    if (password.length > 16) {
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
    if (repeat !== password) {
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
    if (repeat === password) {
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
          onPress: () => props.navigation.pop(),
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
          <Pressable
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
          </Pressable>
        </View>
      </Modal>
      <MaterialIcons name="chevron-left" size={42} color={'#010620'} />
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
              setPassword(value);
            }}
          />
          <Pressable
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
          </Pressable>
        </View>
        {password ? passwordWarning() : null}
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
          <Pressable
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
          </Pressable>
        </View>
        {repeat ? repeatWarning() : null}
        <View style={classes.input}>
          <Pressable
            style={classes.btnsend}
            onPress={() => {
              submitHandler();
            }}>
            <Text style={classes.btntextsend}>Send</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default NewPassword;
