import {StyleSheet} from 'react-native';

const classes = StyleSheet.create({
  maincontainer: {
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    paddingVertical: '2%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftside: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  displaypicture: {
    height: 55,
    width: 55,
    borderRadius: 100,
  },
  name: {
    marginLeft: 16,
    alignSelf: 'center',
    fontFamily: 'Kanit-Regular',
    fontSize: 18,
  },
  modalcontainer: {
    width: '100%',
    height: '100%',
    paddingHorizontal: '2%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  closebtn: {
    alignItems: 'flex-end',
  },
  modalcontent: {
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: '2%',
    paddingHorizontal: '2%',
    borderRadius: 10,
  },
  uppercontent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomcontent: {
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    alignItems: 'center',
    paddingBottom: 5,
  },
  headertopic: {
    width: '80%',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
  headerscore: {
    width: '20%',
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },

  errorplaceholder: {
    paddingVertical: '5%',
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: 'rgba(87, 132, 186, 1)',
  },
});

export default classes;
