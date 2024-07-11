// PaymentScreen.tsx
import React, { useEffect, useContext, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { GlobalStateContext } from '../GlobalStateContext';
import { Image } from 'expo-image';
import PaymentModal from '../components/PaymentModal';

////////image imports //////////
import lock from '../assets/Images/lock.png'
import x from '../assets/Images/x.png'
import tag from '../assets/Images/tag.png'
import bookCover from '../assets/Images/book-cover.png'
import check from '../assets/Images/check.png'

const { width, height } = Dimensions.get('window');
const isMobileDevice = width < 768;

const isMaxIphone = width > 425 && height > 720;

export default function PaymentScreen({ route, navigation }) {
    const { healthScore, survivalScore } = route.params || {};
    const { switchControl, selectedLanguage } = useContext(GlobalStateContext);
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [paymentSuccessful, setPaymentSuccessful] = useState(false)

    console.log('healthScore: ' + healthScore)
    useEffect(() => {
        console.log('healthScore: ' + healthScore)
        console.log('survivalScore: ' + survivalScore)
    },[healthScore, survivalScore, route.params])

    const toggleModal = (paid?: boolean) => {
      setIsModalVisible(!isModalVisible);
      console.log(paid)
      if (paid === true) {
        setPaymentSuccessful(true)
      }
    };


    return (
        <View style={styles.container}>
            <View style={styles.subViews}>
                <Text style={{ fontFamily: 'PlayfairDisplay-Bold',color: '#563728', fontSize: RFValue(28), marginBottom: 12}}>{!switchControl ? ('Hasil Tes:') : ('Test Result:')}</Text>
                <Text style={{ fontFamily: 'PlayfairDisplay-Regular',color: '#563728', fontSize: RFValue(22), marginBottom: 12}}>{!switchControl ? ('Peluang bertahan') : ('Survival Probability')}</Text>
                {!paymentSuccessful ? (<Image source={lock} style={{width: 50, height: 50, marginBottom:12}} />) : (<Text style={{ fontFamily: 'Montserrat-Bold', color: '#563728', fontSize: RFValue(34)}}>{String(survivalScore)?.slice(0, 3)}%</Text>)}
                {!paymentSuccessful && (<Text style={{ fontFamily: 'PlayfairDisplay-Regular',color: '#563728', fontSize: RFValue(16), marginBottom: 6}}>{!switchControl ? ('Apa yang akan Anda dapatkan?') : ('What will you get?')}</Text>)}
            </View>

            { !paymentSuccessful ? (<>
              <View style={[styles.subViews, {height: '20%'}]}>
                  <View style={styles.IconTextView}>
                      <Ionicons style={styles.checkmark} name="checkmark-circle-outline" />
                      <Text style={styles.listText}>
                          {!switchControl ? ('Persentase peluang hubungan Anda bertahan') : ('Percentage chance of your relationship surviving')}
                      </Text>
                  </View>
                  <View style={styles.IconTextView}>
                      <Ionicons style={styles.checkmark} name="checkmark-circle-outline" />
                      <Text style={styles.listText}>
                          {!switchControl ? ('Tips personal untuk memperkuat hubungan Anda') : ('Personalized tips to strengthen your relationship')}
                      </Text>
                  </View>
                  <View style={[styles.IconTextView, {marginBottom: 6, paddingVertical: 0}]}>
                      <Ionicons style={styles.checkmark} name="checkmark-circle-outline" />
                      <Text style={[styles.listText, {fontFamily: 'Montserrat-Bold', width: '68%'}]}>
                          {!switchControl ? ('BONUS E-book “Bertengkar Itu Sehat: Kenapa Konflik Bisa Menyelamatkan Hubungan” dalam PDF') : ('Bonus e-book "Fighting is Healthy: Why Conflict Can Save Your Relationship" in PDF')}
                      </Text>
                      <Image source={bookCover} contentFit="cover" style={{height: 78, width: 46}} />
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
                    <Image source={tag}  style={{ height: 40, width: 40}}/>
                  </View>
                  <View style={{ alignItems: 'center'}}>
                    <Image source={x} style={{ position: 'relative', top: 35, height: 40, width: 40}} />
                    <Text style={{ color: '#563728', fontFamily: 'Montserrat-Regular', marginLeft: 4, fontSize: RFValue(20)}}>
                          IDR 99,000
                    </Text>
                  </View>
                  <Text style={{ fontFamily: 'Montserrat-Regular', color: '#563728', position: 'relative', right: '20%'}}>{!switchControl ? ('Hanya') : ('Only')}</Text>
                  <Text style={{ fontFamily: 'Montserrat-Bold', color: '#563728', marginLeft: 4, fontSize: RFValue(26)}}>
                        IDR 49,000
                  </Text>
              </View>
              <TouchableOpacity style={styles.startTestButton} onPress={() => setIsModalVisible(true)}>
                  <Text style={styles.buttonText}>
                      {!switchControl ? ('PEMBAYARAN') : ('BUY NOW')}
                  </Text>
              </TouchableOpacity>

            </>) : (
              
            <>
              <View style={[styles.subViews, {alignItems: 'center'}]}>
                <View style={[styles.IconTextView, {borderBottomColor: '#563728', borderBottomWidth: 1}]}>
                    <Ionicons style={styles.checkmark} name="checkmark-circle-outline" />
                    <Text style={styles.listText}>
                        {!switchControl ? ('Meningkatkan komunikasi') : ('Improving communication')}
                    </Text>
                </View>
                <View style={[styles.IconTextView, {borderBottomColor: '#563728', borderBottomWidth: 1}]}>
                    <Ionicons style={styles.checkmark} name="checkmark-circle-outline" />
                    <Text style={styles.listText}>
                        {!switchControl ? ('Meningkatkan komunikasi') : ('Improving communication')}
                    </Text>
                </View>
                <View style={[styles.IconTextView, {borderBottomColor: '#563728', borderBottomWidth: 1}]}>
                    <Ionicons style={styles.checkmark} name="checkmark-circle-outline" />
                    <Text style={styles.listText}>
                        {!switchControl ? ('Meningkatkan komunikasi') : ('Improving communication')}
                    </Text>
                </View>
                <View style={[styles.IconTextView, {borderBottomColor: '#563728', borderBottomWidth: 1}]}>
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
              <Text style={styles.listText}>Please check your email for your FREE E-Book!</Text>
              <View style={[styles.subViews, {borderTopColor: '#563728', borderTopWidth: 1, paddingTop: 14, width: '74%'}]}>
                <Image source={check} style={styles.check}/>
                <Text style={{ color: '#563728', textAlign: 'center', width: '50%', fontFamily: 'Montserrat-Bold', fontSize: RFValue(20)}}>Payment Successful!</Text>
              </View>
            </>
            )}
            <PaymentModal isVisible={isModalVisible} onClose={toggleModal} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: isMaxIphone ? '6%' : '4%',
        paddingBottom: '6%',
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
      check: {
        width: 100,
        height: 100
      },
    subViews: {
        width: '100%',
        alignItems: 'center',
    }
})
