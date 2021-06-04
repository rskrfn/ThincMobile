/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, SafeAreaView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import classes from './Styles';
import ProgressCircle from 'react-native-progress-circle';
import axios from 'axios';
import {API_URL} from '@env';
import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';

function MyClassMember({...props}) {
  const [myClass, setMyClass] = useState();
  const userId = props.loginReducer.user.data?.id;
  useEffect(() => {}, []);

  const getMyClass = () => {
    let config = {
      method: 'GET',
      url: `${API_URL}/courses/myclass`,
      params: {id: userId},
    };
    axios(config)
      .then(res => {
        // console.log(res);
        if (res.data.data.length > 0) {
          setMyClass(res.data.data);
        } else {
          setMyClass('');
        }
      })
      .catch(() => setMyClass());
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
                  <TouchableOpacity
                    style={classes.tableclassname}
                    onPress={() =>
                      props.navigation.navigate('ClassDetail', {
                        ...item,
                      })
                    }>
                    {item.Name}
                  </TouchableOpacity>
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

const mapStatetoProps = state => {
  return {
    loginReducer: state.loginReducers,
  };
};
const connectedMyClassMember = connect(mapStatetoProps)(MyClassMember);

export default connectedMyClassMember;
