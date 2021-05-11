import {StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const statusBarHeight = getStatusBarHeight();

const classes = StyleSheet.create({
  container: {
    backgroundColor: '#E6EDF6',
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
  profileSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
  },
  avatar: {
    height: 56,
    width: 56,
    borderRadius: 56 / 2,
  },
  info: {
    marginLeft: 33,
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
  accountSection: {
    top: -24,
    zIndex: -1,
    paddingTop: 36,
    backgroundColor: '#F9F9F9',
    paddingBottom: 16,
    marginBottom: -24,
  },
});

export default classes;
