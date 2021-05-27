import React from 'react';
import {View, Text, TextInput} from 'react-native';
import Material from 'react-native-vector-icons/MaterialIcons';
import classes from './Styles';

const Chat = () => {
  return (
    <View style={classes.container}>
      <View style={classes.header}>
        <View style={classes.infosection}>
          <Text style={classes.headertext}>Chats</Text>
          <Material name="add-circle" size={32} color={'#F9F9F9'} />
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
