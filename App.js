import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './stacks/MainStack';
import LoginStack from './stacks/LoginStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './screens/SplashScreen';

export default function App() {
  const [isLogin, setIsLogin]= useState(false);
  const [isLoaded, setIsLoaded]= useState(false);

  useEffect(()=> {
    getData();
  }, [])
  
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('teamname');
      if (value !== null) {
        console.log(value)
        setIsLogin(true);
      }
    } catch (e) {
      // error reading value
    }
    setIsLoaded(true);
  };
  

  return (
    <NavigationContainer>
      {isLoaded ? (isLogin ? <MainStack/> : <LoginStack/>) : <SplashScreen/>}
    </NavigationContainer>
  )
}