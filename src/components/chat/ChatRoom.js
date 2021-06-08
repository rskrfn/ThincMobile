import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import classes from './Styles';
import Material from 'react-native-vector-icons/MaterialIcons';
import {useSocket} from '../../context/SocketProvider';

const ChatRoom = props => {
  const [message, setMessage] = useState();
  const [messageHistory, setHistory] = useState([]);
  const userData = props.route.params.senderData;
  const receiverData = props.route.params.receiverData;
  console.log(props.route.params);

  const socket = useSocket();

  const privatechat = () => {
    const body = {msg: message, sender: userData.id};
    const cb = ({status}) => {
      if (status) {
        console.log(status);
        setMessage('');
        setHistory(prevMessage => {
          return [...prevMessage, body];
        });
      }
    };
    socket.emit('private', body, receiverData.id, cb);
  };

  useEffect(() => {
    socket.on('getMessage', body => {
      console.log('body', body);
      setHistory(prevMsg => {
        return [...prevMsg, body];
      });
    });
  }, [socket]);
  console.log('messagehistory', messageHistory);
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
          <Text style={classes.headertext}>{receiverData.name}</Text>
        </View>
      </View>
      <ScrollView style={classes.chatcontainer}>
        {messageHistory.map((item, index) => {
          return (
            <View
              style={
                item.sender === userData.id
                  ? classes.chatcontentsender
                  : classes.chatcontent
              }
              key={index}>
              <Text
                style={
                  item.sender === userData.id
                    ? classes.chattextsender
                    : classes.chattext
                }>
                {item.msg}
              </Text>
            </View>
          );
        })}
      </ScrollView>
      <View style={classes.inputgroup}>
        <TextInput
          style={classes.input}
          placeholder="Type your message"
          placeholderTextColor={'grey'}
          value={message}
          onChangeText={value => {
            setMessage(value);
          }}
        />
        <TouchableOpacity style={classes.sendbtn} onPress={privatechat}>
          <Material name="send" size={24} color={'white'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatRoom;
