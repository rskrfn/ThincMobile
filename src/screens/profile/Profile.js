/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
  Modal,
  Alert,
} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import axios from 'axios';
import {API_URL} from '@env';
import classes from './Styles';
import {logoutHandler} from '../../redux/Action/auth';
import Material from 'react-native-vector-icons/MaterialIcons';
import DP from '../../assets/images/profilepicture.png';
import iconPassword from '../../assets/icons/icon_stars.png';
import iconChat from '../../assets/icons/icon_chat.png';
import iconNotif from '../../assets/icons/icon_notif.png';
import iconSecurity from '../../assets/icons/icon_lock.png';
import iconData from '../../assets/icons/icon_storage.png';
import iconFAQ from '../../assets/icons/icon_question.png';
import iconLogout from '../../assets/icons/icon_logout.png';

import EditModal from '../../components/profile/editprofile/EditProfile';

const Profile = props => {
  // const TOKEN = props.loginReducers.user?.data.token;
  let userData = props.loginReducers.user.data;
  const [profile, setProfile] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const dispatch = useDispatch();

  const getProfile = () => {
    let config = {
      method: 'GET',
      url: `${API_URL}/profile/`,
      headers: {
        token: userData.token,
      },
      params: {id: userData.id},
    };
    axios(config)
      .then(res => {
        // console.log(res);
        setProfile(res.data?.data[0]);
      })
      .catch(err => console.log(err));
  };

  const onRefresh = React.useCallback(async () => {
    try {
      setRefreshing(true);
      await getProfile();
      // console.log(profile);
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    } catch (err) {}
  }, []);

  const onLogout = () => {
    props.onLogoutHandler();
  };

  useEffect(() => {
    const update = props.navigation.addListener('focus', () => {
      getProfile();
    });
    return () => {
      update;
    };
  }, [props.navigation]);
  console.log(profile);
  return (
    <View style={classes.maincontainer}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Modal visible={profileModal} transparent={true}>
        <View style={classes.modalcontainer}>
          <EditModal
            getProfile={getProfile}
            onRefresh={onRefresh}
            modalVisible={profileModal}
            setProfileModal={setProfileModal}
            ProfileData={profile}
          />
        </View>
      </Modal>
      <View style={classes.container}>
        <View style={classes.headercontainer}>
          <View style={classes.header}>
            <Text style={classes.title}>Profile</Text>
            <View style={classes.profileinfo}>
              <Image
                style={classes.profilepicture}
                source={
                  profile.display_picture === null
                    ? DP
                    : {uri: `${API_URL}${profile.display_picture}`}
                }
              />
              <View style={classes.info}>
                <Text style={classes.name}>
                  {profile.name ? profile.name : 'User name'}
                </Text>
                <Text style={classes.status}>online</Text>
              </View>
            </View>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={classes.menusection}>
            <Text style={classes.textsection}>Account</Text>
            <TouchableOpacity
              style={classes.submenus}
              onPress={() => {
                setProfileModal(!profileModal);
              }}>
              <View style={classes.menuitem}>
                <Material
                  name="account-circle"
                  color="rgba(1, 6, 32, 0.75)"
                  size={28}
                />
                <Text style={classes.textsetting}>Edit Profile</Text>
              </View>
              <Material
                name={'chevron-right'}
                size={32}
                color={'rgba(1, 6, 32, 0.75)'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={classes.submenus}
              onPress={() => {
                props.navigation.push('ChangePassword', {
                  email: userData.email,
                });
              }}>
              <View style={classes.menuitem}>
                <Image style={classes.settingicon} source={iconPassword} />
                <Text style={classes.textsetting}>Change Password</Text>
              </View>
              <Material
                name={'chevron-right'}
                size={32}
                color={'rgba(1, 6, 32, 0.75)'}
              />
            </TouchableOpacity>
          </View>
          <View style={classes.menusection}>
            <Text style={classes.textsection}>Settings</Text>
            <TouchableOpacity style={classes.submenus}>
              <View style={classes.menuitem}>
                <Image style={classes.settingicon} source={iconChat} />
                <Text style={classes.textsetting}>Chat Settings</Text>
              </View>
              <Material
                name={'chevron-right'}
                size={32}
                color={'rgba(1, 6, 32, 0.75)'}
              />
            </TouchableOpacity>
            <TouchableOpacity style={classes.submenus}>
              <View style={classes.menuitem}>
                <Image style={classes.settingicon} source={iconNotif} />
                <Text style={classes.textsetting}>Push Notifications</Text>
              </View>
              <Material
                name={'chevron-right'}
                size={32}
                color={'rgba(1, 6, 32, 0.75)'}
              />
            </TouchableOpacity>
            <TouchableOpacity style={classes.submenus}>
              <View style={classes.menuitem}>
                <Image style={classes.settingicon} source={iconSecurity} />
                <Text style={classes.textsetting}>Privacy and Security</Text>
              </View>
              <Material
                name={'chevron-right'}
                size={32}
                color={'rgba(1, 6, 32, 0.75)'}
              />
            </TouchableOpacity>
            <TouchableOpacity style={classes.submenus}>
              <View style={classes.menuitem}>
                <Image style={classes.settingicon} source={iconData} />
                <Text style={classes.textsetting}>Data and Storage</Text>
              </View>
              <Material
                name={'chevron-right'}
                size={32}
                color={'rgba(1, 6, 32, 0.75)'}
              />
            </TouchableOpacity>
          </View>
          <View style={classes.menusection}>
            <Text style={classes.textsection}>Help</Text>
            <TouchableOpacity
              style={classes.submenus}
              onPress={() => {
                dispatch({
                  type: 'LOGIN_SUCCESS',
                  payload: {data: {data: {...userData, name: 'Riski Arifani'}}},
                });
              }}>
              <View style={classes.menuitem}>
                <Image style={classes.settingicon} source={iconFAQ} />
                <Text style={classes.textsetting}>F.A.Q</Text>
              </View>
              <Material
                name={'chevron-right'}
                size={32}
                color={'rgba(1, 6, 32, 0.75)'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={classes.submenus}
              onPress={() => {
                Alert.alert('Hold on!', 'Are you sure to logout?', [
                  {
                    text: 'OK',
                    onPress: () => onLogout(),
                  },
                  {
                    text: 'CANCEL',
                    onPress: () => {
                      return;
                    },
                  },
                ]);
              }}>
              <View style={classes.menuitem}>
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
