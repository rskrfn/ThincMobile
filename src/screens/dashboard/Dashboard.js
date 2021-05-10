/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import classes from './Styles';
import Material from 'react-native-vector-icons/MaterialIcons';
import News from '../../components/dashboard/news/News';
import AllSchedule from '../../components/dashboard/allschedule/AllSchedule';
import ForYou from '../../components/dashboard/foryou/ForYou';

const Dashboard = props => {
  const notifActive = true;
  let name = props.loginReducers.user.data.data.name;
  let role = props.loginReducers.user.data.data.role;
  const [activeTab, setActive] = React.useState(0);
  const tabList = ['All Schedule', 'For You'];
  console.log(props.loginReducers.user.data);
  return (
    <>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />
      <View style={classes.container}>
        <View style={classes.header}>
          <View style={classes.topSection}>
            <Text style={classes.txtGreeting}>Welcome Back,</Text>
            <Material
              name={notifActive ? 'notifications-active' : 'notifications'}
              size={24}
              color={'#F9F9F9'}
            />
          </View>
          <Text style={classes.name}>{name}</Text>
          <View style={classes.searchSection}>
            <Material name="search" color="#010620" size={24} />
            <TextInput
              style={classes.searchInput}
              placeholder="Looking for something?"
              placeholderTextColor={{color: '#010620'}}
            />
          </View>
        </View>
        <ScrollView>
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
            {activeTab === 0 ? <AllSchedule /> : <ForYou />}
          </View>
        </ScrollView>
      </View>
    </>
  );
};
const mapStateToProps = state => ({
  loginReducers: state.loginReducers,
});
const connectedDashboard = connect(mapStateToProps)(Dashboard);
export default connectedDashboard;
