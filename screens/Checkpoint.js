import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Checkpoint({route, navigation}) {
  const {points, jump, jumpAt, lastScore}= route.params;

  useEffect(()=> {
    storeData('teamscore', points.toString());
    console.log(points);
    setTimeout(() => {
      getData();
      navigation.replace('mainstack', {jump: jump, jumpAt: jumpAt});
    }, 3000);
  })
  
  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('teamscore');
      if (value !== null) {
        console.log(value)
      }
    } catch (e) {
      // error reading value
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.text2}>Correct Submission :)</Text>
      <View style={styles.circle}>
        <Text style={styles.text}>✔️</Text>
      </View>
      <Text style={styles.text2}>Yayy! You have got</Text>
      <Text style={styles.text3}>{`+${points-lastScore}`}</Text>
      {/* <Text style={styles.text2}>Keep playing</Text> */}
    </View>
  )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#6200ED'
    },
    circle: {
      padding: 50,
      backgroundColor: 'white',
      borderRadius: 100
    },
    text: {
      fontSize: 40
    },
    text2: {
      fontSize: 25,
      paddingTop: 100,
      paddingBottom: 50
    },
    text3: {
      fontSize: 40,
      paddingVertical: 40
    }
})