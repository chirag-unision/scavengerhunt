import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from '@react-native-material/core'
import {baseURL} from '../app.json'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile]= useState('');
  const [pswd, setPswd]= useState('');
  const [error, setError]= useState(false);
  const [errText, setErrText]= useState('');
  
  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('key');
      if (value !== null) {
        console.log(value)
        navigation.replace('mainstack')
      }
    } catch (e) {
      // error reading value
    }
  };
  
const handleLogin= ()=> {
  setError(true);
  setErrText('Your account has freezed for 10 minutes due to many wrong attempts.')
  const d = new Date();
  if(parseInt(d.getHours())>=11) {
    let regex= /^[6-9][0-9]{9}$/;
    if(regex.test(mobile) && pswd) {
      setLoading(true);
      setError(false);
      axios.post(baseURL+'login', {
        mobile: mobile, pass: pswd
      })
      .then(function (response) {
        if(response.data.status==100) {
          if(BigInt(response.data.freezeTime)<BigInt(d.getTime())) {
          if(response.data.teamscore!='100') {
            storeData('key', response.data.token)
            storeData('mobile', mobile)
            storeData('teamid', response.data.teamid)
            storeData('teamname', response.data.teamname)
            storeData('teamscore', response.data.teamscore.toString())
            getData();
          } else {
            setLoading(false);
            setError(true);
            setErrText('You have completed the game. You can\'t Login Now.');
          }
          } else {
            setLoading(false);
            setError(true);
            setErrText('Your account has freezed for 10 minutes due to many wrong attempts.')
          }

        } else {
          setLoading(false);
          setError(true);
          setErrText('Mobile No. or Password is incorrect!');
        }
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
    }
  } else {
    setError(true);
    setErrText('You cannot login now. Game will start at 11a.m.');
  }
}

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Login</Text>
      <TextInput style={styles.input} placeholder='Enter mobile here' onChangeText={setMobile} onChange={()=>setError(false)} />
      <TextInput style={styles.input} placeholder='Enter password' onChangeText={setPswd} onChange={()=>setError(false)} />
      {error && <Text style={styles.errText}>{errText}</Text>}
      <Button
          title="Login"
          loading={loading}
          loadingIndicatorPosition="overlay"
          onPress={handleLogin}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
      width: 250,
      paddingVertical: 10
    },
    label: {
      fontSize: 25,
      color: 'black',
      fontWeight: '600',
      padding: 20
    },
    errText: {
      color: 'red',
      paddingVertical: 20
    }
})