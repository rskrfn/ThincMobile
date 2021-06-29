/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Image,
} from 'react-native';
import classes from './Styles';
import {API_URL} from '@env';
import axios from 'axios';
import DP from '../../../../assets/images/profilepicture.png';
import Material from 'react-native-vector-icons/MaterialIcons';

const Member = props => {
  const [classMember, setClassMember] = useState();
  const [classMemberLoad, setClassMemberLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const courseData = props.course;
  // const [scoreModal, setScoreModal] = useState(false);

  const getClassMember = () => {
    setClassMemberLoading(true);
    let config = {
      method: 'GET',
      url: `${API_URL}/courses/classmember`,
      headers: {
        'x-access-token': props.token,
      },
      params: {
        courseid: courseData.course_id,
      },
    };
    axios(config)
      .then(res => {
        // console.log('classmember', res);
        if (res.data.data?.length > 0) {
          setClassMember(res.data?.data);
          setClassMemberLoading(false);
        }
      })
      .catch(err => {
        console.log({err});
        if (err.response.data?.message === 'No data found') {
          setClassMember(false);
          setClassMemberLoading(false);
        }
      });
  };

  useEffect(() => {
    getClassMember();
  }, []);

  const onRefresh = React.useCallback(async () => {
    try {
      setRefreshing(true);
      setClassMember('');
      await getClassMember();
      setRefreshing(false);
    } catch (err) {
      console.log({err});
    }
  }, []);

  // console.log('member', props);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={classes.maincontainer}>
        {!classMemberLoad ? (
          classMember ? (
            classMember.map((item, index) => {
              return (
                <View key={index}>
                  <TouchableOpacity
                    style={classes.container}
                    onPress={() => {
                      props.navigation.push('ScoreDetail', {
                        user: item,
                        course: courseData,
                      });
                    }}>
                    <View style={classes.leftside}>
                      <Image
                        style={classes.displaypicture}
                        source={
                          item.display_picture !== 'null'
                            ? {uri: `${API_URL}${item.display_picture}`}
                            : DP
                        }
                      />
                      <Text style={classes.name}>{item.name}</Text>
                    </View>
                    <Material name="more-vert" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              );
            })
          ) : (
            <Text style={classes.errorplaceholder}>
              There are no members on this course
            </Text>
          )
        ) : null}
      </View>
    </ScrollView>
  );
};

export default Member;
