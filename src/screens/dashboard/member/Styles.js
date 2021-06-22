import {StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const statusBarHeight = getStatusBarHeight();

const classes = StyleSheet.create({
  modalcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  datepicker: {
    backgroundColor: 'white',
    paddingHorizontal: '5%',
    paddingVertical: '10%',
    borderRadius: 10,
  },
  modalbtn: {
    alignItems: 'center',
    backgroundColor: 'rgba(87, 132, 186, 1)',
    marginTop: '10%',
    paddingVertical: '5%',
    borderRadius: 10,
  },
  modalbtntext: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: 'white',
  },
  schedule: {
    width: '100%',
    paddingHorizontal: '3%',
    paddingVertical: 18,
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
