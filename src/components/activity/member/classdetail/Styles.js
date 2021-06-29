import {StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const statusBarHeight = getStatusBarHeight();

const classes = StyleSheet.create({
  maincontainer: {
    backgroundColor: 'white',
    flex: 1,
    width: '100%',
  },
  backdrop: {
    position: 'absolute',
    resizeMode: 'cover',
    alignSelf: 'flex-end',
    width: '100%',
    height: 280,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.5)',
    height: 280,
  },
  header: {
    paddingTop: statusBarHeight + 16,
    backgroundColor: '#5784BA',
    paddingHorizontal: 16,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    paddingBottom: 24,
  },
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Kanit-Medium',
    fontSize: 20,
    color: 'white',
  },
  container: {
    marginHorizontal: '3%',
  },
  btncontainer: {
    marginTop: '6%',
    marginBottom: '3%',
    alignItems: 'flex-end',
  },
  btnregister: {
    flexShrink: 1,
    width: 'auto',
    height: 'auto',
    paddingHorizontal: '6%',
    paddingVertical: '2%',
    backgroundColor: '#57BA61',
    borderRadius: 30,
  },
  btntext: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: 'white',
  },
  courseinfo: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryimgcontainer: {
    justifyContent: 'center',
    width: 110,
    height: 110,
    borderRadius: 13,
    backgroundColor: '#5784BA',
  },
  categoryIcon: {
    alignSelf: 'center',
    width: '80%',
    height: '80%',
    tintColor: 'white',
    resizeMode: 'center',
  },
  coursedetail: {
    marginTop: '6%',
    width: '70%',
  },
  coursename: {
    marginLeft: '3%',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 17,
  },
  subdetailcontainer: {
    marginLeft: '3%',
    marginRight: '3%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  subdetail: {
    flexDirection: 'row',
    marginRight: 5,
  },
  textsubdetail: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 11,
  },
  progresscontainer: {
    marginTop: '3%',
    marginBottom: '6%',
    marginLeft: '3%',
    marginRight: '3%',
    flexDirection: 'column',
  },
  textprogress: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    color: '#5784BA',
    marginBottom: 5,
  },
  progressbar: {
    width: '100%',
  },
  menuList: {
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#C4C4C4',
  },
  menuContainer: {
    padding: 10,
    marginHorizontal: 5,
  },
  menuText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    fontStyle: 'normal',
    textAlign: 'left',
    color: 'black',
  },
  active: {
    zIndex: 10,
    borderBottomWidth: 4,
    borderBottomColor: '#5784BA',
  },
  activeText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#5784BA',
  },
});

export default classes;
