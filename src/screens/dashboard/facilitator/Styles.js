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
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  left: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  myclass: {
    fontFamily: 'Kanit-Regular',
    fontSize: 21,
    color: 'rgba(1, 6, 32, 1)',
  },
  date: {
    marginVertical: '5%',
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
    color: 'rgba(1, 6, 32, 1)',
  },
  weeklycal: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '3%',
    paddingHorizontal: '2%',
  },
  weeklycalcontainer: {
    padding: 3,
    alignItems: 'center',
  },
  weeklycalcontaineractive: {
    padding: 3,
    alignItems: 'center',
    backgroundColor: 'rgba(87, 132, 186, 1)',
    borderRadius: 20,
  },
  weeklycaldays: {
    fontFamily: 'Kanit-Regular',
    fontSize: 15,
    color: 'rgba(0, 0, 0, 1)',
  },
  weeklycaldaysactive: {
    fontFamily: 'Kanit-Regular',
    fontSize: 15,
    color: 'white',
  },
  bottomsection: {
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
  },
  schedulecontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: '2%',
    backgroundColor: 'white',
    paddingVertical: '8%',
    paddingHorizontal: '2%',
    borderRadius: 10,
    shadowColor: 'black',
    elevation: 4,
  },
  coursetime: {
    fontFamily: 'Roboto-Bold',
    fontSize: 12,
  },
  coursename: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
  },
  coursestudent: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
  },
  rightsection: {
    flexDirection: 'row',
  },
  studenticon: {
    marginLeft: 5,
    width: 20,
    height: 20,
  },
  emptyschedule: {
    marginVertical: '10%',
  },
  emptyscheduletext: {
    justifyContent: 'center',
    fontFamily: 'Kanit-Regular',
    fontSize: 15,
    color: 'rgba(1, 6, 32, 1)',
  },
  taskbtn: {
    marginTop: '10%',
    marginBottom: '3%',
    paddingHorizontal: '4%',
    paddingVertical: '2%',
    borderRadius: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(87, 132, 186, 1)',
  },
  taskbtntext: {
    marginLeft: '2%',
    fontFamily: 'Kanit-Regular',
    fontSize: 15,
    color: 'white',
  },
});

export default classes;
