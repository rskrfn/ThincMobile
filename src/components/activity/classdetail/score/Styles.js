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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  closebtn: {
    alignItems: 'flex-end',
  },
  modalcontent: {
    width: '100%',
    backgroundColor: 'white',
    paddingTop: '2%',
    paddingBottom: '5%',
    paddingHorizontal: '5%',

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
    marginBottom: '3%',
  },
  headertopic: {
    width: '76%',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
  },
  headerscore: {
    width: '24%',
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '5%',
  },
  subcoursename: {
    width: '76%',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
  },
  score: {
    width: '24%',
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
  },
  scoreunfinish: {
    width: '24%',
    textAlign: 'center',
  },
  unfinishedcontainer: {
    width: '24%',
    textAlign: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#EDD2D2',
    borderRadius: 20,
  },
  unfinishtext: {
    fontFamily: 'Montserrat-Medium',
    color: '#BA5757',
    fontSize: 10,
  },
  errorplaceholder: {
    paddingVertical: '10%',
    textAlign: 'center',
    fontFamily: 'Kanit-Regular',
    fontSize: 16,
    color: 'rgba(87, 132, 186, 1)',
  },
});

export default classes;
