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
  Alert,
  LogBox,
} from 'react-native';
import {Button, Input, Icon, Item, Picker} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProgressCircle from 'react-native-progress-circle';
import classes from './Styles';
import axios from 'axios';
import {API_URL} from '@env';
import {TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import NotifService from '../../../../NotifService';

function Member({...props}) {
  const [myClass, setMyClass] = useState();
  const [newClass, setNewClass] = useState([]);
  let [searchvalue, setSearch] = useState('');
  let [selectedCategory, setCategory] = useState(null);
  let [selectedLevel, setLevel] = useState(null);
  let [selectedPrice, setPrice] = useState(null);
  let [selectedSort, setSort] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);
  const userId = props.loginReducer.user.data?.id;
  const TOKEN = props.loginReducer.user.data?.token;
  // console.log(userId);

  const [registerToken, setRegisterToken] = useState('');
  const [fcmRegistered, setFcmRegistered] = useState(false);

  const onRegister = token => {
    setRegisterToken(token.token);
    setFcmRegistered(true);
  };

  const onNotif = notif => {
    Alert.alert(notif.title, notif.message);
  };

  const notif = new NotifService(onRegister, onNotif);

  // const handlePerm = perms => {
  //   Alert.alert('Permissions', JSON.stringify(perms));
  // };

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
      url: `${API_URL}/courses/all`,
      params: {
        userid: userId,
        search: searchvalue,
        sort: selectedSort,
        category: selectedCategory,
        level: selectedLevel,
        price: selectedPrice,
        page: currentPage,
      },
    };
    axios(config)
      .then(res => {
        console.log(res);
        setNewClass(res.data.data.result);
        setTotalPage(res.data.data.info.totalPage);
        setPrev(res.data.data.info.prev);
        setNext(res.data.data.info.next);
      })
      .catch(err => console.log({err}));
  };

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

  const filterHandler = React.useCallback(async () => {
    try {
      setRefreshing(true);
      setNewClass('');
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

  const onRegisterCourse = async (id, name) => {
    try {
      let config = {
        method: 'POST',
        url: `${API_URL}/courses/register`,
        data: {userid: userId, courseid: id},
        headers: {'x-access-token': TOKEN},
      };
      axios(config)
        .then(res => {
          if (res.status === 200) {
            onRefresh();
            return notif.localNotif('', `Successfully register on ${name}`);
          }
          // console.log(res);
          // setNewClass(res.data.data);
          // setCurrentPage(res.data.data.info.page);
          // setTotalPage(res.data.data.info.totalPage);
        })
        .catch(err => console.log({err}));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    getMyClass();
    getNewClass();
  }, []);
  console.log(searchvalue);
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
              nestedScrollEnabled
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
                      props.navigation.navigate('ClassDetail', {
                        ...item,
                      });
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
                  value={searchvalue}
                  onChangeText={value => {
                    console.log(value);
                    setSearch(value);
                  }}
                />
              </Item>
              <Button
                style={classes.btnSearch}
                onPress={() => {
                  let config = {
                    method: 'GET',
                    url: `${API_URL}/courses/all`,
                    params: {
                      userid: userId,
                      search: searchvalue,
                      sort: selectedSort,
                      category: selectedCategory,
                      level: selectedLevel,
                      price: selectedPrice,
                      page: currentPage,
                    },
                  };
                  axios(config)
                    .then(res => {
                      console.log(res);
                      setNewClass(res.data.data.result);
                      setTotalPage(res.data.data.info.totalPage);
                      setPrev(res.data.data.info.prev);
                      setNext(res.data.data.info.next);
                    })
                    .catch(err => console.log({err}));
                }}>
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
          <ScrollView
            horizontal
            style={classes.filterSection}
            showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              style={classes.filterbtn}
              onPress={() => {
                let config = {
                  method: 'GET',
                  url: `${API_URL}/courses/all`,
                  params: {
                    userid: userId,
                    search: searchvalue,
                    sort: selectedSort,
                    category: selectedCategory,
                    level: selectedLevel,
                    price: selectedPrice,
                    page: currentPage,
                  },
                };
                axios(config)
                  .then(res => {
                    console.log(res);
                    setNewClass(res.data.data.result);
                    setTotalPage(res.data.data.info.totalPage);
                    setPrev(res.data.data.info.prev);
                    setNext(res.data.data.info.next);
                  })
                  .catch(err => console.log({err}));
              }}>
              <Text style={classes.filterbtntext}>Filter</Text>
            </TouchableOpacity>
            <Item picker style={{width: 100, overflow: 'hidden'}}>
              <Picker
                mode="dropdown"
                style={{width: 140}}
                selectedValue={selectedCategory}
                onValueChange={e => setCategory(e)}>
                <Picker.Item
                  label="Category"
                  value=""
                  style={classes.pickeritem}
                />
                <Picker.Item
                  label="Software"
                  value="Software"
                  style={classes.pickeritem}
                />
                <Picker.Item
                  label="History"
                  value="History"
                  style={classes.pickeritem}
                />
                <Picker.Item
                  label="Psychology"
                  value="Psychology"
                  style={classes.pickeritem}
                />
                <Picker.Item
                  label="Finance"
                  value="Finance"
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
                style={{width: 140}}
                selectedValue={selectedLevel}
                onValueChange={e => setLevel(e)}>
                <Picker.Item
                  label="Level"
                  value=""
                  style={classes.pickeritem}
                />
                <Picker.Item
                  label="Beginner"
                  value="Beginner"
                  style={classes.pickeritem}
                />
                <Picker.Item
                  label="Intermediate"
                  value="Intermediate"
                  style={classes.pickeritem}
                />
                <Picker.Item
                  label="Advance"
                  value="Advance"
                  style={classes.pickeritem}
                />
              </Picker>
              <MaterialIcons
                name="expand-more"
                size={18}
                style={{position: 'absolute', right: 0}}
              />
            </Item>
            <Item picker style={{width: 75, overflow: 'hidden'}}>
              <Picker
                mode="dropdown"
                style={{width: 140}}
                selectedValue={selectedPrice}
                onValueChange={e => setPrice(e)}>
                <Picker.Item
                  label="Price"
                  value=""
                  style={classes.pickeritem}
                />
                <Picker.Item
                  label="Free"
                  value="0"
                  style={classes.pickeritem}
                />
                <Picker.Item
                  label="$10"
                  value="10"
                  style={classes.pickeritem}
                />
                <Picker.Item
                  label="$50"
                  value="50"
                  style={classes.pickeritem}
                />
              </Picker>
              <MaterialIcons
                name="expand-more"
                size={18}
                style={{position: 'absolute', right: 0}}
              />
            </Item>
            <Item picker style={{width: 160, overflow: 'hidden'}}>
              <Picker
                mode="dropdown"
                style={{width: 200}}
                selectedValue={selectedSort}
                onValueChange={e => setSort(e)}>
                <Picker.Item
                  label="Sort By"
                  value=""
                  style={classes.pickeritem}
                />
                <Picker.Item
                  label="Category ASC"
                  value="Category-AZ"
                  style={classes.pickeritem}
                />
                <Picker.Item
                  label="Category DESC"
                  value="Category-ZA"
                  style={classes.pickeritem}
                />
                <Picker.Item
                  label="Level ASC"
                  value="Level-AZ"
                  style={classes.pickeritem}
                />
                <Picker.Item
                  label="Level DESC"
                  value="Level-ZA"
                  style={classes.pickeritem}
                />
                <Picker.Item
                  label="Price ASC"
                  value="Price-AZ"
                  style={classes.pickeritem}
                />
                <Picker.Item
                  label="Price DESC"
                  value="Price-ZA"
                  style={classes.pickeritem}
                />
              </Picker>
              <MaterialIcons
                name="expand-more"
                size={18}
                style={{position: 'absolute', right: 18}}
              />
            </Item>
          </ScrollView>
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
                        onPress={() => {
                          props.navigation.navigate('ClassDetail', {
                            ...item,
                          });
                        }}>
                        {item.Name && item.Name.length > 25
                          ? item.Name.slice(0, 25) + '...'
                          : item.Name}
                      </Text>
                      <Text style={classes.newlevel}>{item.Level}</Text>
                      <Text style={classes.newprice}>
                        {item.Price === 0 ? 'Free' : item.Price}
                      </Text>
                      <TouchableOpacity
                        style={classes.newbtnregister}
                        onPress={() => {
                          onRegisterCourse(item.id, item.Name);
                        }}>
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
