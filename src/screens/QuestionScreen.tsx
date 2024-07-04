import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import { GlobalStateContext } from '../GlobalStateContext';

//////// test data
import dataIndo from '../TestData';
import dataEnglish from '../TestData-english'

const { width, height } = Dimensions.get('window');
const isMobileDevice = width < 768;

const isMaxIphone = width > 300 && height > 720;

interface Navigation {
    navigate: (screen: string, params?: object) => void;
}

interface UserAnswers {
    [key: number]: number;
}



export default function QuestionScreen({ navigation, route }: { navigation: Navigation }) {
    const { switchControl, selectedLanguage } = useContext(GlobalStateContext);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [usersAnswers, setUsersAnswers] = useState<UserAnswers>({});
    const [usersIndexAnswers, setUsersIndexAnswers] = useState<number[]>([]);
    const [usersCurrentAnswer, setUsersCurrentAnswer] = useState(0);

    const [data, setData] = useState(switchControl ? dataEnglish : dataIndo)
    const { answers } = route.params || {};



    useEffect(() => {
        if (Object.keys(answers).length > 1) {
            setUsersAnswers(answers)
            setQuestionNumber(15)
        }

        setData(switchControl ? dataEnglish : dataIndo)
        console.log(switchControl + ' this is the log')
    },[switchControl])

    

    const handleAnswerPress = (questionNumber: number, answerNumber: number) => {
        console.log(usersAnswers);
        if (usersAnswers[questionNumber] === answerNumber) {
            console.log('runs');
            setUsersAnswers(prevAnswers => {
                const newAnswers = { ...prevAnswers };
                delete newAnswers[questionNumber];
                return newAnswers;
            });
        } else {
            setUsersAnswers(prevAnswers => ({
                ...prevAnswers,
                [questionNumber]: answerNumber
            }));
        }
    };


    const goBack = () => {

        setQuestionNumber(prevNumber => prevNumber - 1);
    };

    const goForward = () => {

        setQuestionNumber(prevNumber => prevNumber + 1);
    };

    const seeResults = () => {
        console.log(Object.keys(usersAnswers).length)
        if ((questionNumber >= 14) && (Object.keys(usersAnswers).length === 15)) {
            let healthScore: number = 0;
            let survivalScore: number = 0;
    
            for (const [key, value] of Object.entries(usersAnswers)) {
                const numKey = Number(key);
                healthScore += Number(value);
                if (data[numKey] && data[numKey].weight !== undefined) {
                    survivalScore += Number(value) * data[numKey].weight;
                } else {
                    console.error(`Data for key ${numKey} is undefined or missing 'weight' property`);
                }
            }

            console.log('Navigating with healthScore:', healthScore, 'and survivalScore:', survivalScore);
    
            healthScore = (healthScore / 60) * 100;
            survivalScore = (survivalScore / 144) * 100;
    
            
    
            navigation.navigate('Result', { healthScore, survivalScore, answers: usersAnswers });
            return;
        } else {
            return
        }
    }

    console.log(questionNumber);

    return (
        <View style={styles.container}>
            <View style={{width: '80%'}}>
                <Text style={{ textAlign: 'center', fontSize: 18, marginBottom: 16, color: '#563728',  fontFamily: 'PlayfairDisplay-Bold' }}>Question {questionNumber + 1} :</Text>
                <Text style={{ textAlign: 'center', fontSize: RFValue(16), color: '#563728', fontFamily: 'PlayfairDisplay-Regular' }}>{data[questionNumber].question}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.answerButton, {transform: [{ rotate: '-2deg' }]} , usersAnswers[questionNumber] === 4 && { backgroundColor: '#874E4C' }]} onPress={() => handleAnswerPress(questionNumber, 4)}>
                    <Text style={[styles.answerText, !switchControl && {fontSize: RFValue(14)}, usersAnswers[questionNumber] === 4 && {color: 'white'}]}>{data[questionNumber].firstAnswer}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.answerButton, {transform: [{ rotate: '2deg' }]}, usersAnswers[questionNumber] === 3 && { backgroundColor: '#874E4C' }]} onPress={() => handleAnswerPress(questionNumber, 3)}>
                    <Text style={[styles.answerText, !switchControl && {fontSize: RFValue(14)}, usersAnswers[questionNumber] === 3 && {color: 'white'}]}>{data[questionNumber].secondAnswer}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.answerButton, {transform: [{ rotate: '-2deg' }]}, usersAnswers[questionNumber] === 2 && { backgroundColor: '#874E4C' }]} onPress={() => handleAnswerPress(questionNumber, 2)}>
                    <Text style={[styles.answerText, !switchControl && {fontSize: RFValue(14)}, usersAnswers[questionNumber] === 2 && {color: 'white'}]}>{data[questionNumber].thirdAnswer}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.answerButton, {transform: [{ rotate: '2deg' }]}, usersAnswers[questionNumber] === 1 && { backgroundColor: '#874E4C' }]} onPress={() => handleAnswerPress(questionNumber, 1)}>
                    <Text style={[styles.answerText, !switchControl && {fontSize: RFValue(14)}, usersAnswers[questionNumber] === 1 && {color: 'white'}]}>{data[questionNumber].fourthAnswer}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.backForwardView}>
                {questionNumber !== 0 ? (
                    <TouchableOpacity style={styles.backForwardButtons} onPress={goBack}>
                        <Ionicons style={styles.arrow} name="arrow-back-outline" />
                    </TouchableOpacity>
                ) : (
                    <View />
                )}
                {questionNumber >= 14 ? (
                    <TouchableOpacity
                        style={[styles.backForwardButtons, { width: '40%' }, (Object.keys(usersAnswers).length !== 15) && {opacity: 0.5}]}
                        onPress={seeResults}
                    >
                        <Text style={{ textAlign: 'center', fontSize: RFValue(10), color: 'white', fontFamily: 'Montserrat-Regular' }}>SEE RESULT</Text>
                        <Ionicons style={[styles.arrow, { marginLeft: 10 }]} name="arrow-forward-outline" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.backForwardButtons} onPress={goForward}>
                        <Ionicons style={styles.arrow} name="arrow-forward-outline" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '6%',
        paddingTop: '8%',
        backgroundColor: '#E5DACE'
    },
    buttonContainer: {
        height: '65%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    answerButton: {
        backgroundColor: 'white',
        width: '62%',
        height: '18%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    answerText: {
        color: '#563728',
        fontSize: RFValue(16),
        width: '82%',
        textAlign: 'center',
        fontFamily: 'Montserrat-Regular'
    },
    backForwardView: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: '8%',
        width: '80%'
    },
    backForwardButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#874E4C',
        borderColor: '#874E4C',
        borderWidth: 1,
        width: '24%',
        height: '80%'
    },
    arrow: {
        color: 'white',
        fontSize: 30
    }
});
