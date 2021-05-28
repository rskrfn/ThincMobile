import React from 'react';
import {View, Text} from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import classes from './Styles';

const AllSchedule = () => {
  const data = [
    {
      time: '08:00',
      title: 'Introduction to Banking Finance',
    },
    {
      time: '11.00',
      title: 'History of Europe',
    },
    {
      time: '13:00',
      title: 'Fundamental of Front End Dev.',
    },
    {
      time: '08:00',
      title: 'Introduction to Banking Finance',
    },
    {
      time: '11.00',
      title: 'History of Europe',
    },
  ];
  return (
    <View>
      <Text>All Schedule</Text>
    </View>
  );
};

export default AllSchedule;
