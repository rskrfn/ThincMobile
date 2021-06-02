import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Modal, TouchableOpacity} from 'react-native';
import Material from 'react-native-vector-icons/MaterialIcons';
import classes from './Styles';

const Chat = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [userName, setUserName] = useState('');
  return (
    <View style={classes.container}>
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
    </View>
  );
};

export default Chat;
