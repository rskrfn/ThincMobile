import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import axios from 'axios';
import {API_URL} from '@env';
import classes from './Styles';

const Information = props => {
  const [Objective, setObjective] = useState('');
  const courseData = props.course;
  const getObjective = () => {
    let config = {
      method: 'GET',
      url: `${API_URL}/courses/objective`,
      params: {courseid: courseData.id},
    };
    axios(config)
      .then(res => {
        // console.log(res.data.data[0].Objective);
        if (res.data.data.length > 0) {
          let value = res.data.data[0].Objective.split(',').join(', ');
          setObjective(value);
        } else {
          return null;
        }
      })
      .catch(() => {});
  };

  return (
    <ScrollView style={classes.maincontainer}>
      <View style={classes.container}>
        <Text style={classes.header}>Description</Text>
        <Text style={classes.textmain}>{props.course.Description}</Text>
      </View>
      <View>
        <Text style={classes.header}>What will I learn?</Text>
        <Text style={classes.textmain}>
          {getObjective()}
          {Objective ? Objective : "Hmmm... there's seems to be a problem here"}
        </Text>
      </View>
    </ScrollView>
  );
};

export default Information;
