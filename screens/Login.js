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
    let regex= /^[6-9][0-9]{9}$/;
    if(regex.test(mobile) && pswd) {
      axios.post(baseURL+'login', {
        mobile: mobile, pass: pswd
      })
      .then(function (response) {
        console.log(response.data.teamid)
        storeData('key', response.data.token)
        storeData('mobile', mobile)
        storeData('teamid', response.data.teamid)
        storeData('teamname', response.data.teamname)
        getData();
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Login</Text>
      <TextInput style={styles.input} placeholder='Enter mobile here' onChangeText={setMobile} />
      <TextInput style={styles.input} placeholder='Enter password' onChangeText={setPswd} />
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
    }
})