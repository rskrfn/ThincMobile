import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
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
  },
  codeinput: {
    textAlign: 'center',
    textAlignVertical: 'center',
    width: 50,
    height: 60,
    borderWidth: 1,
    borderColor: '#ADA9BB',
    fontFamily: 'Roboto-Medium',
    fontSize: 28,
    color: 'black',
  },
  btnsend: {
    width: '100%',
    marginHorizontal: '10%',
    alignItems: 'center',
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

export default styles;
