import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  backbtn: {
    width: 42,
    marginLeft: '5%',
  },
  content: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    marginTop: '2%',
    fontFamily: 'Kanit-Medium',
    fontSize: 28,
  },
  image: {
    marginTop: '10%',
    width: 210,
    height: 205,
  },
  desc1: {
    marginHorizontal: '10%',
    marginTop: '10%',
    fontFamily: 'Kanit-Medium',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: '7%',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '10%',
  },
  inputbox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  codeinput: {
    textAlign: 'center',
    textAlignVertical: 'center',
    width: 50,
    height: 60,
    marginHorizontal: '4%',
    borderBottomWidth: 2,
    borderColor: '#ADA9BB',
    fontFamily: 'Roboto-Medium',
    fontSize: 28,
    color: 'black',
  },
  codeinputActive: {
    textAlign: 'center',
    textAlignVertical: 'center',
    width: 50,
    height: 60,
    marginHorizontal: '4%',
    borderBottomWidth: 2,
    fontFamily: 'Roboto-Medium',
    fontSize: 28,
    color: 'black',
    borderColor: '#5784BA',
  },
  subtext: {
    fontFamily: 'Kanit-Medium',
    fontSize: 16,
    color: '#ADA9BB',
  },
  resendpressable: {
    marginLeft: 8,
  },
  resendlink: {fontFamily: 'Kanit-Medium', fontSize: 16, color: '#5784BA'},
  btnsend: {
    width: '100%',
    marginHorizontal: '10%',
    alignItems: 'center',
    marginTop: '15%',
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
