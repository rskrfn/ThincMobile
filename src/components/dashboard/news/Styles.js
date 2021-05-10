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
    marginBottom: 48,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
});
export default classes;
