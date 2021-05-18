import React from 'react';
import {View} from 'react-native';
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
    <View style={classes.timeline}>
      <Timeline
        nestedScrollEnabled={true}
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
    </View>
  );
};

export default AllSchedule;
