/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, Text, Modal, TouchableOpacity, Image} from 'react-native';
import DatePicker from 'react-native-date-picker';
import classes from './Styles';
import Material from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import axios from 'axios';
import {API_URL} from '@env';
import {useSelector} from 'react-redux';
import MemberIcon from '../../../assets/icons/icon_student.png';

const FacilitatorDashboard = props => {
  const [date, setDate] = useState(new Date());
  const [weekdates, setWeekDates] = useState();
  const [datepicker, setdatepicker] = useState(false);
  const [schedule, setSchedule] = useState(false);

  const profileData = useSelector(state => state.loginReducers.user);

  useEffect(() => {
    const weekstart = moment(date).startOf('week');
    const thisweekdate = [weekstart];
    for (let i = 1; i < 7; i++) {
      console.log(i);
      thisweekdate.push(moment(weekstart).add(i, 'd'));
    }
    setWeekDates(thisweekdate);
  }, [date]);

  const getSchedule = () => {
    let config = {
      method: 'GET',
      url: `${API_URL}/courses/facilitatorschedule`,
      headers: {
        'x-access-token': profileData.token,
      },
      params: {
        id: profileData.data?.id,
        schedule: moment(date).format('YYYY-MM-DD'),
      },
    };
    axios(config)
      .then(res => {
        console.log(res);

        if (res.data.message === 'Data Found') {
          setSchedule(res.data.data);
        }
      })
      .catch(err => {
        console.log({err});
        if (err.response.data?.message === 'No schedule found') {
          setSchedule(false);
        }
      });
  };

  useEffect(() => {
    getSchedule();
  }, [date]);

  console.log('date', moment(date).format('YYYY-MM-DD'));
  console.log(schedule);
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
                console.log(value);
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
            <TouchableOpacity
              onPress={() => {
                setdatepicker(true);
              }}>
              <Material name="event" size={24} color={'#010620'} />
            </TouchableOpacity>
          </View>
          <Text style={classes.date}>{moment(date).format('MMMM YYYY')}</Text>
          <View style={classes.weeklycal}>
            {weekdates?.map((item, index) => (
              <TouchableOpacity
                style={
                  moment(item).format('YYYY-MM-DD') ===
                  moment(date).format('YYYY-MM-DD')
                    ? classes.weeklycalcontaineractive
                    : classes.weeklycalcontainer
                }
                key={index}
                onPress={() => {
                  setDate(moment(item).toDate());
                }}>
                <Text
                  style={
                    moment(item).format('YYYY-MM-DD') ===
                    moment(date).format('YYYY-MM-DD')
                      ? classes.weeklycaldaysactive
                      : classes.weeklycaldays
                  }>
                  {moment(item).format('dd')}
                </Text>
                <Text
                  style={
                    moment(item).format('YYYY-MM-DD') ===
                    moment(date).format('YYYY-MM-DD')
                      ? classes.weeklycaldaysactive
                      : classes.weeklycaldays
                  }>
                  {moment(item).format('DD')}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={classes.bottomsection}>
          {schedule ? (
            schedule.map((item, index) => (
              <View style={classes.schedulecontainer} key={index}>
                <View style={classes.leftsection}>
                  <Text style={classes.coursetime}>
                    {item.start_time.slice(0, 5)} - {item.end_time.slice(0, 5)}
                  </Text>
                  <Text style={classes.coursename}>
                    {item.course_name.length > 25
                      ? item.course_name.slice(0, 25) + '...'
                      : item.course_name}
                  </Text>
                </View>
                <View style={classes.rightsection}>
                  <Text style={classes.coursestudent}>{item.students}</Text>
                  <Image style={classes.studenticon} source={MemberIcon} />
                </View>
              </View>
            ))
          ) : (
            <View style={classes.emptyschedule}>
              <Text style={classes.emptyscheduletext}>
                You don't have any schedule for today
              </Text>
            </View>
          )}
        </View>
        <TouchableOpacity style={classes.taskbtn}>
          <Material name="add-circle" color="white" size={24} />
          <Text style={classes.taskbtntext}>New Task</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default FacilitatorDashboard;
