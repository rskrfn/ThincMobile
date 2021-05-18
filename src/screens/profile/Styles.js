import {Row} from 'native-base';
import {StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const statusBarHeight = getStatusBarHeight();

const classes = StyleSheet.create({
  maincontainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#E6EDF6',
  },
  headercontainer: {
    backgroundColor: 'white',
  },
  header: {
    paddingTop: statusBarHeight + 16,
    paddingHorizontal: 32,
    borderBottomStartRadius: 24,
    borderBottomEndRadius: 24,
    paddingBottom: 24,
    backgroundColor: '#5784BA',
  },
  title: {
    fontFamily: 'Kanit-Medium',
    color: 'white',
    fontSize: 28,
  },
  profileinfo: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 18,
  },
  profilepicture: {
    height: 72,
    width: 72,
    borderRadius: 100,
  },
  info: {
    marginLeft: 20,
  },
  name: {
    color: 'white',
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
  },
  status: {
    color: 'white',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  },
  menusection: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'white',
    marginBottom: 8,
  },
  textsection: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
  },
  settingicon: {
    width: 28,
    height: 28,
  },
  submenus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingVertical: 8,
  },
  icontext: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textsetting: {
    marginLeft: 24,
    fontFamily: 'Kanit-Medium',
    fontSize: 18,
  },
  optioncontainer: {
    backgroundColor: '#F9F9F9',
    paddingBottom: 16,
  },
});

export default classes;
