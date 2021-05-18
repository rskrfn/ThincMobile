/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  SafeAreaView,
  LogBox,
  RefreshControl,
} from 'react-native';
import {Button, Input, Icon, Item, Picker} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProgressCircle from 'react-native-progress-circle';
import classes from './Styles';
import axios from 'axios';
import {TouchableOpacity} from 'react-native';

function Member({...props}) {
  const [myClass, setMyClass] = useState();
  const [newClass, setNewClass] = useState([]);
  const [selectedCategory, setCategory] = useState('');
  const [selectedPrice, setPrice] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  useEffect(() => {
    // LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const getMyClass = () => {
    axios
      .get('http://192.168.0.102:9080/courses/myclass')
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

  const getNewClass = () => {
    axios
      .get('http://192.168.0.102:9080/courses/all?limit=10')
      .then(res => {
        console.log(res);
        setNewClass(res.data.data.result);
        setCurrentPage(res.data.data.info.page);
        setTotalPage(res.data.data.info.totalPage);
      })
      .catch(err => console.log(err));
  };

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    try {
      setRefreshing(true);
      setMyClass('');
      setNewClass('');
      await getMyClass();
      await getNewClass();
      setRefreshing(false);
    } catch (err) {}
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

  useEffect(() => {
    getMyClass();
    getNewClass();
  }, []);
  return (
    <ScrollView
      nestedScrollEnabled
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={classes.container}>
        <Text style={classes.textpage}>My class</Text>
        <View style={classes.header}>
          <Text style={classes.headmyclass}>Class Name</Text>
          <Text style={classes.headprogress}>Progress</Text>
          <Text style={classes.headscore}>Score</Text>
        </View>
        {myClass ? (
          <SafeAreaView style={classes.maincontainer}>
            <FlatList
              nestedScrollEnabled
              data={myClass.slice(0, 3)}
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
        ) : (
          <View style={classes.servererror}>
            <Text style={classes.texterror}>404</Text>
            <Text style={classes.texterror}>Server Error</Text>
          </View>
        )}
        <View style={classes.allmyclass}>
          <Text
            style={classes.textallmyclass}
            onPress={() => props.navigation.navigate('MyClass')}>
            view all
          </Text>
          <Icon
            name="chevron-forward"
            style={{fontSize: 14}}
            onPress={() => props.navigation.navigate('MyClass')}
          />
        </View>
        <View style={classes.newClassSection}>
          <Text style={{...classes.newclassheader}}>New class</Text>
          <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={classes.searchSection}>
                <Item style={classes.searchInputContainer}>
                  <MaterialIcons name="search" color={'#ADA9A9'} size={24} />
                  <Input
                    placeholder="Quick search"
                    placeholderTextColor="#ADA9A9"
                    style={classes.searchInput}
                  />
                </Item>
                <Button style={classes.btnSearch}>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 13,
                      textAlign: 'center',
                    }}>
                    Search
                  </Text>
                </Button>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
          <View style={classes.filterSection}>
            <Item picker style={{width: 100, overflow: 'hidden'}}>
              <Picker
                mode="dropdown"
                style={{width: 145}}
                placeholder="Select your SIM"
                placeholderStyle={{color: '#bfc6ea'}}
                placeholderIconColor="#007aff"
                selectedValue={selectedCategory}
                onValueChange={e => setCategory(e)}>
                <Picker.Item
                  label="Software"
                  value="software"
                  style={classes.pickeritem}
                />
                <Picker.Item
                  label="History"
                  value="history"
                  style={classes.pickeritem}
                />
                <Picker.Item
                  label="Psychology"
                  value="psychology"
                  style={classes.pickeritem}
                />
                <Picker.Item
                  label="Finance"
                  value="finance"
                  style={classes.pickeritem}
                />
              </Picker>
              <MaterialIcons
                name="expand-more"
                size={18}
                style={{position: 'absolute', right: 0}}
              />
            </Item>
            <Item picker style={{width: 100, overflow: 'hidden'}}>
              <Picker
                mode="dropdown"
                style={{width: 145}}
                placeholder="Select your SIM"
                placeholderStyle={{color: '#bfc6ea'}}
                placeholderIconColor="#007aff"
                selectedValue={selectedCategory}
                onValueChange={e => setCategory(e)}>
                <Picker.Item
                  label="Beginner"
                  value="beginner"
                  style={classes.pickeritem}
                />
                <Picker.Item
                  label="Intermediate"
                  value="intermediate"
                  style={classes.pickeritem}
                />
                <Picker.Item
                  label="Advance"
                  value="advance"
                  style={classes.pickeritem}
                />
              </Picker>
              <MaterialIcons
                name="expand-more"
                size={18}
                style={{position: 'absolute', right: 0}}
              />
            </Item>
            <Item picker style={{width: 90, overflow: 'hidden'}}>
              <Picker
                mode="dropdown"
                style={{width: 145}}
                placeholder="Select your SIM"
                placeholderStyle={{color: '#bfc6ea'}}
                placeholderIconColor="#007aff"
                selectedValue={selectedPrice}
                onValueChange={e => setPrice(e)}>
                <Picker.Item
                  label="Free"
                  value="free"
                  style={classes.pickeritem}
                />
                <Picker.Item
                  label="Paid"
                  value="paid"
                  style={classes.pickeritem}
                />
              </Picker>
              <MaterialIcons
                name="expand-more"
                size={18}
                style={{position: 'absolute', right: 18}}
              />
            </Item>
          </View>
          <View style={classes.header}>
            <Text style={classes.headname}>Class Name</Text>
            <Text style={classes.headlevel}>Level</Text>
            <Text style={classes.headprice}>Price</Text>
          </View>
          <View style={classes.newClassItems}>
            {newClass ? (
              <FlatList
                data={newClass}
                keyExtractor={(item, index) => {
                  return index.toString();
                }}
                renderItem={({item}) => {
                  return (
                    <View style={classes.newClassItem}>
                      <Text
                        style={classes.newClassName}
                        onPress={() =>
                          props.navigation.navigate('ClassDetail', {
                            ...item,
                          })
                        }>
                        {item.course_name && item.course_name.length > 30
                          ? item.course_name.slice(0, 30) + '...'
                          : item.course_name}
                      </Text>
                      <Text style={classes.newlevel}>{item.level}</Text>
                      <Text style={classes.newprice}>
                        {item.price === 0 ? 'Free' : item.price}
                      </Text>
                      <TouchableOpacity style={classes.newbtnregister}>
                        <Text style={classes.txtRegister}>Register</Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
                ListFooterComponent={
                  currentPage < totalPage ? (
                    <View style={classes.loadMore}>
                      <TouchableOpacity
                        style={classes.btnLoadMore}
                        onPress={() => {
                          setCurrentPage(currentPage);
                        }}>
                        <Text style={classes.load}>Expand</Text>
                        <MaterialIcons
                          name="expand-more"
                          color="#ADA9A9"
                          size={24}
                          style={classes.loadarrow}
                        />
                      </TouchableOpacity>
                    </View>
                  ) : null
                }
              />
            ) : null}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default Member;
