import React from 'react';
import {View, ScrollView, Text, StatusBar, Image} from 'react-native';
import * as Progress from 'react-native-progress';
import classes from './Styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import backdropImg from '../../../assets/images/backdrop1.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
import softwareIcon from '../../../assets/icons/icon_software.png';

import Information from '../../../components/activity/Information';
import ClassProgress from '../../../components/activity/ClassProgress';

const ClassDetail = props => {
  const courseData = props.route.params;
  const progress = 80;
  console.log(props.route.params);
  function CategoryIcon() {
    if (courseData.Category === 'Software') {
      return <Image style={classes.categoryIcon} source={softwareIcon} />;
    }
  }
  return (
    <ScrollView style={classes.maincontainer}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Image style={classes.backdrop} source={backdropImg} />
      <View style={classes.overlay} />
      <View style={classes.header}>
        <View style={classes.navigation}>
          <MaterialIcons
            name="chevron-left"
            color="white"
            size={38}
            onPress={() => props.navigation.pop()}
          />
          <Text style={classes.title} onPress={() => props.navigation.pop()}>
            {courseData.Name}
          </Text>
        </View>
      </View>
      <View style={classes.container}>
        <View style={classes.btncontainer}>
          <TouchableOpacity style={classes.btnregister}>
            <Text style={classes.btntext}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={classes.courseinfo}>
          <View style={classes.categoryimgcontainer}>{CategoryIcon()}</View>
          <View style={classes.coursedetail}>
            <Text style={classes.coursename}>{courseData.Name}</Text>
            <View style={classes.subdetailcontainer}>
              <View style={classes.subdetail}>
                <Text style={classes.textsubdetail}>Level : </Text>
                <Text style={classes.textsubdetail}>{courseData.Level}</Text>
              </View>
              <View style={classes.subdetail}>
                <Text style={classes.textsubdetail}>Category : </Text>
                <Text style={classes.textsubdetail}>{courseData.Category}</Text>
              </View>
              <View style={classes.subdetail}>
                <Text style={classes.textsubdetail}>Price : </Text>
                <Text style={classes.textsubdetail}>
                  {courseData.Price === 0 ? 'Free' : courseData.Price}
                </Text>
              </View>
            </View>
            <View style={classes.progresscontainer}>
              <Text style={classes.textprogress}>{progress}% to complete</Text>
              <Progress.Bar
                style={classes.progressbar}
                width={null}
                progress={progress / 100}
                color={'#5784BA'}
                unfilledColor={'#C4C4C4'}
                borderWidth={0}
                height={8}
              />
            </View>
          </View>
        </View>
        <View></View>
      </View>
    </ScrollView>
  );
};

export default ClassDetail;
