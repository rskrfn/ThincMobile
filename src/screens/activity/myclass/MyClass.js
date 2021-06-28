/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StatusBar, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import classes from './Styles';
import MyClassMember from '../../../components/activity/member/myclass/MyClassMember';

function MyClass({...props}) {
  console.log(props);
  let role = props.loginReducers.user?.data?.role;
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View style={classes.container}>
        <View style={classes.header}>
          <View style={classes.infosection}>
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
        <ScrollView style={classes.maincontent}>
          {role === 'Member' ? (
            <MyClassMember navigation={props.navigation} />
          ) : (
            <View style={classes.servererror}>
              <Text style={classes.loading}>
                Seems you haven't registered into any course
              </Text>
            </View>
          )}
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
