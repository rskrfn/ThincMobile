import React from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import classes from './Styles';
import Material from 'react-native-vector-icons/MaterialIcons';

const ChatRoom = props => {
  const userData = props.route.params;
  return (
    <View style={classes.maincontainer}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View style={classes.header}>
        <View style={classes.infosection}>
          <View>
            <TouchableOpacity
              onPress={() => {
                props.navigation.goBack();
              }}>
              <Material name="chevron-left" size={32} color={'#F9F9F9'} />
            </TouchableOpacity>
          </View>
          <Text style={classes.headertext}>{userData.name}</Text>
        </View>
      </View>
      <FlatList />
      <View>
        <TextInput />
      </View>
    </View>
  );
};

export default ChatRoom;
