import { StyleSheet, Text, TextInput, View } from 'react-native'
import { Pressable } from "@react-native-material/core";
import React, {useState} from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from 'axios'
import {baseURL} from '../app.json'

export default function RiddlePage({route}) {
  const [ans, setAns]= useState();
  const { description } = route.params;

  const handleSubmission= ()=> {
    if(ans!=null || ans!="") {
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
      <View style={styles.riddleBox}>
        <Text style={styles.text}>{description}</Text>
      </View>
      <View>
        <TextInput placeholder='Enter the Code' />
        <Pressable onPress={handleSubmission} style={styles.button}>
          <Text>Submit</Text>
        </Pressable>
      </View>
    </View>
  )
} 

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    riddleBox: {
      padding: 15,
      margin: 10,
      borderRadius: 20,
      backgroundColor: '#EEAE3A',
      width: '90%',
      minHeight: 300
    },
    text: {
      color: '#000',
      fontSize: 22,
      fontWeight: '600'
    },
    button: {
      paddingVertical: 15,
      paddingHorizontal: 50,
      margin: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#fff',
      backgroundColor: '#EEAE3A'
    },
})