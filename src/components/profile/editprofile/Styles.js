import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  modalcontainer: {
    flex: 1,
    paddingVertical: '5%',
    paddingHorizontal: '5%',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: '10%',
    paddingHorizontal: '5%',
    borderRadius: 30,
    flexDirection: 'column',
    justifyContent: 'center',

    alignItems: 'center',
  },
  header: {
    fontFamily: 'Kanit-Medium',
    fontSize: 28,
    color: '#5784BA',
  },
  profilepicture: {
    height: 140,
    width: 140,
    borderRadius: 100,
    marginVertical: '5%',
  },
  btngroup: {
    flexDirection: 'row',
  },
  btncontainer: {
    flex: 1,
    marginHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnprimary: {
    paddingVertical: 12,
    marginVertical: 8,
    alignItems: 'center',
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#5784BA',
  },
  btnsecondary: {
    paddingVertical: 12,
    marginVertical: 8,
    alignItems: 'center',
    width: '100%',
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
  inputgroup: {
    marginTop: 0,
    marginBottom: 40,
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    marginTop: '10%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  gradient: {
    flex: 1,
    position: 'absolute',
    left: 8,
    top: -10,
    paddingLeft: 2,
    paddingRight: 2,
    zIndex: 10,
  },
  inputlabel: {
    justifyContent: 'center',
    color: '#ADA9BB',
    fontFamily: 'Kanit-Regular',
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
  warning: {
    position: 'absolute',
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginLeft: 8,
  },
  inputwarning: {
    paddingLeft: '2%',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  },
});

export default styles;
