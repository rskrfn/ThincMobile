/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Text, View, Image} from 'react-native';
import classes from './Styles';
import Swiper from 'react-native-swiper';
import NewsImage1 from '../../../assets/images/news1.png';
import NewsImage2 from '../../../assets/images/news2.png';
import axios from 'axios';
import {NEWS_API, NEWS_API_KEY} from '@env';
import Material from 'react-native-vector-icons/MaterialIcons';
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
  const [data, setData] = useState();

  const getNews = () => {
    let config = {
      method: 'GET',
      url: `${NEWS_API}`,
      params: {
        q: 'technology',
        apiKey: NEWS_API_KEY,
      },
    };
    axios(config)
      .then(res => {
        // console.log('news', {res});
        setData(res.data?.articles);
      })
      .catch(err => {
        // console.log('news', {err});
      });
  };

  useEffect(() => {
    getNews();
  }, []);
  return (
    <View style={classes.container}>
      {data ? (
        <Swiper
          style={classes.wrapper}
          showsButtons={false}
          dotStyle={{marginBottom: 0}}
          autoplay={true}
          autoplayTimeout={5}
          activeDotStyle={{
            marginBottom: 0,
            width: 24,
            backgroundColor: '#5784BA',
          }}>
          {data.slice(0, 10).map((item, index) => (
            <View key={index} style={classes.slide}>
              <Image
                source={{uri: item.urlToImage}}
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
      ) : (
        <View style={classes.loadingcontainer}>
          <Material name="sync" size={50} color="black" />
          <Text style={classes.loadingtext}>News Loading...</Text>
        </View>
      )}
    </View>
  );
};

export default News;
