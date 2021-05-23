import React from 'react';
import {View} from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
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
    <Timeline
      data={data}
      circleSize={16}
      circleColor="#5784BA"
      lineColor="#5784BA"
      renderFullLine
      innerCircle={'dot'}
      style={classes.list}
      separator
      titleStyle={classes.title}
      timeStyle={classes.time}
      eventDetailStyle={classes.event}
    />
  );
};

export default ForYou;
