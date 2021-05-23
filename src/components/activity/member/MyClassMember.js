/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, SafeAreaView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import classes from './Styles';
import ProgressCircle from 'react-native-progress-circle';
import axios from 'axios';
import {API_URL} from '@env';

function MyClassMember({...props}) {
  const [myClass, setMyClass] = useState();
  useEffect(() => {}, []);

  const getMyClass = () => {
    axios
      .get(`${API_URL}/courses/myclass`)
      .then(res => {
        // console.log(res);
        setMyClass(res.data.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getMyClass();
  }, []);

  const setColor = score => {
    if (myClass) {
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
  return (
    <>
      <View style={classes.header}>
        <Text style={classes.headmyclass}>Class Name</Text>
        <Text style={classes.headprogress}>Progress</Text>
        <Text style={classes.headscore}>Score</Text>
      </View>
      {myClass ? (
        <SafeAreaView style={{flex: 1}}>
          <FlatList
            data={myClass}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            renderItem={({item}) => {
              return (
                <View style={classes.myclass}>
                  <Text
                    style={classes.tableclassname}
                    onPress={() =>
                      props.navigation.navigate('ClassDetail', {
                        ...item,
                      })
                    }>
                    {item.Name}
                  </Text>
                  <View style={classes.tableprogress}>
                    <ProgressCircle
                      percent={70}
                      radius={20}
                      borderWidth={2.8}
                      color="#5784BA"
                      shadowColor="#E5E6EB"
                      bgColor="#fff">
                      <Text style={classes.textprogress}>{70 + '%'}</Text>
                    </ProgressCircle>
                  </View>
                  <Text
                    style={{
                      ...classes.tablescore,
                      color: setColor(90),
                    }}>
                    {90 || null}
                  </Text>
                  <MaterialIcons
                    name="more-vert"
                    color="#D2DEED"
                    size={32}
                    style={{
                      position: 'absolute',
                      right: 1,
                    }}
                  />
                </View>
              );
            }}
          />
        </SafeAreaView>
      ) : null}
    </>
  );
}

export default MyClassMember;
