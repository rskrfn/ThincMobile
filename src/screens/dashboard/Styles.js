import {StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const statusBarHeight = getStatusBarHeight();

const classes = StyleSheet.create({
  container: {
    backgroundColor: '#E6EDF6',
    flex: 1,
  },
  header: {
    paddingTop: statusBarHeight + 16,
    paddingHorizontal: 32,
    borderBottomStartRadius: 24,
    borderBottomEndRadius: 24,
    paddingBottom: 24,
    backgroundColor: '#5784BA',
  },
  infosection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  welcometext: {
    fontFamily: 'Kanit-Medium',
    color: 'white',
    fontSize: 20,
  },
  name: {
    color: 'white',
    fontFamily: 'Kanit-Medium',
    fontSize: 28,
  },
  searchsection: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 32,
    backgroundColor: '#E5E6EB',
    paddingHorizontal: 10,
    borderRadius: 24,
    height: 42,
  },
  inputsearch: {
    flex: 1,
    fontFamily: 'Roboto-Medium',
    color: '#010620',
    fontSize: 16,
  },
  info: {
    marginLeft: 33,
  },
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
