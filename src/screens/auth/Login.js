import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {Container} from 'native-base';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomIcon from '../../components/customicon/icomoon';
import env from '../../../env';

export default function Login({navigation}) {
  const [data, setData] = React.useState({
    username: '',
    password: '',
    secureText: true,
    userIcon: '',
  });

  const usernameHandler = username => {
    if (!username) {
      return;
    }
    setData({
      ...data,
      username: username,
    });
  };
  const passwordHandler = password => {
    if (!password || password.length < 8) {
      return;
    }
    setData({
      ...data,
      password: password,
    });
  };
  const updateSecureText = () => {
    setData({
      ...data,
      secureText: !data.secureText,
    });
  };
  console.log('username', data.username);
  console.log('password', data.password);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerstyle={styles.container}>
        <Text style={styles.header}>Login</Text>
        <View style={styles.inputGroup}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email or Username</Text>
            <TextInput
              style={styles.textInputUsername}
              autoCapitalize="none"
              onChangeText={username => {
                usernameHandler(username);
              }}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.textInputPassword}
              autoCapitalize="none"
              secureTextEntry={data.secureText ? true : false}
              onChangeText={password => {
                passwordHandler(password);
              }}
            />
            <TouchableOpacity style={styles.eye} onPress={updateSecureText}>
              {data.secureText ? (
                <MaterialIcons name="visibility" color="black" size={24} />
              ) : (
                <MaterialIcons name="visibility-off" color="black" size={24} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.input}>
            <TouchableOpacity style={styles.forgot}>
              <Text style={styles.forgottext}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.input}>
            <TouchableOpacity style={styles.btnlogin}>
              <Text style={styles.btntextlogin}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.input}>
            <TouchableOpacity style={styles.btngoogle}>
              <FontAwesome name="google" size={24} style={styles.icongoogle} />
              <Text style={styles.btntextgoogle}>Login with Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
  },

  header: {
    alignSelf: 'center',
    fontFamily: 'Kanit-SemiBold',
    fontSize: 32,
    color: 'black',
    marginBottom: '10%',
  },
  inputGroup: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '10%',
    marginRight: '10%',
  },
  inputLabel: {
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: '#F9F9F9',
    color: '#ADA9BB',
    fontFamily: 'Kanit-Regular',
    left: 8,
    top: -10,
    paddingLeft: 2,
    paddingRight: 2,
    zIndex: 10,
  },
  textInputUsername: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ADA9BB',
    borderRadius: 10,
    padding: 10,
    marginBottom: '10%',
    fontFamily: 'Roboto-Regular',
    fontSize: 20,
    color: 'black',
  },
  textInputPassword: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ADA9BB',
    borderRadius: 10,
    padding: 10,
    fontFamily: 'Roboto-Regular',
    fontSize: 20,
    color: 'black',
  },
  eye: {
    position: 'absolute',
    right: 15,
    justifyContent: 'center',
  },
  forgot: {
    flex: 1,
    alignItems: 'flex-end',
  },
  forgottext: {
    marginTop: 10,
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
  },
  btnlogin: {
    width: '100%',
    alignItems: 'center',
    marginTop: '10%',
    backgroundColor: '#5784BA',
    justifyContent: 'center',
    height: 50,
    borderRadius: 10,
    padding: 10,
  },
  btntextlogin: {
    fontSize: 18,
    width: '100%',
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Kanit-Medium',
  },
  btngoogle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'rgba(0, 13, 79, 0.08)',
    justifyContent: 'center',
    height: 50,
    borderRadius: 10,
    padding: 10,
  },
  btntextgoogle: {
    fontSize: 16,
    width: '100%',
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Kanit-Medium',
  },
  icongoogle: {
    position: 'absolute',
    left: '20%',
    color: '#5784BA',
  },
});
