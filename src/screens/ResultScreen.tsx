// ResultScreen.tsx
import React, { useEffect, useContext } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { GlobalStateContext } from '../GlobalStateContext';

export default function ResultScreen({ route, navigation }) {
    const { healthScore, survivalScore } = route.params || {};
    const { switchControl, selectedLanguage } = useContext(GlobalStateContext);


    console.log('healthScore: ' + healthScore)
    useEffect(() => {
        console.log('healthScore: ' + healthScore)
        console.log('survivalScore: ' + survivalScore)
    },[healthScore, survivalScore, route.params])

    

    return (
        <View style={styles.container}>
            <View style={styles.subViews}>
                <Text style={{ fontFamily: 'PlayfairDisplay-Bold', fontSize: 28, marginBottom: 12}}>Hasil Tes:</Text>
                <Text style={{ fontFamily: 'PlayfairDisplay-Regular', fontSize: 22, marginBottom: 12}}>Kesehatan Hubungan Anda</Text>
                <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 34}}>{String(healthScore)?.slice(0, 3)}%</Text>
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
                <Text style={{ fontFamily: 'PlayfairDisplay-Regular', fontSize: 22  }}>
                    {!switchControl ? ('Peluang bertahan') : ('Improving communication')}
                </Text>
                    <View style={{flexDirection: 'row', marginTop: 12, alignItems: 'flex-end'}}>
                        <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 16}}>
                            _ _ _ _ 
                        </Text>
                        <Text style={{ fontFamily: 'Montserrat-Bold', marginLeft: 4, fontSize: 34}}>
                             %
                        </Text>
                    </View>
            </View>
            <TouchableOpacity style={styles.startTestButton} onPress={() => navigation.navigate('Payment')}>
                <Text style={styles.buttonText}>
                    {!switchControl ? ('Klik ini untuk hasil berikutnya') : ('Improving communication')}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '10%',
        paddingBottom: '20%',
        backgroundColor: '#E5DACE'
      },
      IconTextView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '58%',
        paddingRight: 14,
        paddingVertical: 8,
        marginBottom: 4,
        borderBottomWidth: 1
      },
      checkmark: {
        fontSize: 24,
        marginRight: 8,
        color: 'black'
      },
      listText: {
        fontSize: RFValue(9), // Adjusted to be responsive
        fontFamily: 'Montserrat-Regular',
      },
      startTestButton: {
        backgroundColor: '#874E4C',
        width: '50%',
        height: '8%',
        alignItems: 'center',
        justifyContent: 'center'
      },
      blurContainer: {
        padding: 10,
        borderRadius: 10,
        },
      buttonText: {
        fontSize: RFValue(9),
        color: 'white',
        fontFamily: 'Montserrat-Regular',
        textAlign: 'center'
      },
    subViews: {
        width: '100%',
        alignItems: 'center',
    }
})
