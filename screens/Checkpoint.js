import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Checkpoint() {
  return (
    <View style={styles.wrapper}>
      <Text>Checkpoint</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})