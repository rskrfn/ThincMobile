/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import {Button, Input, Icon, Item, Picker} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProgressCircle from 'react-native-progress-circle';
import classes from './Styles';
import axios from 'axios';
import {API_URL} from '@env';
import {TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

function Member({...props}) {
  const [myClass, setMyClass] = useState();
  const [newClass, setNewClass] = useState([]);
  const [selectedCategory, setCategory] = useState('');
  const [selectedPrice, setPrice] = useState('');
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPage, setTotalPage] = useState(1);
  const userId = props.loginReducer.user.data?.data.id;
  // console.log(userId);

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

  const getNewClass = () => {
    let config = {
      method: 'GET',
      url: `${API_URL}/courses/newclass`,
      params: {id: userId},
    };
    axios(config)
      .then(res => {
        console.log(res);
        setNewClass(res.data.data);
        // setCurrentPage(res.data.data.info.page);
        // setTotalPage(res.data.data.info.totalPage);
      })
      .catch(err => console.log({err}));
  };

  const getObjective = id => {
    let config = {
      method: 'GET',
      url: `${API_URL}/courses/objective`,
      params: {courseid: id},
    };
    axios(config)
      .then(res => {
        // console.log(res.data.data[0].Objective);
        if (res.data.data.length > 0) {
          let value = res.data.data[0].Objective;
          return value;
        } else {
          return null;
        }
      })
      .catch(() => {});
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
      showsVerticalScrollIndicator={false}
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
              scrollEnabled={false}
              data={myClass.slice(0, 3)}
              keyExtractor={(item, index) => {
                return index.toString();
              }}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    style={classes.myclass}
                    onPress={() => {
                      let config = {
                        method: 'GET',
                        url: `${API_URL}/courses/objective`,
                        params: {courseid: item.id},
                      };
                      axios(config)
                        .then(res => {
                          // console.log(res.data.data[0].Objective);
                          if (res.data.data.length > 0) {
                            let Objective = res.data.data[0].Objective;
                            props.navigation.navigate('ClassDetail', {
                              ...item,
                              Objective,
                            });
                          }
                        })
                        .catch(err => console.log(err));
                    }}>
                    <Text style={classes.tableclassname}>{item.Name}</Text>
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
                  </TouchableOpacity>
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
                scrollEnabled={false}
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
                        {item.Name && item.Name.length > 30
                          ? item.Name.slice(0, 30) + '...'
                          : item.Name}
                      </Text>
                      <Text style={classes.newlevel}>{item.Level}</Text>
                      <Text style={classes.newprice}>
                        {item.Price === 0 ? 'Free' : item.Price}
                      </Text>
                      <TouchableOpacity style={classes.newbtnregister}>
                        <Text style={classes.txtRegister}>Register</Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
                // ListFooterComponent={
                //   currentPage < totalPage ? (
                //     <View style={classes.loadMore}>
                //       <TouchableOpacity
                //         style={classes.btnLoadMore}
                //         // onPress={() => {
                //         //   setCurrentPage(currentPage);
                //         // }}
                //         >
                //         <Text style={classes.load}>Expand</Text>
                //         <MaterialIcons
                //           name="expand-more"
                //           color="#ADA9A9"
                //           size={24}
                //           style={classes.loadarrow}
                //         />
                //       </TouchableOpacity>
                //     </View>
                //   ) : null
                // }
              />
            ) : (
              <View style={classes.servererror}>
                <Text style={classes.texterror}>404</Text>
                <Text style={classes.texterror}>Server Error</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const mapStatetoProps = state => {
  return {
    loginReducer: state.loginReducers,
  };
};
const connectedMember = connect(mapStatetoProps)(Member);
export default connectedMember;
