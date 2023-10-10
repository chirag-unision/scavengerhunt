import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FinishGame({navigation}) {

    useEffect(()=>{ 
        setTimeout(() => {
            AsyncStorage.clear(); 
            navigation.replace('loginstack'); 
        }, 3000);
    },[])

  return (
    <View style={styles.wrapper}>
      <Text style={styles.text2}>Congratulations! You have reached the destination :)</Text>
      <View style={styles.circle}>
        <Text style={styles.text}>✔️</Text>
      </View>
      <Text style={styles.text2}>Yayy! You have got</Text>
      <Text style={styles.text3}>{`+`}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#42C252'
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