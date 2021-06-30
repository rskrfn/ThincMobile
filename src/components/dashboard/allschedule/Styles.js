import {StyleSheet} from 'react-native';
const classes = StyleSheet.create({
  bottomsection: {
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
  },
  schedulecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: '2%',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingVertical: '8%',
    paddingHorizontal: '2%',
    borderRadius: 10,
    shadowColor: 'black',
    elevation: 4,
  },
  coursetime: {
    width: '24%',
    fontFamily: 'Roboto-Bold',
    fontSize: 12,
  },
  coursename: {
    width: '76%',
    marginHorizontal: '2%',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
  },
  tableprogress: {
    // width: '18%',
  },
  textprogress: {
    color: '#5784BA',
    fontFamily: 'Montserrat-Medium',
    fontSize: 10,
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
  time: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
  },
  title: {
    marginTop: 16,
    marginBottom: 16,
    fontFamily: 'Kanit-Regular',
    fontWeight: '400',
    fontSize: 16,
  },
  event: {
    backgroundColor: '#E6EDF6',
    padding: 16,
    borderRadius: 16,
  },
});
export default classes;
