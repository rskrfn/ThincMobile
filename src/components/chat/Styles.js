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
  chatcontainer: {
    paddingHorizontal: 12,
  },
  chatcontent: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'grey',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 10,
  },
  chatcontentsender: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    backgroundColor: '#5784BA',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 10,
  },
  chattext: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: 'white',
  },
  chattextsender: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: 'white',
  },
  inputgroup: {
    width: '100%',
    height: 50,
    backgroundColor: '#5784BA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  input: {
    paddingHorizontal: '2%',
    width: '90%',
    height: 35,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    color: 'black',
  },
  sendbtn: {
    width: '10%',
    alignItems: 'flex-end',
    paddingHorizontal: 2,
  },
});

export default classes;
