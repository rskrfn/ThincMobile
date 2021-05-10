/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, Image} from 'react-native';
import classes from './Styles';
import Swiper from 'react-native-swiper';
import NewsImage1 from '../../../assets/images/news1.png';
import NewsImage2 from '../../../assets/images/news2.png';
const newsData = [
  {
    id: 1,
    title: 'Microsoft try to implement work from home forever',
    image: NewsImage1,
  },
  {
    id: 2,
    title: 'New vaccine found for COVID-19',
    image: NewsImage2,
  },
];

const News = () => {
  return (
    <View style={classes.container}>
      <Swiper
        style={classes.wrapper}
        showsButtons={false}
        dotStyle={{marginBottom: 0}}
        autoplay
        autoplayTimeout={8}
        activeDotStyle={{
          marginBottom: 0,
          width: 24,
          backgroundColor: '#5784BA',
        }}>
        {newsData.map((item, index) => (
          <View key={item.id} style={classes.slide}>
            <Image
              source={item.image}
              style={{
                resizeMode: 'cover',
                height: 200,
                width: '100%',
                borderRadius: 18,
              }}
            />
            <View style={classes.overlay} />
            <View style={classes.textContainer}>
              <Text style={classes.text}>{item.title || 'Untitled'}</Text>
            </View>
          </View>
        ))}
      </Swiper>
    </View>
  );
};

export default News;
