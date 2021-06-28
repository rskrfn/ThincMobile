/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';
import classes from './Styles';
import Material from 'react-native-vector-icons/MaterialIcons';
import AllSchedule from '../../../components/dashboard/allschedule/AllSchedule';
import ForYou from '../../../components/dashboard/foryou/ForYou';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import axios from 'axios';
import {API_URL} from '@env';
import {useSelector} from 'react-redux';

const MemberDashboard = props => {
  const [date, setDate] = useState(new Date());
  const [datepicker, setdatepicker] = useState(false);
  const [activeTab, setActive] = useState(1);
  const tabList = ['All Schedule', 'For You'];
  const [allSchedule, setAllSchedule] = useState();
  const [forYou, setForYou] = useState();
  const profileData = useSelector(state => state.loginReducers.user?.data);

  const getAllSchedule = () => {
    let config = {
      method: 'GET',
      url: `${API_URL}/courses/allschedule`,
      params: {
        schedule: moment(date).format('YYYY-MM-DD'),
      },
    };
    axios(config)
      .then(res => {
        console.log('allschedule', res);
        if (res.data?.data.length > 0) {
          setAllSchedule(res.data.data);
        }
      })
      .catch(err => {
        console.log({err});
        if (err.response.data.message === 'Data not found') {
          setAllSchedule(false);
        }
      });
  };

  const getForYou = () => {
    let config = {
      method: 'GET',
      url: `${API_URL}/courses/foryou`,
      params: {
        userid: profileData.id,
        schedule: moment(date).format('YYYY-MM-DD'),
      },
    };
    axios(config)
      .then(res => {
        console.log('foryou', res);
        if (res.data?.data.length > 0) {
          setForYou(res.data.data);
        }
      })
      .catch(err => {
        if (err.response.data.message === 'Data not found') {
          setForYou(false);
        }
      });
  };

  useEffect(() => {
    getAllSchedule();
    getForYou();
  }, [date]);

  return (
    <>
      <Modal
        visible={datepicker}
        onRequestClose={() => {
          setdatepicker(false);
        }}>
        <View style={classes.modalcontainer}>
          <View style={classes.datepicker}>
            <DatePicker
              mode={'date'}
              date={date}
              onDateChange={value => {
                // console.log(value);
                setDate(value);
              }}
            />
            <TouchableOpacity
              style={classes.modalbtn}
              onPress={() => {
                setdatepicker(false);
              }}>
              <Text style={classes.modalbtntext}>Select</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={classes.schedule}>
        <View style={classes.uppersection}>
          <View style={classes.left}>
            <Text style={classes.myclass}>My Class</Text>
            <Text style={classes.date}>
              {moment(date).calendar(new Date(), {
                sameDay: '[Today]',
                nextDay: '[Tommorrow]',
                nextWeek: '[Next] ddd',
                lastDay: '[Yesterday]',
                lastWeek: '[Last] ddd',
                sameElse: 'ddd',
              }) +
                ', ' +
                moment(date).format('MMMM DD')}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setdatepicker(true);
            }}>
            <Material name="event" size={24} color={'#010620'} />
          </TouchableOpacity>
        </View>
        <View style={classes.bottomsection}>
          {tabList.map((tabName, index) => (
            <TouchableOpacity key={index} onPress={() => setActive(index)}>
              <Text
                style={{
                  ...classes.tabItem,
                  color: activeTab === index ? '#5784BA' : '#ADA9BB',
                }}>
                {tabName}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View>
          {activeTab === 0 ? (
            <AllSchedule data={allSchedule} />
          ) : (
            <ForYou data={forYou} />
          )}
        </View>
      </View>
    </>
  );
};

export default MemberDashboard;
