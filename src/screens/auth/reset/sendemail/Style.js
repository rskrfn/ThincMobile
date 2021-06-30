import {StyleSheet} from 'react-native';

const classes = StyleSheet.create({
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
  },
  header: {
    alignSelf: 'center',
    marginTop: '2%',
    fontFamily: 'Kanit-Medium',
    fontSize: 28,
  },
  image: {
    alignSelf: 'center',
    marginVertical: '5%',
    width: 195,
    height: 200,
  },
  desc1: {
    marginHorizontal: '10%',
    fontFamily: 'Kanit-Medium',
    fontSize: 20,
    textAlign: 'center',
  },
  desc2: {
    marginTop: '2%',
    marginHorizontal: '10%',
    fontFamily: 'Kanit-Regular',
    fontSize: 16,
    textAlign: 'center',
    color: '#837F8F',
    marginBottom: '7%',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '10%',
    marginRight: '10%',
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
  emailinput: {
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
    fontFamily: 'Roboto-Medium',
    fontSize: 12,
    color: 'rgba(255, 91, 55, 1)',
  },
  btnsend: {
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '5%',
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

export default classes;
