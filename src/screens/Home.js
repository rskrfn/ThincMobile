import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function Home({}) {
  return (
    <View>
      <Text style={styles.text}>Hello World!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
});
