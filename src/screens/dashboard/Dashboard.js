/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  LogBox,
} from 'react-native';
import NotifService from '../../../NotifService';
import {connect} from 'react-redux';
import classes from './Styles';
import Material from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import News from '../../components/dashboard/news/News';
import MemberDashboard from './member/MemberDashboard';
import FacilitatorDashboard from './facilitator/FacilitatorDashboard';

const Dashboard = props => {
  const notifActive = true;
  const name = props.loginReducers.user.data?.name || 'User';
  // let role = props.loginReducers.user.data.data.role;

  // console.log(props.loginReducers.user.data);

  const [registerToken, setRegisterToken] = useState('');
  const [fcmRegistered, setFcmRegistered] = useState(false);

  const onRegister = token => {
    setRegisterToken(token.token);
    setFcmRegistered(true);
  };

  const onNotif = notif => {
    Alert.alert(notif.title, notif.message);
  };

  const notif = new NotifService(onRegister, onNotif);

  const handlePerm = perms => {
    Alert.alert('Permissions', JSON.stringify(perms));
  };

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    // if (props.loginReducers.isLogin === true) {
    //   notif.localNotif('', `Welcome back, ${name.split(' ')[0]}`);
    // }
  }, []);
  return (
    <Animatable.View animation="fadeIn" style={{flex: 1}}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />
      <View style={classes.container}>
        <View style={classes.header}>
          <View style={classes.infosection}>
            <Text style={classes.welcometext}>Welcome back,</Text>
            <Material
              name={notifActive ? 'notifications-active' : 'notifications'}
              size={24}
              color={'#F9F9F9'}
            />
          </View>
          <Text style={classes.name}>{name ? name : 'User'}</Text>
          <View style={classes.searchsection}>
            <Material name="search" color="#010620" size={24} />
            <TextInput
              style={classes.inputsearch}
              placeholder="Looking for something?"
              placeholderTextColor={'rgba(1, 6, 32, 0.5)'}
            />
          </View>
        </View>
        <ScrollView nestedScrollEnabled>
          <News />
          {props.loginReducers.user?.data?.role === 'Member' ? (
            <MemberDashboard />
          ) : (
            <FacilitatorDashboard />
          )}
        </ScrollView>
      </View>
    </Animatable.View>
  );
};
const mapStateToProps = state => ({
  loginReducers: state.loginReducers,
});
const connectedDashboard = connect(mapStateToProps)(Dashboard);
export default connectedDashboard;
