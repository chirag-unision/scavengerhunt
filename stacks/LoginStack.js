import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Login from '../screens/Login';
import MainStack from './MainStack';

export default function LoginStack() {
    const Stack = createNativeStackNavigator();
    const main = "mainstack";
    const login = "loginstack";
    return (
        <Stack.Navigator initialRouteName={login} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={login} component={Login} />
            <Stack.Screen name={main} component={MainStack} />
        </Stack.Navigator>
    )
}