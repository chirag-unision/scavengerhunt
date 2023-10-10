import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import LoginStack from './LoginStack';
import Scvn_main from '../screens/scvn_main';
import RiddleList from '../screens/riddleList';
import RiddlePage from '../screens/riddlePage';
import Checkpoint from '../screens/Checkpoint';
import FinishGame from '../screens/FinishGame';

export default function MainStack() {
    const Stack = createNativeStackNavigator();
    const main = "mainstack";
    const login = "loginstack";
    const riddlelist = "riddlelist";
    const riddlepage = "riddlepage";
    const check = "checkpoint";
    const finish = "finishgame";
    return (
        <Stack.Navigator initialRouteName={main} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={login} component={LoginStack} />
            <Stack.Screen name={main} component={Scvn_main} initialParams={{jump: false,jumpAt: 0}} />
            <Stack.Screen name={riddlelist} component={RiddleList} />
            <Stack.Screen name={riddlepage} component={RiddlePage} />
            <Stack.Screen name={check} component={Checkpoint} />
            <Stack.Screen name={finish} component={FinishGame} />
        </Stack.Navigator>
    )
}