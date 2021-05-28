import React from 'react';
import {View, Text} from 'react-native';
import classes from './Styles';

const ForYou = () => {
  const data = [
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
      <Text>For You</Text>
    </View>
  );
};

export default ForYou;
