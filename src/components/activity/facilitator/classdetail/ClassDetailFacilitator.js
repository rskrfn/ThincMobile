/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, ScrollView, Text, StatusBar, Image} from 'react-native';
import axios from 'axios';
import {API_URL} from '@env';
import classes from './Styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import backdropImg from '../../../../assets/images/backdrop1.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
import softwareIcon from '../../../../assets/icons/icon_software.png';
import financeIcon from '../../../../assets/icons/icon_finance.png';
import historyIcon from '../../../../assets/icons/icon_history.png';
import mathIcon from '../../../../assets/icons/icon_math.png';
import scienceIcon from '../../../../assets/icons/icon_science.png';

import Information from '../../../activity/classdetail/information/Information';
import ClassProgress from '../../../activity/classdetail/progress/ClassProgress';
import ClassDiscussion from '../../../activity/classdetail/discussion/ClassDiscussion';
import Member from '../../../activity/classdetail/member/Member';
import {connect} from 'react-redux';

const ClassDetailFacilitator = props => {
  const TOKEN = props.loginReducers.user?.token;
  const courseData = props.route.params;
  const userId = props.loginReducers.user.data?.id;
  const [index, setIndex] = useState(0);
  const [scoreData, setScoreData] = useState([]);
  const [Objective, setObjective] = useState('');

  const getScore = () => {
    let config = {
      method: 'GET',
      url: `${API_URL}/courses/score`,
      params: {userid: userId, courseid: courseData.id},
    };
    axios(config)
      .then(res => {
        // console.log(res);
        if (res.data.data.length !== 0) {
          setScoreData(res.data.data);
        } else {
          setScoreData(null);
        }
      })
      .catch(() => {});
  };

  const getObjective = () => {
    let config = {
      method: 'GET',
      url: `${API_URL}/courses/objective`,
      params: {courseid: courseData.course_id},
    };
    axios(config)
      .then(res => {
        // console.log(res.data.data[0].Objective);
        if (res.data.data.length > 0) {
          let value = res.data.data[0].Objective.split(',').join(', ');
          setObjective(value);
        } else {
          return null;
        }
      })
      .catch(err => {
        console.log({err});
      });
  };
  useEffect(() => {
    const update = props.navigation.addListener('focus', async () => {
      getScore();
      getObjective();
    });
    return () => {
      update;
    };
  }, []);
  // console.log('scoreasdata', scoreData);
  const menu = ['Information', 'Class Progress', 'Class Discussion', 'Member'];
  const renderTabContent = () => {
    switch (index) {
      case 1:
        return (
          <ClassProgress
            token={TOKEN}
            user={props.loginReducers.user.data}
            courseId={courseData.id}
            scoreData={scoreData}
          />
        );
      case 2:
        return <ClassDiscussion />;
      case 3:
        return (
          <Member
            token={TOKEN}
            course={courseData}
            navigation={props.navigation}
          />
        );
      default:
        return <Information course={courseData} objective={Objective} />;
    }
  };

  function CategoryIcon() {
    if (courseData.category === 'Software') {
      return <Image style={classes.categoryIcon} source={softwareIcon} />;
    } else if (courseData.category === 'Finance') {
      return <Image style={classes.categoryIcon} source={financeIcon} />;
    } else if (courseData.category === 'History') {
      return <Image style={classes.categoryIcon} source={historyIcon} />;
    } else if (courseData.category === 'Math') {
      return <Image style={classes.categoryIcon} source={mathIcon} />;
    } else if (courseData.category === 'Science') {
      return <Image style={classes.categoryIcon} source={scienceIcon} />;
    }
  }

  // console.log('facilitator', props);
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
            {courseData.course_name.length > 26
              ? courseData.course_name.slice(0, 26) + '...'
              : courseData.course_name}
          </Text>
        </View>
      </View>
      <View style={classes.container}>
        <View style={classes.courseinfo}>
          <View style={classes.categoryimgcontainer}>{CategoryIcon()}</View>
          <View style={classes.coursedetail}>
            <Text style={classes.coursename}>{courseData.course_name}</Text>
            <View style={classes.subdetailcontainer}>
              <View style={classes.subdetail}>
                <Text style={classes.textsubdetail}>Level : </Text>
                <Text style={classes.textsubdetail}>{courseData.level}</Text>
              </View>
              <View style={classes.subdetail}>
                <Text style={classes.textsubdetail}>Category : </Text>
                <Text style={classes.textsubdetail}>{courseData.category}</Text>
              </View>
              <View style={classes.subdetail}>
                <Text style={classes.textsubdetail}>Price : </Text>
                <Text style={classes.textsubdetail}>
                  {courseData.Price === 0 ? 'Free' : '$' + courseData.price}
                </Text>
              </View>
            </View>
            <View style={classes.progresscontainer}>{null}</View>
          </View>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={classes.menuList}>
          {menu.map((item, activeIndex) => (
            <TouchableOpacity
              key={activeIndex}
              onPress={() => setIndex(activeIndex)}>
              <View
                style={[
                  classes.menuContainer,
                  index === activeIndex ? classes.active : '',
                ]}>
                <Text
                  style={[
                    classes.menuText,
                    index === activeIndex ? classes.activeText : '',
                  ]}>
                  {item}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {renderTabContent()}
      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => ({
  loginReducers: state.loginReducers,
});
const connectedClassDetailFacilitator = connect(mapStateToProps)(
  ClassDetailFacilitator,
);

export default connectedClassDetailFacilitator;
