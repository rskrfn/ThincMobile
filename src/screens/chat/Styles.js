import {StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const statusBarHeight = getStatusBarHeight();

const classes = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  modalcontainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '5%',
    paddingHorizontal: '5%',
    backgroundColor: 'white',
  },
  modalcontent: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '5%',
    paddingHorizontal: '5%',
    borderRadius: 30,
    backgroundColor: 'white',
  },
  modalheader: {
    alignSelf: 'center',
    fontFamily: 'Kanit-Medium',
    color: '#5784BA',
    fontSize: 32,
  },
  inputgroup: {
    marginTop: 0,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20%',
  },
  input: {
    marginTop: '10%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputlabel: {
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: 'white',
    color: '#ADA9BB',
    fontFamily: 'Kanit-Regular',
    left: 8,
    top: -10,
    paddingLeft: 2,
    paddingRight: 2,
    zIndex: 10,
  },
  inputbox: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ADA9BB',
    borderRadius: 10,
    padding: 10,
    fontFamily: 'Roboto-Regular',
    fontSize: 20,
    color: 'black',
  },
  btncontainer: {
    marginHorizontal: 4,
    flexDirection: 'column',
  },
  btnprimary: {
    width: 300,
    paddingVertical: 12,
    marginVertical: 8,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#5784BA',
  },
  btnsecondary: {
    width: 300,
    paddingVertical: 12,
    marginVertical: 8,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(0, 13, 79, 0.08)',
  },
  btntextprimary: {
    fontFamily: 'Kanit-SemiBold',
    fontSize: 18,
    color: 'white',
  },
  btntextsecondary: {
    fontFamily: 'Kanit-SemiBold',
    fontSize: 18,
    color: 'rgba(1, 6, 32, 1)',
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
  headertext: {
    fontFamily: 'Kanit-Medium',
    color: 'white',
    fontSize: 32,
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
  maincontainer: {
    flex: 1,

    paddingVertical: 8,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  leftcontent: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 1000,
    marginRight: 16,
  },
  name: {
    fontFamily: 'Kanit-Regular',
    color: 'rgba(0, 0, 0, 1)',
    fontSize: 16,
  },
  lastmessage: {
    fontFamily: 'Kanit-Regular',
    color: 'rgba(120, 120, 120, 1)',
    fontSize: 12,
  },
  timestamp: {
    fontFamily: 'Kanit-Regular',
    color: 'rgba(120, 120, 120, 1)',
    fontSize: 12,
  },
});

export default classes;
