import { StyleSheet, Text, View } from 'react-native'
import { Pressable, TextInput } from "@react-native-material/core";
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {baseURL} from '../app.json'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RiddlePage({route, navigation}) {
  const [ans, setAns]= useState();
  const [error, setError]= useState(false);
  const [wrongCount, setWrongCount]= useState(0);

  const { description, id, pointData1, pointData2, lastScore, teamid } = route.params;
  const jump= pointData1!=pointData2?true:false;

  const handleSubmission= ()=> {
    if(wrongCount<3) {
    if(ans!=null && ans!="") {
      axios.post(baseURL+'checkriddle', {
        ans: ans,
        riddleid: id,
        score: pointData2,
        teamid: teamid
      })
      .then(function (response) {
        console.log(response.data);
        if(response.data.status==100) {
          navigation.replace('checkpoint', {points: pointData1, jump: jump, jumpAt: pointData2, lastScore: lastScore})
        }
        else {
          setError(true);
          setWrongCount(wrongCount+1);
          if(wrongCount==2) {
            let d= new Date();
            let curr= BigInt(d.getTime())+BigInt(600000);
            axios.post(baseURL+'handleFreeze', {
              teamid: teamid,
              freezeTime: curr.toString()
            })
            .then(function (response) {
              if(response.data.status==100) {
                AsyncStorage.clear();
                navigation.replace('loginstack');
              }
            })
            .catch(function (error) {
              console.log(error);
            });
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    }

  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.riddleBox}>
        <Text style={styles.text}>{description}</Text>
      </View>
      <View>
        <TextInput placeholder='Enter the Code' onChangeText={setAns} onChange={()=>setError(false)} />
        {error && <Text style={styles.error}>{`Incorrect Answer! ${3-wrongCount} more wrong attempts and game will be freezed for minutes.`}</Text>}
        <Pressable onPress={handleSubmission} style={styles.button} >
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
    error: {
      color: 'red',
      paddingHorizontal: 20
    }
})