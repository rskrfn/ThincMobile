/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {Item, Picker, Toast} from 'native-base';
import classes from './Styles';
import MemberIcon from '../../../assets/icons/icon_student.png';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {API_URL} from '@env';
import axios from 'axios';

const Facilitator = props => {
  const [date, setDate] = useState(new Date());
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showStartModal, setShowStart] = useState(false);
  const [showEndModal, setShowEnd] = useState(false);
  const [myClass, setMyclass] = useState();
  const [newClass, setNewClass] = useState({
    coursename: '',
    category: '',
    level: '',
    price: '',
    description: '',
  });

  const profileData = useSelector(state => state.loginReducers?.user);

  const getFacilitatorClass = () => {
    let config = {
      method: 'GET',
      url: `${API_URL}/courses/facilitatorclass`,
      headers: {'x-access-token': profileData.token},
      params: {id: profileData.data?.id},
    };
    axios(config)
      .then(res => {
        console.log(res);
        if (res.data?.message === "Particular user doesn't have any courses") {
          setMyclass(false);
        }
        if (res.data?.data.length > 0) {
          setMyclass(res.data.data);
        }
      })
      .catch(err => {
        console.log({err});
      });
  };

  const createCourse = () => {
    if (
      !newClass.coursename ||
      !newClass.category ||
      !newClass.level ||
      !newClass.price ||
      !newClass.description
    ) {
      return Toast.show({
        text: 'Fill the data',
        type: 'warning',
        textStyle: {textAlign: 'center'},
        duration: 3000,
      });
    }
    const config = {
      method: 'POST',
      url: `${API_URL}/courses/addcourse`,
      headers: {'x-access-token': profileData.token},
      data: {
        id: profileData.data?.id,
        coursename: newClass.coursename,
        category: newClass.category,
        level: newClass.level,
        price: newClass.price,
        description: newClass.description,
        schedule: moment(date).format('YYYY-MM-DD'),
        start: moment(start).format('HH:mm:ss'),
        end: moment(end).format('HH:mm:ss'),
      },
    };
    console.log(config.data);
    axios(config)
      .then(res => {
        console.log(res);
        getFacilitatorClass();
        setNewClass({
          ...newClass,
          coursename: '',
          category: '',
          level: '',
          price: '',
          description: '',
        });
        setDate(new Date());
        setStart(new Date());
        setEnd(new Date());
        return Toast.show({
          text: 'Course Created',
          type: 'success',
          textStyle: {textAlign: 'center'},
          duration: 3000,
        });
      })
      .catch(err => {
        console.log({err});
        return Toast.show({
          text: 'Error Occured',
          type: 'danger',
          textStyle: {textAlign: 'center'},
          duration: 3000,
        });
      });
  };

  useEffect(() => {
    getFacilitatorClass();
  }, []);

  console.log('newclass', newClass);

  return (
    <ScrollView>
      <Modal
        transparent
        style={classes.modaldate}
        visible={showDate}
        onRequestClose={() => {
          setShowDate(false);
        }}>
        <View style={classes.modalcontainer}>
          <View style={classes.datepicker}>
            <DatePicker
              mode={'date'}
              date={date}
              onDateChange={value => {
                setDate(value);
              }}
            />
            <TouchableOpacity
              style={classes.modalbtn}
              onPress={() => {
                setShowDate(false);
              }}>
              <Text style={classes.modalbtntext}>Select</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        transparent
        style={classes.modaldate}
        visible={showStartModal}
        onRequestClose={() => {
          setShowStart(false);
        }}>
        <View style={classes.modalcontainer}>
          <View style={classes.datepicker}>
            <DatePicker
              mode="time"
              date={start}
              onDateChange={value => {
                setStart(value);
              }}
            />
            <TouchableOpacity
              style={classes.modalbtn}
              onPress={() => {
                setShowStart(false);
              }}>
              <Text style={classes.modalbtntext}>Select</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        transparent
        style={classes.modaldate}
        visible={showEndModal}
        onRequestClose={() => {
          setShowEnd(false);
        }}>
        <View style={classes.modalcontainer}>
          <View style={classes.datepicker}>
            <DatePicker
              mode="time"
              date={end}
              onDateChange={value => {
                setEnd(value);
              }}
            />
            <TouchableOpacity
              style={classes.modalbtn}
              onPress={() => {
                setShowEnd(false);
              }}>
              <Text style={classes.modalbtntext}>Select</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={classes.container}>
        <Text style={classes.textpage}>My class</Text>
        <View style={classes.header}>
          <Text style={classes.headmyclass}>Class Name</Text>
          <Text style={classes.headstudent}>Students</Text>
        </View>
      </View>
      <View style={classes.myclasscontainer}>
        {myClass
          ? myClass.slice(0, 3).map((item, index) => {
              // console.log(item);
              return (
                <TouchableOpacity style={classes.myclass} key={index}>
                  <Text style={classes.tableclassname}>{item.course_name}</Text>
                  <View style={classes.tablestudent}>
                    <Text style={classes.studenttext}>{item.students}</Text>
                    <Image style={classes.studenticon} source={MemberIcon} />
                  </View>
                  <MaterialIcons
                    name="chevron-right"
                    color="black"
                    size={32}
                    style={classes.arrowicon}
                  />
                </TouchableOpacity>
              );
            })
          : null}
      </View>
      <View style={classes.allmyclass}>
        <Text
          style={classes.textallmyclass}
          onPress={() =>
            props.navigation.navigate('MyClassFacilitator', {data: myClass})
          }>
          view all
        </Text>
        <MaterialIcons name="chevron-right" size={20} style={{marginTop: 1}} />
      </View>
      <View style={classes.createnewclass}>
        <Text style={classes.newclassheader}>Create new class</Text>
        <View style={classes.inputgroup}>
          <View style={classes.input}>
            <Text style={classes.inputdesc}>Class Name</Text>
            <Text>:</Text>
            <TextInput
              style={classes.inputbox}
              placeholder="Enter class name"
              autoCapitalize="words"
              value={newClass.coursename}
              onChangeText={value => {
                setNewClass({...newClass, coursename: value});
              }}
            />
          </View>
        </View>
        <View style={classes.inputgroup}>
          <View style={classes.input}>
            <Text style={classes.inputdesc}>Categories</Text>
            <Text>:</Text>
            <Item picker style={classes.categorypicker}>
              <Picker
                mode="dialog"
                style={{marginLeft: -15}}
                selectedValue={newClass.category}
                onValueChange={value => {
                  setNewClass({...newClass, category: value});
                }}>
                <Picker.Item
                  label="Category"
                  value=""
                  style={classes.pickeritem}
                />
                <Picker.Item
                  label="Software"
                  value="1"
                  style={classes.pickeritem}
                />
                <Picker.Item
                  label="History"
                  value="2"
                  style={classes.pickeritem}
                />
                <Picker.Item
                  label="Psychology"
                  value="3"
                  style={classes.pickeritem}
                />
                <Picker.Item
                  label="Finance"
                  value="4"
                  style={classes.pickeritem}
                />
                <Picker.Item
                  label="Math"
                  value="5"
                  style={classes.pickeritem}
                />
                <Picker.Item
                  label="Science"
                  value="6"
                  style={classes.pickeritem}
                />
              </Picker>
            </Item>
          </View>
        </View>
        <View style={classes.inputgroup}>
          <View style={classes.input}>
            <Text style={classes.inputdesc}>Course Level</Text>
            <Text>:</Text>
            <Item picker style={classes.categorypicker}>
              <Picker
                mode="dialog"
                style={{marginLeft: -15}}
                selectedValue={newClass.level}
                onValueChange={value => {
                  setNewClass({...newClass, level: value});
                }}>
                <Picker.Item
                  label="Course level"
                  value=""
                  style={classes.pickeritem}
                />
                <Picker.Item
                  label="Beginner"
                  value="1"
                  style={classes.pickeritem}
                />
                <Picker.Item
                  label="Intermediate"
                  value="2"
                  style={classes.pickeritem}
                />
                <Picker.Item
                  label="Advance"
                  value="3"
                  style={classes.pickeritem}
                />
              </Picker>
            </Item>
          </View>
        </View>
        <View style={classes.inputgroup}>
          <View style={classes.input}>
            <Text style={classes.inputdesc}>Pricing</Text>
            <Text>:</Text>
            <Text style={{position: 'absolute', left: '32%'}}>$</Text>
            <TextInput
              style={{...classes.inputbox, paddingLeft: '5%'}}
              placeholder="Enter course price"
              keyboardType="number-pad"
              value={newClass.price}
              onChangeText={value => {
                setNewClass({...newClass, price: value});
              }}
            />
          </View>
        </View>
        <View style={classes.inputgroup}>
          <View style={{...classes.input, marginVertical: 10}}>
            <Text style={classes.inputdesc}>Schedule</Text>
            <Text>:</Text>
            <TouchableOpacity
              style={classes.schedule}
              onPress={() => {
                setShowDate(true);
              }}>
              <Text style={classes.date}>{moment(date).format('dddd')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowStart(true);
              }}>
              <Text style={classes.start}>
                {moment(start).format('hh:mm A')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowEnd(true);
              }}>
              <Text style={classes.end}>{moment(end).format('hh:mm A')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={classes.inputgroup}>
          <View style={classes.input}>
            <Text style={classes.inputdesc}>Description</Text>
            <Text>:</Text>
          </View>
        </View>
        <TextInput
          style={classes.inputboxarea}
          multiline={true}
          numberOfLines={5}
          placeholder="Course description"
          value={newClass.description}
          onChangeText={value => {
            setNewClass({...newClass, description: value});
          }}
        />
        <TouchableOpacity
          style={classes.createbtn}
          onPress={() => {
            createCourse();
          }}>
          <Text style={classes.createbtntext}>Create</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Facilitator;
