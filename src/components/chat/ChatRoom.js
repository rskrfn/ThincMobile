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
  const room = props.route.params.room;
  console.log(props.route.params);

  const socket = useSocket();

  const sendMessage = () => {
    const body = {
      sender: userData.id,
      receiver: receiverData.id,
      room: room,
      message: message,
    };
    const cb = ({status}) => {
      if (status) {
        console.log(status);
        setHistory(prevMessage => {
          return [...prevMessage, body];
        });
      }
    };
    // console.log(body);
    socket.emit('send-message', body, room, cb);
    setMessage('');
  };

  const chat = () => {
    const body = {msg: message, sender: userData.id};
    const cb = ({status}) => {
      if (status) {
        console.log(status);
        setMessage('');
      }
    };
    socket.emit('chat', body, room, cb);
  };

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
    // socket.on('chat', body => {
    //   console.log(body);
    //   setHistory(prevMsg => {
    //     return [...prevMsg, body];
    //   });
    // });

    socket.on('getMessage', body => {
      console.log('body', body);
      setHistory(prevMsg => {
        return [...prevMsg, body];
      });
    });

    // return socket.off('chat');
    // const display = () => {
    //   socket.on('message-received', newMessage => {
    //     console.log(newMessage);
    //     setHistory(prevMessage => {
    //       return [...prevMessage, newMessage];
    //     });
    //   });
    // };
    // socket.on('connection', display);
    // return () => socket.off('connection', display);
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
