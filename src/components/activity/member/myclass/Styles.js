import {StyleSheet, Dimensions} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
const windowHeight = Dimensions.get('window').height;
const statusBarHeight = getStatusBarHeight();

const classes = StyleSheet.create({
  maincontainer: {
    height: windowHeight - statusBarHeight - 80,
    // backgroundColor: 'grey',
  },
  uppersection: {
    // backgroundColor: 'red',
    height: '89%',
  },
  textpage: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 17,
    paddingHorizontal: 5,
  },
  headmyclass: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    marginTop: 16,
    width: '48%',
  },
  headprogress: {
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    marginTop: 16,
    width: '22%',
  },
  headscore: {
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    marginTop: 16,
    width: '25%',
  },
  myclass: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    margin: 2,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 2,
  },
  tableclassname: {
    width: '55%',
    fontFamily: 'Montserrat-Medium',
    fontSize: 13,
  },
  tableprogress: {
    width: '25%',
  },
  textprogress: {
    color: '#5784BA',
    fontFamily: 'Montserrat-Medium',
    fontSize: 10,
  },
  tablescore: {
    width: '20%',
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
  },
  allmyclass: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 13,
  },
  textallmyclass: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
  },
  servererror: {
    padding: 8,
  },
  texterror: {
    textAlign: 'center',
    fontFamily: 'Kanit-Regular',
    color: 'red',
    borderRadius: 20,
  },
  loading: {
    textAlign: 'center',
    fontFamily: 'Kanit-Regular',
    color: '#5784BA',
    fontSize: 15,
  },
  pagination: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftpagination: {
    marginTop: '1%',
    flexDirection: 'row',
  },
  paginationinfo: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    color: 'black',
  },
  rightpagination: {
    marginTop: '7%',
    flexDirection: 'row',
  },
  paginationbtndisable: {
    width: 30,
    height: 30,
    backgroundColor: '#ADA9A9',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  paginationbtn: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  paginationbtnactive: {
    width: 30,
    height: 30,
    backgroundColor: '#5784BA',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  paginationtext: {
    fontFamily: 'Kanit-Medium',
    fontSize: 14,
    color: 'black',
  },
  paginationtextactive: {
    fontFamily: 'Kanit-Medium',
    fontSize: 14,
    color: 'white',
  },
});
export default classes;
