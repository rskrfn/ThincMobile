/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import Material from 'react-native-vector-icons/MaterialIcons';
import classes from './Styles';
import axios from 'axios';
import {API_URL} from '@env';
import DP from '../../assets/images/profilepicture.png';

const Chat = props => {
  let userData = props.loginReducers.user?.data;
  const [modalVisible, setModalVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const [userList, setUserList] = useState([]);
  const getUsers = () => {
    let config = {
      method: 'GET',
      url: `${API_URL}/chat/user`,
      params: {id: userData.id},
    };
    axios(config)
      .then(res => {
        console.log(res.data.data);
        if (res.data.data.length > 0) {
          setUserList(res.data.data);
        }
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    const update = props.navigation.addListener('focus', () => {
      getUsers();
    });
    return () => {
      update;
    };
  }, [props.navigation]);
  // console.log(userData);
  return (
    <View style={classes.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Modal visible={modalVisible}>
        <View style={classes.modalcontainer}>
          <Text style={classes.modalheader}>Add Chat</Text>
          <View style={classes.inputgroup}>
            <View style={classes.input}>
              <Text style={classes.inputlabel}>Find user</Text>
              <TextInput
                style={classes.inputbox}
                autoCapitalize="words"
                value={userName}
                onChangeText={value => {
                  setUserName(value);
                }}
              />
            </View>
          </View>
          <View style={classes.btncontainer}>
            <TouchableOpacity
              style={classes.btnprimary}
              onPress={() => {
                setModalVisible(false);
              }}>
              <Text style={classes.btntextprimary}>Add</Text>
            </TouchableOpacity>
          </View>
          <View style={classes.btncontainer}>
            <TouchableOpacity
              style={classes.btnsecondary}
              onPress={() => {
                setModalVisible(false);
              }}>
              <Text style={classes.btntextsecondary}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={classes.header}>
        <View style={classes.infosection}>
          <Text style={classes.headertext}>Chats</Text>
          <View>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}>
              <Material name="add-circle" size={32} color={'#F9F9F9'} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={classes.searchsection}>
          <Material name="search" color="rgba(1, 6, 32, 0.5)" size={24} />
          <TextInput
            style={classes.inputsearch}
            placeholder="Search"
            placeholderTextColor={{color: '#010620'}}
          />
        </View>
      </View>
      {userList ? (
        <SafeAreaView
          style={{flex: 1, paddingHorizontal: 8, paddingVertical: 8}}>
          <FlatList
            data={userList}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            renderItem={({item}) => {
              return (
                <>
                  <View style={classes.maincontainer}>
                    <TouchableOpacity
                      style={classes.content}
                      onPress={() => {
                        props.navigation.navigate('ChatRoom', {...item});
                      }}>
                      <View style={classes.leftcontent}>
                        <Image
                          style={classes.image}
                          source={
                            item.display_picture === null
                              ? DP
                              : {uri: `${API_URL}${item.display_picture}`}
                          }
                        />
                        <View>
                          <Text style={classes.name}>{item.name}</Text>
                          <Text style={classes.lastmessage}>
                            *Last Message*
                          </Text>
                        </View>
                      </View>
                      <View>
                        <Text style={classes.timestamp}>*timestamp*</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </>
              );
            }}
          />
        </SafeAreaView>
      ) : (
        <Text>Not Found</Text>
      )}
    </View>
  );
};
const mapStateToProps = state => ({
  loginReducers: state.loginReducers,
});

const connectedChat = connect(mapStateToProps)(Chat);
export default connectedChat;
