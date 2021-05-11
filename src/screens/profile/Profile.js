import React from 'react';
import {View, Text, StatusBar, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import classes from './Styles';
import {logoutHandler} from '../../redux/Action/auth';
import {TouchableOpacity} from 'react-native';

const Profile = props => {
  let name = props.loginReducers.user.data.data.name;
  const onClick = () => {
    props.onLogoutHandler();
  };
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View style={classes.container}>
        <View style={classes.header}>
          <Text style={classes.title}>Profile</Text>
          <View style={classes.profileSummary}>
            <Text>Profile Picture</Text>
            <View style={classes.info}>
              <Text style={classes.name}>{name ? name : 'User'}</Text>
              <Text style={classes.status}>online</Text>
            </View>
          </View>
        </View>

        <ScrollView>
          <View style={classes.accountSection}>
            <TouchableOpacity onPress={onClick}>
              <Text>Logout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
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
