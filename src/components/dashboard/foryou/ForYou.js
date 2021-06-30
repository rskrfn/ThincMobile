import React from 'react';
import {View, Text} from 'react-native';
import classes from './Styles';
import ProgressCircle from 'react-native-progress-circle';

const ForYou = props => {
  const {data} = props;

  const setColor = score => {
    if (data) {
      if (Number(score) > 90) {
        return '#2BE6AE';
      } else if (Number(score) > 70) {
        return '#51E72B';
      } else if (Number(score) > 50) {
        return '#CCE72B';
      } else if (Number(score) > 30) {
        return '#E7852B';
      } else {
        return '#E6422B';
      }
    }
  };
  // console.log('data', data);
  return (
    <View style={classes.bottomsection}>
      {data ? (
        data.map((item, index) => (
          <View style={classes.schedulecontainer} key={index}>
            <Text style={classes.coursetime}>
              {item.start_time.slice(0, 5)} - {item.end_time.slice(0, 5)}
            </Text>
            <Text style={classes.coursename}>{item.course_name}</Text>
            <View style={classes.tableprogress}>
              <ProgressCircle
                percent={Number(
                  ((item.progress / item.totalsubcourse) * 100).toFixed(0),
                )}
                radius={20}
                borderWidth={2.8}
                color="#5784BA"
                shadowColor="#E5E6EB"
                bgColor="#fff">
                <Text style={classes.textprogress}>
                  {((item.progress / item.totalsubcourse) * 100).toFixed(0) +
                    '%'}
                </Text>
              </ProgressCircle>
            </View>
          </View>
        ))
      ) : (
        <View style={classes.emptyschedule}>
          <Text style={classes.emptyscheduletext}>
            There are no schedule for today
          </Text>
        </View>
      )}
    </View>
  );
};

export default ForYou;
