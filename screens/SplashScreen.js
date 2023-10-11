import { Image, StyleSheet, View } from 'react-native'
import React from 'react'

export default function SplashScreen({navigation}) {

  return (
    <View style={styles.wrapper}>
      <Image style={{width: '100%', height: '100%', position: 'absolute', opacity: 0.4}} source={require('../src/wall-conf2.jpg')} />
      <Image style={{width: 160, height: 120}} source={require('../src/digi_week.png')} />
    </View>
  )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    }
})