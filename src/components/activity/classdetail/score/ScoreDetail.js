/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import classes from './Styles';
import {API_URL} from '@env';
import axios from 'axios';
import DP from '../../../../assets/images/profilepicture.png';
import Material from 'react-native-vector-icons/MaterialIcons';

const ScoreDetail = props => {
  const {user, course} = props.route.params;
  const [scoreData, setScore] = useState();

  const setColor = score => {
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
  };

  const getUserScore = () => {
    let config = {
      method: 'GET',
      url: `${API_URL}/courses/score`,
      params: {
        userid: user.id,
        courseid: course.course_id,
      },
    };
    axios(config)
      .then(res => {
        console.log('userscore', res);
        if (res.data.data.length > 0) {
          setScore(res.data.data);
        }
      })
      .catch(err => {
        console.log({err});
        if (err.response.data.message === 'No data found') {
          setScore(false);
        }
      });
  };

  useEffect(() => {
    getUserScore();
  }, []);

  console.log('scoredetail', scoreData);
  return (
    <View>
      <View style={classes.modalcontainer}>
        <View style={classes.modalcontent}>
          <View style={classes.closebtn}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.goBack();
              }}>
              <Material name="cancel" size={24} color="rgba(232, 78, 56, 1)" />
            </TouchableOpacity>
          </View>
          <View style={classes.uppercontent}>
            <View style={classes.leftside}>
              <Image
                style={classes.displaypicture}
                source={
                  user.display_picture !== 'null'
                    ? {
                        uri: `${API_URL}${user.display_picture}`,
                      }
                    : DP
                }
              />
              <Text style={classes.name}>{user.name}</Text>
            </View>
          </View>
          <View style={classes.bottomcontent}>
            <View style={classes.header}>
              <Text style={classes.headertopic}>Topic</Text>
              <Text style={classes.headerscore}>Score</Text>
            </View>
            {scoreData ? (
              scoreData.map((item, index) => {
                return (
                  <View key={index} style={classes.content}>
                    <Text style={classes.subcoursename}>{item.Name}</Text>
                    {item.Score ? (
                      <Text
                        style={{
                          ...classes.score,
                          color: setColor(item.Score),
                        }}>
                        {item.Score}
                      </Text>
                    ) : (
                      <View style={classes.unfinishedcontainer}>
                        <Text style={classes.unfinishtext}>Unfinished</Text>
                      </View>
                    )}
                  </View>
                );
              })
            ) : (
              <Text style={classes.errorplaceholder}>
                There's seems to be a problem
              </Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default ScoreDetail;
