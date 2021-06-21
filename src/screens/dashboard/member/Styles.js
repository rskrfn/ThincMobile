import {StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const statusBarHeight = getStatusBarHeight();

const classes = StyleSheet.create({
  schedule: {
    width: '100%',
    padding: 18,
    backgroundColor: 'white',
  },
  uppersection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  myclass: {
    fontFamily: 'Kanit-Regular',
    fontSize: 21,
    color: '#010620',
  },
  date: {
    fontFamily: 'Roboto-Regular',
    color: '#4D505B',
  },
  bottomsection: {
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  tabItem: {
    marginHorizontal: 8,
  },
});

export default classes;
