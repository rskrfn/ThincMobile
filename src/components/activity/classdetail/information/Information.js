import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import axios from 'axios';
import {API_URL} from '@env';
import classes from './Styles';

const Information = props => {
  const Objective = props.objective;
  const courseData = props.course;

  // useEffect(() => {
  // }, []);
  // console.log(props);
  return (
    <ScrollView style={classes.maincontainer}>
      <View style={classes.container}>
        <Text style={classes.header}>Description</Text>
        <Text style={classes.textmain}>{courseData.Description}</Text>
      </View>
      <View>
        <Text style={classes.header}>What will I learn?</Text>
        <Text style={classes.textmain}>
          {Objective ? Objective : "Hmmm... there's seems to be a problem here"}
        </Text>
      </View>
    </ScrollView>
  );
};

export default Information;
