// PaymentScreen.tsx
import React, { useEffect, useContext } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { GlobalStateContext } from '../GlobalStateContext';
import { Image } from 'expo-image';

////////image imports //////////
import lock from '../assets/Images/lock.png'
import x from '../assets/Images/x.png'
import tag from '../assets/Images/tag.png'

const { width, height } = Dimensions.get('window');
const isMobileDevice = width < 768;

const isMaxIphone = width > 300 && height > 720;

export default function PaymentScreen({ route, navigation }) {
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
                <Text style={{ fontFamily: 'PlayfairDisplay-Bold',color: '#563728', fontSize: RFValue(28), marginBottom: 12}}>{!switchControl ? ('Hasil Tes:') : ('Test Result:')}</Text>
                <Text style={{ fontFamily: 'PlayfairDisplay-Regular',color: '#563728', fontSize: RFValue(22), marginBottom: 12}}>{!switchControl ? ('Peluang bertahan') : ('Survival Probability')}</Text>
                <Image source={lock} style={{width: 50, height: 50, marginBottom:12}} />
                <Text style={{ fontFamily: 'PlayfairDisplay-Regular',color: '#563728', fontSize: RFValue(14), marginBottom: 12}}>Apa yang Anda dapatkan dalam hasil tes ini?</Text>
            </View>
            <View style={[styles.subViews, {height: '20%'}]}>
                <View style={styles.IconTextView}>
                    <Ionicons style={styles.checkmark} name="checkmark-circle-outline" />
                    <Text style={styles.listText}>
                        {!switchControl ? ('Persentase peluang hubungan Anda bertahan') : ('Improving communication')}
                    </Text>
                </View>
                <View style={styles.IconTextView}>
                    <Ionicons style={styles.checkmark} name="checkmark-circle-outline" />
                    <Text style={styles.listText}>
                        {!switchControl ? ('Tips personal untuk memperkuat hubungan Anda') : ('Improving communication')}
                    </Text>
                </View>
                <View style={styles.IconTextView}>
                    <Ionicons style={styles.checkmark} name="checkmark-circle-outline" />
                    <Text style={[styles.listText, {fontFamily: 'Montserrat-Bold'}]}>
                        {!switchControl ? ('BONUS E-book “Bertengkar Itu Sehat: Kenapa Konflik Bisa Menyelamatkan Hubungan” dalam PDF') : ('Improving communication')}
                    </Text>
                </View>
            </View>
            <View style={styles.subViews}>
                <View style={{ position: 'relative', top: 35, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderTopWidth: 1, paddingVertical: 12, marginBottom: 16, width: '70%',}}>
                  <View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
                      <Text style={{ color: '#563728', fontFamily: 'Montserrat-Bold', fontSize: RFValue(12), marginRight: 6, textAlign: 'center'  }}>
                          {!switchControl ? ('BELI') : ('BUY')}
                      </Text>
                      <Text style={{ color: '#563728', fontFamily: 'Montserrat-Bold', fontSize: RFValue(18), textAlign: 'center'  }}>
                          {!switchControl ? ('SEKARANG') : ('NOW')}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
                      <Text style={{ color: '#563728', fontFamily: 'Montserrat-Bold', fontSize: RFValue(12), marginRight: 6, textAlign: 'center'  }}>
                          {!switchControl ? ('UNTUK HARGA') : ('FOR A')}
                      </Text>
                      <Text style={{ color: '#563728', fontFamily: 'Montserrat-Bold', fontSize: RFValue(18), textAlign: 'center'  }}>
                          {!switchControl ? ('DISKON!') : ('DISCOUNT')}
                      </Text>
                    </View>
                  </View>
                  <Image source={tag} style={{ height: 40, width: 40}}/>
                </View>
                <View style={{ alignItems: 'center'}}>
                  <Image source={x} style={{ position: 'relative', top: 35, height: 40, width: 40}} />
                  <Text style={{ color: '#563728', fontFamily: 'Montserrat-Regular', marginLeft: 4, fontSize: RFValue(20)}}>
                        IDR 99,000
                  </Text>
                </View>
                <Text style={{ fontFamily: 'Montserrat-Regular', color: '#563728', position: 'relative', right: '20%'}}>Hanya</Text>
                <Text style={{ fontFamily: 'Montserrat-Bold', color: '#563728', marginLeft: 4, fontSize: RFValue(26)}}>
                      IDR 49,000
                </Text>
            </View>
            <TouchableOpacity style={styles.startTestButton} onPress={() => navigation.navigate('Payment')}>
                <Text style={styles.buttonText}>
                    {!switchControl ? ('PEMBAYARAN') : ('BUY NOW')}
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
        paddingTop: isMaxIphone ? '6%' : '4%',
        paddingBottom: '8%',
        backgroundColor: '#E5DACE'
      },
      IconTextView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '70%',
        paddingRight: 14,
        paddingVertical: 6,
      },
      checkmark: {
        fontSize: isMaxIphone ? 28 : 22,
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
        width: '44%',
        height: '6%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      blurContainer: {
        padding: 10,
        borderRadius: 10,
        },
      buttonText: {
        fontSize: RFValue(12),
        color: 'white',
        fontFamily: 'Montserrat-Regular',
        textAlign: 'center'
      },
    subViews: {
        width: '100%',
        alignItems: 'center',
    }
})
