import React from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import classes from './Styles';
import Material from 'react-native-vector-icons/MaterialIcons';
import AllSchedule from '../../../components/dashboard/allschedule/AllSchedule';
import ForYou from '../../../components/dashboard/foryou/ForYou';

const MemberDashboard = () => {
  const [activeTab, setActive] = React.useState(0);
  const tabList = ['All Schedule', 'For You'];

  return (
    <>
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
    </>
  );
};

export default MemberDashboard;
