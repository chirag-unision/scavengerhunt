import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function scvn_main() {
  const grid= [
    [91,92,93,94,95,96,97,98,99,100],
    [81,82,83,84,85,86,87,88,89,90],
    [71,72,73,74,75,76,77,78,79,80],
    [61,62,63,64,65,66,67,68,69,70],
    [51,52,53,54,55,56,57,58,59,60],
    [41,42,43,44,45,46,47,48,49,50],
    [31,32,33,34,35,36,37,38,39,40],
    [21,22,23,24,25,26,27,28,29,30],
    [11,12,13,14,15,16,17,18,19,20],
    [1,2,3,4,5,6,7,8,9,10],
  ]

  return (
    <View style={styles.wrapper}>
        <View style={styles.board}>
            {grid.map((item)=> {
            return  <View style={styles.gridRow}>
                        {item.map((text)=> {
                        return  <View style={styles.gridCol}>
                                    <Text style={styles.numbers}>{text}</Text>
                                </View>
                        })}
                    </View>
            })}
        </View>
        <Image 
        source={{uri: 'https://pngimg.com/d/ladder_PNG103280.png'}} 
        style={[styles.ladder, {transform: [{ rotate: '45deg'}], marginLeft: 190, marginTop: 150}]}
        />
        <Image 
        source={{uri: 'https://pngimg.com/d/ladder_PNG103280.png'}} 
        style={[styles.ladder, {transform: [{ rotate: '-65deg'}], marginLeft: 190, marginTop: -40}]}
        />
        <Image 
        source={{uri: 'https://pngimg.com/d/ladder_PNG103280.png'}} 
        style={[styles.ladder, {transform: [{ rotate: '65deg'}], marginLeft: 100, marginTop: 50}]}
        />
        <Image 
        source={{uri: 'https://pngimg.com/d/ladder_PNG103280.png'}} 
        style={[styles.ladder, {transform: [{ rotate: '-50deg'}], marginLeft: 190, marginTop: 140}]}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#000'
    },
    board: {
        minHeight: 200,
        borderWidth: 2,
        borderColor: 'orange',
        margin: 10,
        padding: 10
    },
    numbers: {
        color: 'orange'
    },
    gridRow: {
        minHeight: 35,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    gridCol: {
        minHeight: 30,
        minWidth: 30,
        borderWidth: 2,
        borderColor: 'orange',
        margin: 2
    },
    ladder: {
        width: 50,
        height: 200,
        position: 'absolute'
    }
})