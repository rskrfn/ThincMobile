/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import classes from './Styles';
import ProgressCircle from 'react-native-progress-circle';
import axios from 'axios';
import {API_URL} from '@env';
import {connect} from 'react-redux';

function MyClassMember({...props}) {
  const [myClass, setMyClass] = useState();
  const [info, setInfo] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const userId = props.loginReducer.user.data?.id;

  const getMyClass = () => {
    let config = {
      method: 'GET',
      url: `${API_URL}/courses/myclass`,
      params: {
        id: userId,
        page: currentPage,
      },
    };
    axios(config)
      .then(res => {
        // console.log(res);
        if (res.data.data.result.length > 0) {
          setMyClass(res.data.data.result);
          setInfo(res.data.data.info);
        } else {
          setMyClass('');
        }
      })
      .catch(() => setMyClass());
  };

  useEffect(() => {
    getMyClass();
  }, [currentPage]);

  const pageList = () => {
    let pages = [];
    for (let i = 1; i <= info?.totalPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pages = pageList();
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

  console.log('info', info);
  return (
    <View style={classes.maincontainer}>
      <View style={classes.uppersection}>
        <ScrollView>
          <View style={classes.header}>
            <Text style={classes.headmyclass}>Class Name</Text>
            <Text style={classes.headprogress}>Progress</Text>
            <Text style={classes.headscore}>Score</Text>
          </View>
          {myClass
            ? myClass.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={classes.myclass}
                    onPress={() =>
                      props.navigation.navigate('ClassDetail', {
                        ...item,
                      })
                    }>
                    <Text style={classes.tableclassname}>{item.Name}</Text>
                    <View style={classes.tableprogress}>
                      <ProgressCircle
                        percent={70}
                        radius={20}
                        borderWidth={2.8}
                        color="#5784BA"
                        shadowColor="#E5E6EB"
                        bgColor="#fff">
                        <Text style={classes.textprogress}>70</Text>
                      </ProgressCircle>
                    </View>
                    <Text
                      style={{
                        ...classes.tablescore,
                        color: setColor(90),
                      }}>
                      90
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
                  </TouchableOpacity>
                );
              })
            : null}
        </ScrollView>
      </View>

      <View
        style={{
          ...classes.pagination,
        }}>
        <View style={classes.leftpagination}>
          <Text style={classes.paginationinfo}>Showing</Text>
          <Text style={classes.paginationinfo}>
            {' '}
            {(info?.currpage - 1) * 10 + (myClass?.length || 0)}{' '}
          </Text>
          <Text style={classes.paginationinfo}>out of</Text>
          <Text style={classes.paginationinfo}>
            {myClass ? ' ' + info?.count : ' ' + 0}
          </Text>
        </View>
        <View style={classes.rightpagination}>
          <TouchableOpacity
            style={
              info?.prev !== null
                ? classes.paginationbtn
                : classes.paginationbtndisable
            }
            disabled={!info?.prev}
            onPress={() => {
              if (info?.prev === null) {
                return;
              }
              setCurrentPage(currentPage - 1);
            }}>
            <MaterialIcons
              name="chevron-left"
              size={24}
              color={!info?.prev ? 'white' : 'black'}
            />
          </TouchableOpacity>
          {pages.map((page, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={
                  currentPage === page
                    ? classes.paginationbtnactive
                    : classes.paginationbtn
                }
                onPress={() => {
                  setCurrentPage(page);
                }}>
                <Text
                  style={
                    currentPage === page
                      ? classes.paginationtextactive
                      : classes.paginationtext
                  }>
                  {page}
                </Text>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity
            style={
              info?.next !== null
                ? classes.paginationbtn
                : classes.paginationbtndisable
            }
            disabled={!info?.next}
            onPress={() => {
              if (currentPage === info?.totalPage) {
                return;
              }
              setCurrentPage(currentPage + 1);
            }}>
            <MaterialIcons
              name="chevron-right"
              size={24}
              color={!info?.next ? 'white' : 'black'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const mapStatetoProps = state => {
  return {
    loginReducer: state.loginReducers,
  };
};
const connectedMyClassMember = connect(mapStatetoProps)(MyClassMember);

export default connectedMyClassMember;
