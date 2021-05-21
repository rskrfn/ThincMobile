import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  modalcontainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(255, 255, 255, 0.97)',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: '15%',
  },
  image: {
    width: 200,
    height: 200,
  },
  textmodal: {
    fontFamily: 'Kanit-Medium',
    fontSize: 18,
    color: '#5784BA',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    marginTop: '2%',
    fontFamily: 'Kanit-Medium',
    fontSize: 28,
  },

  desc1: {
    marginHorizontal: '10%',
    marginTop: '20%',
    fontFamily: 'Kanit-Medium',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: '15%',
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
  warning: {
    marginTop: '2%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginHorizontal: '10%',
  },

  inputwarning: {
    paddingLeft: '2%',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  },
  warninglogo: {
    marginLeft: '2%',
  },
  input2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '5%',
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
    marginTop: '20%',
    marginHorizontal: '10%',
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
