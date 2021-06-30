import {StyleSheet, Dimensions} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const statusBarHeight = getStatusBarHeight();

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    flexDirection: 'column',
    height: windowHeight - statusBarHeight,
    backgroundColor: 'white',
    paddingTop: statusBarHeight + 16,
  },
  buttonbar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: '10%',
  },
  header: {
    alignSelf: 'center',
    fontFamily: 'Kanit-Medium',
    fontSize: 28,
  },
  desc1: {
    marginHorizontal: '10%',
    marginTop: '10%',
    fontFamily: 'Kanit-Medium',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: '10%',
    color: 'black',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '10%',
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
  textInputPassword: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ADA9BB',
    borderRadius: 10,
    padding: 10,
    fontFamily: 'Roboto-Regular',
    fontSize: 20,
    color: 'black',
  },
  inputwarning: {
    marginHorizontal: '12%',
    marginBottom: '5%',
    fontFamily: 'Roboto-Medium',
    fontSize: 12,
    color: 'rgba(255, 91, 55, 1)',
  },
  input2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '10%',
    marginRight: '10%',
  },
  textInputrepeatPassword: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ADA9BB',
    borderRadius: 10,
    padding: 10,
    fontFamily: 'Roboto-Regular',
    fontSize: 20,
    color: 'black',
  },
  eye: {
    position: 'absolute',
    right: 15,
    justifyContent: 'center',
  },
  btnsend: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#5784BA',
    justifyContent: 'center',
    height: 50,
    borderRadius: 10,
    padding: 10,
  },
  btntextsend: {
    fontSize: 18,
    width: '100%',
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Kanit-Medium',
  },
});

export default styles;
