// ResultScreen.tsx
import React, { useEffect, useContext } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { GlobalStateContext } from '../GlobalStateContext';

const { width, height } = Dimensions.get('window');
const isMobileDevice = width < 768;

const isMaxIphone = width > 300 && height > 720;

export default function ResultScreen({ route, navigation }) {
    const { healthScore, survivalScore, answers } = route.params || {};
    const { switchControl, selectedLanguage } = useContext(GlobalStateContext);


    console.log('healthScore: ' + healthScore)
    useEffect(() => {
        console.log('healthScore: ' + healthScore)
        console.log('survivalScore: ' + survivalScore)
    },[healthScore, survivalScore, route.params])

    

    return (
        <View style={styles.container}>
            <View style={styles.subViews}>
                <Text style={{ fontFamily: 'PlayfairDisplay-Bold', color: '#563728', fontSize: RFValue(28), marginBottom: 12}}>{!switchControl ? ('Hasil Tes:') : ('Test Result:')}</Text>
                <Text style={{ fontFamily: 'PlayfairDisplay-Regular', color: '#563728', fontSize: RFValue(22), marginBottom: 12}}>Kesehatan Hubungan Anda</Text>
                <Text style={{ fontFamily: 'Montserrat-Bold', color: '#563728', fontSize: RFValue(34)}}>{String(healthScore)?.slice(0, 3)}%</Text>
            </View>
            <View style={styles.subViews}>
                <View style={styles.IconTextView}>
                    <Ionicons style={styles.checkmark} name="checkmark-circle-outline" />
                    <Text style={styles.listText}>
                        {!switchControl ? ('Meningkatkan komunikasi') : ('Improving communication')}
                    </Text>
                </View>
                <View style={styles.IconTextView}>
                    <Ionicons style={styles.checkmark} name="checkmark-circle-outline" />
                    <Text style={styles.listText}>
                        {!switchControl ? ('Meningkatkan komunikasi') : ('Improving communication')}
                    </Text>
                </View>
                <View style={styles.IconTextView}>
                    <Ionicons style={styles.checkmark} name="checkmark-circle-outline" />
                    <Text style={styles.listText}>
                        {!switchControl ? ('Meningkatkan komunikasi') : ('Improving communication')}
                    </Text>
                </View>
                <View style={styles.IconTextView}>
                    <Ionicons style={styles.checkmark} name="checkmark-circle-outline" />
                    <Text style={styles.listText}>
                        {!switchControl ? ('Meningkatkan komunikasi') : ('Improving communication')}
                    </Text>
                </View>
                <View style={[styles.IconTextView, {borderBottomWidth: 0}]}>
                    <Ionicons style={styles.checkmark} name="checkmark-circle-outline" />
                    <Text style={styles.listText}>
                        {!switchControl ? ('Meningkatkan komunikasi') : ('Improving communication')}
                    </Text>
                </View>
            </View>
            <View style={styles.subViews}>
                <Text style={{ fontFamily: 'PlayfairDisplay-Regular', fontSize: 22, color: '#563728'  }}>
                    {!switchControl ? ('Peluang bertahan') : ('Improving communication')}
                </Text>
                    <View style={{flexDirection: 'row', marginTop: 12, alignItems: 'flex-end'}}>
                        <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 16}}>
                            _ _ _ _ 
                        </Text>
                        <Text style={{ fontFamily: 'Montserrat-Bold', marginLeft: 4, color: '#563728', fontSize: RFValue(34)}}>
                             %
                        </Text>
                    </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '80%', height: '8%'}}>
                <TouchableOpacity style={styles.backForwardButtons} onPress={() => {navigation.navigate('Question', {answers})}}>
                    <Ionicons style={styles.arrow} name="arrow-back-outline" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.startTestButton} onPress={() => navigation.navigate('Payment', { healthScore, survivalScore  })}>
                    <Text style={styles.buttonText}>
                        {!switchControl ? ('HASIL BERIKUTNYA') : ('Improving communication')}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: isMaxIphone ? '10%' : '8%',
        paddingBottom: '6%',
        backgroundColor: '#E5DACE'
      },
      IconTextView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '58%',
        paddingRight: 14,
        paddingVertical: 8,
        marginBottom: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#563728'
      },
      checkmark: {
        fontSize: isMaxIphone ? 32 : 26,
        marginRight: 8,
        color: '#563728'
      },
      listText: {
        fontSize: RFValue(10), // Adjusted to be responsive
        fontFamily: 'Montserrat-Regular',
        color: '#563728'
      },
      startTestButton: {
        backgroundColor: '#874E4C',
        width: '46%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '28%'
      },
      blurContainer: {
        padding: 10,
        borderRadius: 10,
        },
      buttonText: {
        fontSize: RFValue(11),
        color: 'white',
        fontFamily: 'Montserrat-Regular',
        textAlign: 'center'
      },
    subViews: {
        width: '100%',
        alignItems: 'center',
    },
    backForwardButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#874E4C',
        borderColor: '#874E4C',
        borderWidth: 1,
        width: '16%',
        height: '80%'
    },
    arrow: {
        color: 'white',
        fontSize: 30
    }
})
