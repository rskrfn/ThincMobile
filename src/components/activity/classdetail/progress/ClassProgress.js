/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import ProgressItem from './progressitem/ProgressItem';
import {connect} from 'react-redux';

const ClassProgress = props => {
  const scoreData = props.scoreData;

  return (
    <View>
      {scoreData.map((item, index) => (
        <ProgressItem key={index} data={item} />
      ))}
    </View>
  );
};

const mapStatetoProps = state => {
  return {
    loginReducer: state.loginReducers,
  };
};
const connectedClassProgress = connect(mapStatetoProps)(ClassProgress);

export default connectedClassProgress;
