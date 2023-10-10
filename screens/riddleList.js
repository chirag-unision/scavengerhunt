import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Pressable } from '@react-native-material/core'
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from 'axios'
import {baseURL} from '../app.json'

export default function RiddleList({navigation}) {
  const [data, setData]= useState([]);
  const [array1, setArray1]= useState([]);
  const [array2, setArray2]= useState([]);
  const [score, setScore]= useState('');
  const [tmid, setTmid]= useState('');

  let mixArr= shuffle([0,1,2]);

  let iterator= -1;

  useEffect(() => {
    getRiddles();
  }, [])
  
  const getRiddles= async () => {
    teamid= await AsyncStorage.getItem('teamid');
    curr_score= await AsyncStorage.getItem('teamscore');
    setTmid(teamid);
    setScore(curr_score);
    if(true) {
      axios.get(baseURL+'riddlelist?teamid='+teamid+'&score='+curr_score)
      .then(function (response) {
        setArray1(response.data.pointsData1);
        setArray2(response.data.pointsData2);
        setData(response.data.data);
        console.log(curr_score);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    
    while (currentIndex > 0) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  return (
    <View style={styles.wrapper}>
      <Text>Choose a Riddle to proceed</Text>
      <View style={styles.container}>
                {data.length==3 && <>
                  <Pressable key={data[0].id} onPress={()=>{navigation.replace('riddlepage', {id: data[mixArr[0]].id, description: data[mixArr[0]].description, pointData1: array1[0], pointData2: array2[0], lastScore: parseInt(score), teamid: tmid})}} style={styles.riddleCard}>
                    <Text style={styles.text}>{`Riddle-A`}</Text>
                  </Pressable>
                  <Pressable key={data[1].id} onPress={()=>{navigation.replace('riddlepage', {id: data[mixArr[1]].id, description: data[mixArr[1]].description, pointData1: array1[1], pointData2: array2[1], lastScore: parseInt(score), teamid: tmid})}} style={styles.riddleCard}>
                    <Text style={styles.text}>{`Riddle-B`}</Text>
                  </Pressable>
                  <Pressable key={data[2].id} onPress={()=>{navigation.replace('riddlepage', {id: data[mixArr[2]].id, description: data[mixArr[2]].description, pointData1: array1[2], pointData2: array2[2], lastScore: parseInt(score), teamid: tmid})}} style={styles.riddleCard}>
                    <Text style={styles.text}>{`Riddle-C`}</Text>
                  </Pressable>
                  </>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        width: '100%'
    },
    riddleCard: {
        padding: 20,
        margin: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#fff',
        backgroundColor: '#fff'
    },
    text: {
        color: '#000'
    }
})