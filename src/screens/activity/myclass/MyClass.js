import React, {useState} from 'react';
import {View, Text, StyleSheet, StatusBar, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import classes from './Styles';
import MyClassMember from '../../../components/activity/member/MyClassMember';
import MyClassFacilitator from '../../../components/activity/facilitator/MyClassFacilitator';

function MyClass({...props}) {
  let role = props.loginReducers.user.data.data.role;
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View style={classes.container}>
        <View style={classes.header}>
          <View style={classes.topSection}>
            <MaterialIcons
              name="chevron-left"
              color="white"
              size={38}
              style={{marginRight: 8}}
              onPress={() => props.navigation.navigate('ActivityMain')}
            />
            <Text
              style={classes.title}
              onPress={() => props.navigation.navigate('ActivityMain')}>
              My Class
            </Text>
          </View>
        </View>
        <ScrollView>
          {role === 'Member' ? (
            <MyClassMember navigation={props.navigation} />
          ) : null}
        </ScrollView>
      </View>
    </>
  );
}
const mapStateToProps = state => ({
  loginReducers: state.loginReducers,
});
const connectedMyClass = connect(mapStateToProps)(MyClass);
export default connectedMyClass;
