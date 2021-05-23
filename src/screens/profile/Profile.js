import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import axios from 'axios';
import {API_URL} from '@env';
import classes from './Styles';
import {logoutHandler} from '../../redux/Action/auth';
import Material from 'react-native-vector-icons/MaterialIcons';
import DP from '../../assets/images/profilepicture.jpg';
import iconPhone from '../../assets/icons/icon_phone.png';
import iconPassword from '../../assets/icons/icon_stars.png';
import iconChat from '../../assets/icons/icon_chat.png';
import iconNotif from '../../assets/icons/icon_notif.png';
import iconSecurity from '../../assets/icons/icon_lock.png';
import iconData from '../../assets/icons/icon_storage.png';
import iconFAQ from '../../assets/icons/icon_question.png';
import iconLogout from '../../assets/icons/icon_logout.png';

const Profile = props => {
  let name = props.loginReducers.user.data?.data.name;
  // let userId = props.loginReducers.user.data?.data.id;
  // const [profile, setProfile] = useState([]);

  // const getProfile = () => {
  //   axios
  //     .get(`${API_URL}/profile/`, {params: {id: userId}})
  //     .then(res => {
  //       console.log(res);
  //       setProfile(res.data.data);
  //     })
  //     .catch(err => console.log(err));
  // };

  const onClick = () => {
    props.onLogoutHandler();
  };
  console.log(props.navigation);
  return (
    <View style={classes.maincontainer}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View style={classes.container}>
        <View style={classes.headercontainer}>
          <View style={classes.header}>
            <Text style={classes.title}>Profile</Text>
            <View style={classes.profileinfo}>
              <Image style={classes.profilepicture} source={DP} />
              <View style={classes.info}>
                <Text style={classes.name}>{name ? name : 'User name'}</Text>
                <Text style={classes.status}>online</Text>
              </View>
            </View>
          </View>
        </View>
        <ScrollView>
          <View style={classes.menusection}>
            <Text style={classes.textsection}>Account</Text>
            <TouchableOpacity
              style={classes.submenus}
              onPress={() => {
                props.navigation.push('Phone');
              }}>
              <View style={classes.icontext}>
                <Image style={classes.settingicon} source={iconPhone} />
                <Text style={classes.textsetting}>Phone Numbers</Text>
              </View>
              <Material name={'chevron-right'} size={32} color={'#010620'} />
            </TouchableOpacity>
            <TouchableOpacity style={classes.submenus}>
              <View style={classes.icontext}>
                <Image style={classes.settingicon} source={iconPassword} />
                <Text style={classes.textsetting}>Change Password</Text>
              </View>
              <Material name={'chevron-right'} size={32} color={'#010620'} />
            </TouchableOpacity>
          </View>
          <View style={classes.menusection}>
            <Text style={classes.textsection}>Settings</Text>
            <TouchableOpacity style={classes.submenus}>
              <View style={classes.icontext}>
                <Image style={classes.settingicon} source={iconChat} />
                <Text style={classes.textsetting}>Chat Settings</Text>
              </View>
              <Material name={'chevron-right'} size={32} color={'#010620'} />
            </TouchableOpacity>
            <TouchableOpacity style={classes.submenus}>
              <View style={classes.icontext}>
                <Image style={classes.settingicon} source={iconNotif} />
                <Text style={classes.textsetting}>Push Notifications</Text>
              </View>
              <Material name={'chevron-right'} size={32} color={'#010620'} />
            </TouchableOpacity>
            <TouchableOpacity style={classes.submenus}>
              <View style={classes.icontext}>
                <Image style={classes.settingicon} source={iconSecurity} />
                <Text style={classes.textsetting}>Privacy and Security</Text>
              </View>
              <Material name={'chevron-right'} size={32} color={'#010620'} />
            </TouchableOpacity>
            <TouchableOpacity style={classes.submenus}>
              <View style={classes.icontext}>
                <Image style={classes.settingicon} source={iconData} />
                <Text style={classes.textsetting}>Data and Storage</Text>
              </View>
              <Material name={'chevron-right'} size={32} color={'#010620'} />
            </TouchableOpacity>
          </View>
          <View style={classes.menusection}>
            <Text style={classes.textsection}>Help</Text>
            <TouchableOpacity style={classes.submenus}>
              <View style={classes.icontext}>
                <Image style={classes.settingicon} source={iconFAQ} />
                <Text style={classes.textsetting}>F.A.Q</Text>
              </View>
              <Material name={'chevron-right'} size={32} color={'#010620'} />
            </TouchableOpacity>
            <TouchableOpacity style={classes.submenus} onPress={onClick}>
              <View style={classes.icontext}>
                <Image style={classes.settingicon} source={iconLogout} />
                <Text style={classes.textsetting}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
const mapStateToProps = state => ({
  loginReducers: state.loginReducers,
});
const mapDispatchToProps = dispatch => ({
  onLogoutHandler: () => {
    dispatch(logoutHandler());
  },
});
const connectedProfile = connect(mapStateToProps, mapDispatchToProps)(Profile);
export default connectedProfile;
