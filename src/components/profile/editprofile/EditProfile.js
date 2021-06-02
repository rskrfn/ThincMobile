import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Animated,
  Image,
  TextInput,
  ImageBackground,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {Toast} from 'native-base';
import axios from 'axios';
import {API_URL} from '@env';
import {connect} from 'react-redux';
import classes from './Styles';
import DP from '../../../assets/images/profilepicture.jpg';
import LinearGradient from 'react-native-linear-gradient';

const EditProfile = props => {
  const TOKEN = props.loginReducers.user?.token;
  const userId = props.loginReducers.user?.data.id;
  const [dp, setdp] = useState();
  const [fullName, setFullName] = useState(props.ProfileData.name);
  const [nameEditable, setNameEditable] = useState(false);
  const [phone, setPhone] = useState(props.ProfileData.phone);
  const [phoneEditable, setPhoneEditable] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1000)).current;
  const FormData = require('form-data');
  const data = new FormData();
  data.append('id', userId);
  const config = {
    method: 'patch',
    url: `${API_URL}/profile/`,
    headers: {
      token: TOKEN,
    },
    data: data,
  };

  const swipeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const swipeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 1000,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      props.setProfileModal(false);
    });
  };

  const useCamera = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        setdp(image.path);
      })
      .catch(err => {
        if (err.code === 'E_PICKER_CANCELLED') {
          return Alert.alert('Action Canceled', 'No photo submitted');
        }
      });
  };
  const useGallery = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        setdp(image.path);
      })
      .catch(err => {
        if (err.code === 'E_PICKER_CANCELLED') {
          return Alert.alert('Action Canceled', 'No photo submitted');
        }
      });
  };
  React.useEffect(() => {
    swipeIn();
  }, []);

  function fullnameWarning() {
    if (!nameEditable) {
      return (
        <View style={classes.warning}>
          <Text style={{...classes.inputwarning, color: '#ADA9BB'}}>
            Long press to edit
          </Text>
        </View>
      );
    }
    let splittedName = fullName.split(' ');
    if (splittedName[0].length < 2) {
      return (
        <View style={classes.warning}>
          <Text style={{...classes.inputwarning, color: 'rgb(255, 19, 19)'}}>
            First name must be at least 2 characters
          </Text>
        </View>
      );
    }
    if (splittedName[1] && splittedName[1].length < 2) {
      return (
        <View style={classes.warning}>
          <Text style={{...classes.inputwarning, color: 'rgb(255, 19, 19)'}}>
            Last / Middle name must be at least 2 characters
          </Text>
        </View>
      );
    }
    if (splittedName[2] && splittedName[2].length < 2) {
      return (
        <View style={classes.warning}>
          <Text style={{...classes.inputwarning, color: 'rgb(255, 19, 19)'}}>
            Last / Middle name must be at least 2 characters
          </Text>
        </View>
      );
    }
    if (!splittedName[1]) {
      return (
        <View style={classes.warning}>
          <Text style={{...classes.inputwarning, color: '#010620'}}>
            Enter your full name
          </Text>
        </View>
      );
    }
  }
  function phoneWarning() {
    if (!phoneEditable) {
      return (
        <View style={classes.warning}>
          <Text style={{...classes.inputwarning, color: '#ADA9BB'}}>
            Long press to edit
          </Text>
        </View>
      );
    }
    if (phone.length < 10 || phone.length > 12) {
      return (
        <View style={classes.warning}>
          <Text style={{...classes.inputwarning, color: 'rgb(255, 19, 19)'}}>
            Phone must be at least between 10 and 12 digits
          </Text>
        </View>
      );
    }
  }
  console.log(props);
  return (
    <Animated.ScrollView
      showsVerticalScrollIndicator={false}
      bounces
      style={[classes.modalcontainer, {translateX: fadeAnim}]}>
      <View style={classes.container}>
        <Text style={classes.header}>Edit Profile</Text>
        {dp ? (
          <ImageBackground
            imageStyle={{borderRadius: 100}}
            style={classes.profilepicture}
            source={{uri: dp}}
          />
        ) : (
          <Image style={classes.profilepicture} source={DP} />
        )}
        <View style={classes.btngroup}>
          <View style={classes.btncontainer}>
            <TouchableOpacity style={classes.btnprimary} onPress={useCamera}>
              <Text style={classes.btntextprimary}>Camera</Text>
            </TouchableOpacity>
          </View>
          <View style={classes.btncontainer}>
            <TouchableOpacity style={classes.btnsecondary} onPress={useGallery}>
              <Text style={classes.btntextsecondary}>Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={classes.inputgroup}>
          <TouchableOpacity
            style={classes.input}
            onLongPress={() => {
              setNameEditable(true);
            }}>
            <LinearGradient
              locations={[0.5, 0.5]}
              colors={
                nameEditable
                  ? ['white', 'white']
                  : ['white', 'rgba(229, 230, 235, 1)']
              }
              style={classes.gradient}>
              <Text style={classes.inputlabel}>Full Name</Text>
            </LinearGradient>
            <TextInput
              style={
                nameEditable
                  ? classes.inputbox
                  : {
                      ...classes.inputbox,
                      backgroundColor: 'rgba(229, 230, 235, 1)',
                    }
              }
              autoCapitalize="words"
              value={fullName}
              editable={nameEditable}
              onChangeText={value => {
                setFullName(value);
              }}
            />
            {fullName ? fullnameWarning() : null}
          </TouchableOpacity>
          <TouchableOpacity
            style={classes.input}
            onLongPress={() => {
              setNameEditable(true);
            }}>
            <LinearGradient
              locations={[0.5, 0.5]}
              colors={
                phoneEditable
                  ? ['white', 'white']
                  : ['white', 'rgba(229, 230, 235, 1)']
              }
              style={classes.gradient}>
              <Text style={classes.inputlabel}>Phone Number</Text>
            </LinearGradient>
            <TextInput
              style={
                phoneEditable
                  ? classes.inputbox
                  : {
                      ...classes.inputbox,
                      backgroundColor: 'rgba(229, 230, 235, 1)',
                    }
              }
              keyboardType="phone-pad"
              autoCompleteType="tel"
              value={phone}
              editable={phoneEditable}
              placeholder="08**********"
              onChangeText={value => {
                setPhone(value);
              }}
            />
            {phone ? phoneWarning() : null}
          </TouchableOpacity>
        </View>
        <View style={classes.btncontainer}>
          <TouchableOpacity
            style={classes.btnprimary}
            onPress={async () => {
              swipeOut();
            }}>
            <Text style={classes.btntextprimary}>Save</Text>
          </TouchableOpacity>
        </View>
        <View style={classes.btncontainer}>
          <TouchableOpacity
            style={classes.btnsecondary}
            onPress={async () => {
              props.getProfile();
              swipeOut();
            }}>
            <Text style={classes.btntextsecondary}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.ScrollView>
  );
};
const mapStateToProps = state => ({
  loginReducers: state.loginReducers,
});
const connectedEditProfile = connect(mapStateToProps)(EditProfile);
export default connectedEditProfile;
