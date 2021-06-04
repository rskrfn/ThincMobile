import {StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const statusBarHeight = getStatusBarHeight();

const classes = StyleSheet.create({
  maincontainer: {
    backgroundColor: 'white',
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
  },
  headertext: {
    fontFamily: 'Kanit-Medium',
    color: 'white',
    fontSize: 24,
    marginLeft: 16,
  },
});

export default classes;
