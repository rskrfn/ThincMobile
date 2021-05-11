import React from 'react';
import {View, Text} from 'react-native';
import classes from './Styles';
import {connect} from 'react-redux';
import Member from '../../components/activity/member/Member';
import Facilitator from '../../components/activity/facilitator/Facilitator';
const Activity = props => {
  let role = props.loginReducers.user.data.data.role;
  return (
    <>
      <View style={classes.container}>
        <View style={classes.header}>
          <View style={classes.infosection}>
            <Text style={classes.title}>Activity</Text>
          </View>
        </View>
        {role === 'Member' ? (
          <Member navigation={props.navigation} />
        ) : (
          <Facilitator navigation={props.navigation} />
        )}
      </View>
    </>
  );
};
const mapStateToProps = state => ({
  loginReducers: state.loginReducers,
});
const connectedActivity = connect(mapStateToProps)(Activity);

export default connectedActivity;
