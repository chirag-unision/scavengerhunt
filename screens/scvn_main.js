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
        source={require('../src/snake.png')} 
        style={[styles.ladder1, {transform: [{ rotate: '50deg'}], marginLeft: 90, marginTop: 140}]}
        />
        <Image 
        source={require('../src/snake.png')} 
        style={[styles.ladder1, {transform: [{ rotate: '-45deg'}], marginLeft: 250, marginTop: 50}]}
        />
        <Image 
        source={require('../src/snake2.png')} 
        style={[styles.snake2, {transform: [{ rotate: '-45deg'}], marginLeft: 40, marginTop: 50}]}
        />
        <Image 
        source={require('../src/snake2.png')} 
        style={[styles.snake2, {transform: [{ rotate: '-85deg'}], marginLeft: 150, marginTop: 240}]}
        />

        <Image 
        source={require('../src/ladder3.png')} 
        style={[styles.ladder3, {transform: [{ rotate: '45deg'}], marginLeft: 50, marginTop: 65}]}
        />
        <Image 
        source={require('../src/ladder2.png')} 
        style={[styles.ladder2, {transform: [{ rotate: '-25deg'}], marginLeft: 250, marginTop: 40}]}
        />
        <Image 
        source={require('../src/ladder1.png')} 
        style={[styles.ladder1, {transform: [{ rotate: '15deg'}], marginLeft: 115, marginTop: 80}]}
        />
        <Image 
        source={require('../src/ladder3.png')} 
        style={[styles.ladder3, {transform: [{ rotate: '-50deg'}], marginLeft: 220, marginTop: 230}]}
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
        borderWidth: 1,
        borderColor: 'blue',
        margin: 1
    },
    ladder1: {
        width: 50,
        height: 200,
        position: 'absolute'
    },
    ladder2: {
        width: 50,
        height: 150,
        position: 'absolute'
    },
    ladder3: {
        width: 50,
        height: 100,
        position: 'absolute'
    },
    snake2: {
        width: 80,
        height: 100,
        position: 'absolute'
    }
})