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
  LogBox,
  SafeAreaView,
  Alert,
} from 'react-native';
import NotifService from '../../../NotifService';
import {connect} from 'react-redux';
import classes from './Styles';
import Material from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import News from '../../components/dashboard/news/News';
import AllSchedule from '../../components/dashboard/allschedule/AllSchedule';
import ForYou from '../../components/dashboard/foryou/ForYou';

const Dashboard = props => {
  const notifActive = true;
  const name = props.loginReducers.user.data?.data.name;
  // let role = props.loginReducers.user.data.data.role;
  const [activeTab, setActive] = React.useState(0);
  const tabList = ['All Schedule', 'For You'];
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
    if (props.loginReducers.isLogin === true) {
      notif.localNotif('', `Welcome back, ${name.split(' ')[0]}`);
    }
  }, [props.loginReducers.isLogin]);
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
          <View style={classes.schedule}>
            <View style={classes.uppersection}>
              <View style={classes.left}>
                <Text style={classes.myclass}>My Class</Text>
                <Text style={classes.date}>Today, October 10</Text>
              </View>
              <Material name="event" size={24} color={'#010620'} />
            </View>
            <View style={classes.bottomsection}>
              {tabList.map((tabName, index) => (
                <TouchableOpacity key={index} onPress={() => setActive(index)}>
                  <Text
                    style={{
                      ...classes.tabItem,
                      color: activeTab === index ? '#5784BA' : '#ADA9BB',
                    }}>
                    {tabName}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <SafeAreaView>
              {activeTab === 0 ? <AllSchedule /> : <ForYou />}
            </SafeAreaView>
          </View>
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
