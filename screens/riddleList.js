import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Pressable } from '@react-native-material/core'
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from 'axios'
import {baseURL} from '../app.json'

export default function RiddleList({navigation}) {
  const [data, setData]= useState([]);

  useEffect(() => {
    getRiddles();
  }, [])
  
  const getRiddles= async () => {
    teamid= await AsyncStorage.getItem('teamid');
    if(true) {
      axios.get(baseURL+'riddlelist?teamid='+teamid)
      .then(function (response) {
        setData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  return (
    <View style={styles.wrapper}>
      <Text>Choose a Riddle to proceed</Text>
      <View style={styles.container}>
        {data.map((item)=> {
          return  <Pressable onPress={()=>{navigation.navigate('riddlepage', {id: item.id, description: item.description})}} style={styles.riddleCard}>
                    <Text style={styles.text}>{item.description}</Text>
                  </Pressable>
        })}
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