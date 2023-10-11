import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FinishGame({navigation}) {
    const [timer, setTimer]= useState(5);

    useEffect(()=>{ 
        setTimeout(() => {
            AsyncStorage.clear(); 
            navigation.replace('loginstack'); 
        }, 5000);
    },[])

  return (
    <View style={styles.wrapper}>
      <Image style={{width: '100%', height: '100%', position: 'absolute', opacity: 0.4}} source={require('../src/wall-conf3.jpg')} />
      <Text style={styles.text2}>Congratulations! You have reached the destination.</Text>
      <View style={styles.circle}>
        <Text style={styles.text}>🎉</Text>
      </View>
      <Text style={styles.text2}>{`Stay tuned for the results. You will be logged out in ${timer}s`}</Text>
      <Text style={styles.text3}>Have A Nice Day! :)</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#000'
    },
    circle: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 100,
      width: 180,
      height: 180
    },
    text: {
      fontSize: 70
    },
    text2: {
      fontSize: 28,
      paddingTop: 100,
      paddingBottom: 50,
      fontWeight: '600'
    },
    text3: {
      fontSize: 25,
      paddingVertical: 40,
      fontWeight: '500'
    }
})