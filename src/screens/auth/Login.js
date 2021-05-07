import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';

export default function Login({navigation}) {
  const [data, setData] = React.useState({
    username: '',
    password: '',
    secureText: true,
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
    <Animatable.View animation="fadeIn" style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <View style={styles.inputGroup}>
        <View style={styles.button}>
          <TextInput
            style={styles.textInputUsername}
            placeholder="Email or Username"
            autoCapitalize="none"
            onChangeText={username => {
              usernameHandler(username);
            }}
          />
        </View>
        <View style={styles.button}>
          <TextInput
            style={styles.textInputPassword}
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry={data.secureText ? true : false}
            onChangeText={password => {
              passwordHandler(password);
            }}
          />
          <TouchableOpacity style={styles.eye} onPress={updateSecureText}>
            {data.secureText ? (
              <Feather name="eye-off" color="black" size={20} />
            ) : (
              <Feather name="eye" color="black" size={20} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#F9F9F9',
  },
  inputGroup: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontFamily: 'Kanit-Medium',
    fontSize: 32,
    color: 'black',
    marginBottom: '10%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '10%',
    marginRight: '10%',
  },
  textInputUsername: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ADA9BB',
    borderRadius: 10,
    padding: 10,
    marginBottom: '10%',
  },
  textInputPassword: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ADA9BB',
    borderRadius: 10,
    padding: 10,
  },
  eye: {
    position: 'absolute',
    right: 15,
    justifyContent: 'center',
  },
});
