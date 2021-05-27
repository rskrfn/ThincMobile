import {StyleSheet} from 'react-native';

const classes = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginVertical: 5,
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 2,
    justifyContent: 'space-between',
  },
  leftsection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subcoursename: {
    marginLeft: 8,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
  },
  score: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    marginHorizontal: 16,
  },
  unfinishedcontainer: {
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
});

export default classes;
