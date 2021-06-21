import {StyleSheet} from 'react-native';
const classes = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: '30%',
    margin: 16,
    borderRadius: 18,
    backgroundColor: 'white',
  },
  wrapper: {
    height: 200,
  },
  slides: {
    backgroundColor: 'white',
  },
  textContainer: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    marginBottom: 40,
    paddingHorizontal: '2%',
  },
  text: {
    fontFamily: 'Montserrat-Bold',
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.5,
    backgroundColor: 'black',
    width: '100%',
    height: 200,
    borderRadius: 18,
  },
  loadingcontainer: {
    height: 200,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingtext: {
    fontFamily: 'Montserrat-Bold',
    color: 'black',
    fontSize: 16,
    textAlignVertical: 'center',
  },
});
export default classes;
