import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import classes from './Styles';
import Material from 'react-native-vector-icons/MaterialIcons';

const ProgressItem = props => {
  //   console.log(props.data.score);

  const setColor = score => {
    if (props.data.Score) {
      if (Number(score) > 90) {
        return '#2BE6AE';
      } else if (Number(score) > 70) {
        return '#51E72B';
      } else if (Number(score) > 50) {
        return '#CCE72B';
      } else if (Number(score) > 30) {
        return '#E7852B';
      } else {
        return '#E6422B';
      }
    }
  };
  return (
    <View>
      <TouchableOpacity style={classes.container}>
        <View style={classes.leftsection}>
          <Material
            name={
              props.data.Score !== null
                ? 'check-box'
                : 'check-box-outline-blank'
            }
            size={24}
            color="#5985BB"
          />
          <Text style={classes.subcoursename}>{props.data.Name}</Text>
        </View>
        <View>
          {props.data.Score !== null ? (
            <Text
              style={{
                ...classes.score,
                color: setColor(props.data.Score),
              }}>
              {props.data.Score}
            </Text>
          ) : (
            <View style={classes.unfinishedcontainer}>
              <Text style={classes.unfinishtext}>Unfinished</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProgressItem;
