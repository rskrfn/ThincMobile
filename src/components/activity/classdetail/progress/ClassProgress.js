import React from 'react';
import {View, Text} from 'react-native';
import classes from '../../facilitator/classdetail/Styles';
import ProgressItem from './progressitem/ProgressItem';

const ClassProgress = props => {
  const scoreData = props.scoreData;
  const userData = props.user;

  console.log('classprog', userData);
  return (
    <View>
      {userData.role !== 'Facilitator' ? (
        scoreData.map((item, index) => <ProgressItem key={index} data={item} />)
      ) : (
        <Text style={classes.placeholder}>
          This page is currently on development
        </Text>
      )}
    </View>
  );
};

export default ClassProgress;
