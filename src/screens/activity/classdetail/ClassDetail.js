/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  StatusBar,
  Image,
  TouchableNativeFeedback,
} from 'react-native';
import * as Progress from 'react-native-progress';
import axios from 'axios';
import {API_URL} from '@env';
import classes from './Styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import backdropImg from '../../../assets/images/backdrop1.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
import softwareIcon from '../../../assets/icons/icon_software.png';
import financeIcon from '../../../assets/icons/icon_finance.png';
import historyIcon from '../../../assets/icons/icon_history.png';
import mathIcon from '../../../assets/icons/icon_math.png';
import scienceIcon from '../../../assets/icons/icon_science.png';

import Information from '../../../components/activity/classdetail/information/Information';
import ClassProgress from '../../../components/activity/classdetail/progress/ClassProgress';
import ClassDiscussion from '../../../components/activity/classdetail/discussion/ClassDiscussion';
import {connect} from 'react-redux';

const ClassDetail = props => {
  const TOKEN = props.loginReducers.user?.token;
  const courseData = props.route.params;
  const userId = props.loginReducers.user.data?.id;
  const progress = 60;
  const [index, setIndex] = useState(0);
  const [scoreData, setScoreData] = useState([]);

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
  useEffect(() => {
    const update = props.navigation.addListener('focus', async () => {
      await getScore();
    });
    return () => {
      update;
    };
  }, []);
  // console.log('scoreasdata', scoreData);
  const menu = ['Information', 'Class Progress', 'Class Discussion'];
  const renderTabContent = () => {
    switch (index) {
      case 1:
        return (
          <ClassProgress
            token={TOKEN}
            courseId={courseData.id}
            scoreData={scoreData}
          />
        );
      case 2:
        return <ClassDiscussion />;
      default:
        return <Information course={courseData} />;
    }
  };

  function CategoryIcon() {
    if (courseData.Category === 'Software') {
      return <Image style={classes.categoryIcon} source={softwareIcon} />;
    } else if (courseData.Category === 'Finance') {
      return <Image style={classes.categoryIcon} source={financeIcon} />;
    } else if (courseData.Category === 'History') {
      return <Image style={classes.categoryIcon} source={historyIcon} />;
    } else if (courseData.Category === 'Math') {
      return <Image style={classes.categoryIcon} source={mathIcon} />;
    } else if (courseData.Category === 'Science') {
      return <Image style={classes.categoryIcon} source={scienceIcon} />;
    }
  }

  // console.log(scoreData.length);
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
          {scoreData.length === 0 ? (
            <TouchableOpacity style={classes.btnregister}>
              <Text style={classes.btntext}>Register</Text>
            </TouchableOpacity>
          ) : null}
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
              {scoreData.length > 0 ? (
                <>
                  <Text style={classes.textprogress}>
                    {progress}% to complete
                  </Text>
                  <Progress.Bar
                    style={classes.progressbar}
                    width={null}
                    progress={progress / 100}
                    color={'#5784BA'}
                    unfilledColor={'#C4C4C4'}
                    borderWidth={0}
                    height={8}
                  />
                </>
              ) : null}
            </View>
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
        <View>{renderTabContent()}</View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => ({
  loginReducers: state.loginReducers,
});
const connectedClassDetail = connect(mapStateToProps)(ClassDetail);

export default connectedClassDetail;
