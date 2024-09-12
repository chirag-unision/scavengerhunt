import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button } from '@react-native-material/core';

export default function Scvn_main({ route, navigation }) {
    let i = 0;
    let j = 0;

    const grid = [
        [91, 92, 93, 94, 95, 96, 97, 98, 99, 100],
        [81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
        [71, 72, 73, 74, 75, 76, 77, 78, 79, 80],
        [61, 62, 63, 64, 65, 66, 67, 68, 69, 70],
        [51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
        [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
        [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
        [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ];

    const { jump, jumpAt } = route.params;

    const [loading, setLoading] = useState(false);
    const [myState, setMyState] = useState(0);
    const [teamname, setTeamName] = useState('');
    const [teamscore, setTeamScore] = useState('');
    const [alertMsg, setAlertMsg] = useState('Oops! You\'ve got a Snake :(');
    const [alertSet, setAlertSet] = useState('');

    const storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (e) {
            // saving error
        }
    };

    useEffect(() => {
        action();
    }, [])

    const action = async () => {
        let value = await AsyncStorage.getItem('teamname');
        setTeamName(value);
        value = await AsyncStorage.getItem('teamscore');
        if (jump) {
            if(jumpAt>value) {
                setAlertMsg('Yay! You\'ve got a Ladder :)');
                setAlertSet('ladder');
            } else {
                setAlertMsg('Oops! You\'ve got a Snake :(');
                setAlertSet('snake');
            }
            setTimeout(() => {
                setAlertSet(false);
            }, 2000);
            console.log(jumpAt);
            setTeamScore(jumpAt);
            setMyState(jumpAt);
            storeData('teamscore', jumpAt.toString());
        } else {
            setTeamScore(value);
            setMyState(value);
        }
        if (value == '100') {
            setTimeout(() => {
                navigation.replace('finishgame');
                console.log(value + " sdds");
            }, 2000);
        }
    }

    return (
        <View style={styles.wrapper}>
            <Image style={{width: '100%', height: '100%', position: 'absolute', opacity: 0.4}} source={require('../src/wall-conf.jpg')} />
            <View style={styles.topContainer}>
                <Image style={styles.logo} source={require('../src/digi_week.png')} />
                <Text style={styles.heading}>Mystery Maze</Text>
                <View style={styles.scorecard}>
                    <Text style={styles.leadText}>Team: {teamname}</Text>
                    <Text style={styles.leadText}>Score: {teamscore}</Text>
                </View>
            </View>
            <View style={styles.board}>
                <View style={styles.container}>
                    {grid.map((item) => {
                        i++, j++
                        return <View style={styles.gridRow}>
                            {(i % 2 == 1 ? item.reverse() : item).map((text) => {
                                j++
                                return <View key={text} style={[styles.gridCol, (j % 2 == 0 ? styles.gridColBg1 : styles.gridColBg2)]}>
                                    <Text style={styles.numbers}>{text}</Text>
                                    {myState == text && <Image style={styles.userImg} source={require('../src/user.png')} />}
                                </View>
                            })}
                        </View>
                    })}
                </View>
            </View>

            <View style={styles.buttons}>
                <Button
                    style={{width: '80%', marginHorizontal: '10%', height: 50, justifyContent: 'center'}}
                    title="Get Riddle"
                    loading={loading}
                    loadingIndicatorPosition="overlay"
                    onPress={() => { navigation.replace('riddlelist') }}
                    disabled={teamscore == '100' ? true : false}
                />
                <Button
                    style={{height: 50, justifyContent: 'center'}}
                    color={'red'}
                    titleStyle={{color: 'white'}}
                    title="Logout"
                    loading={loading}
                    loadingIndicatorPosition="overlay"
                    onPress={()=>{AsyncStorage.clear(); navigation.navigate('loginstack')}}
                />
            </View>

            <Image
                source={require('../src/snake.png')}
                style={[styles.snake1, { transform: [{ rotate: '50deg' }], marginLeft: 90, marginTop: 340 }]}
            />
            <Image
                source={require('../src/snake.png')}
                style={[styles.snake1, { transform: [{ rotate: '-45deg' }], marginLeft: 250, marginTop: 250 }]}
            />
            <Image
                source={require('../src/snake2.png')}
                style={[styles.snake2, { transform: [{ rotate: '-45deg' }], marginLeft: 45, marginTop: 250 }]}
            />
            <Image
                source={require('../src/snake2.png')}
                style={[styles.snake2, { transform: [{ rotate: '-85deg' }], marginLeft: 150, marginTop: 440 }]}
            />

            <Image
                source={require('../src/ladder3.png')}
                style={[styles.ladder3, { transform: [{ rotate: '45deg' }], marginLeft: 50, marginTop: 265 }]}
            />
            <Image
                source={require('../src/ladder2.png')}
                style={[styles.ladder2, { transform: [{ rotate: '-25deg' }], marginLeft: 250, marginTop: 240 }]}
            />
            <Image
                source={require('../src/ladder1.png')}
                style={[styles.ladder1, { transform: [{ rotate: '15deg' }], marginLeft: 100, marginTop: 340 }]}
            />
            <Image
                source={require('../src/ladder3.png')}
                style={[styles.ladder3, { transform: [{ rotate: '-50deg' }], marginLeft: 220, marginTop: 430 }]}
            />

            {alertSet && <View style={styles.alertCard}>
                {alertSet=='snake'?<Image source={require(`../src/snake2.png`)} style={styles.illustration} />:<Image source={require(`../src/ladder2.png`)} style={styles.illustration} />}
                <Text style={styles.msgText}>{alertMsg}</Text>
            </View>}

        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#000'
    },
    logo: {
        width: 60,
        height: 45,
        marginTop: 20
    },
    board: {
        minHeight: 200,
        borderWidth: 2,
        borderColor: 'orange',
        backgroundColor: '#4F3A13',
        margin: 10,
        padding: 10
    },
    topContainer: {
        height: 200,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    scorecard: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    leadText: {
        fontSize: 18,
        fontWeight: '600'
    },
    heading: {
        fontSize: 60,
        fontFamily: 'cursive',
    },
    container: {
        borderWidth: 1,
    },
    numbers: {
        color: 'white',
        fontWeight: '500',
        padding: 5
    },
    gridRow: {
        minHeight: 35,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    gridCol: {
        minHeight: 30,
        minWidth: 30,
        // borderWidth: 1,
        // borderColor: 'blue',
        margin: 1
    },
    gridColBg1: {
        backgroundColor: '#EEAE3A',
    },
    gridColBg2: {
        backgroundColor: '#4F3A13',
    },
    gridColBg3: {
        backgroundColor: '#6200ED',
    },
    ladder1: {
        width: 50,
        height: 150,
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
    snake1: {
        width: 50,
        height: 200,
        position: 'absolute'
    },
    snake2: {
        width: 80,
        height: 100,
        position: 'absolute'
    },
    userImg: {
        position: 'absolute',
        width: 25,
        height: 28,
        left: 2,
        zIndex: 20
    },
    buttons: {
        width: '100%',
        marginHorizontal: '0%',
        paddingVertical: 10,
        justifyContent: 'space-between',
        height: 250,
        position: 'absolute',
        bottom: -10
    },
    alertCard: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        width: '80%',
        height: 150,
        position: 'absolute',
        top: 300,
        marginHorizontal: '10%',
        flexDirection: 'row'
    },
    msgText: {
        color: '#000',
        fontSize: 18,
        fontWeight: '600',
        padding: 25,
        width: 200
    },
    illustration: {
        width: 80,
        height: 100
    }
})