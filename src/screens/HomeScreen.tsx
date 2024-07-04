import React, { useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, SwitchComponent } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Image } from 'expo-image';
import { GlobalStateContext } from '../GlobalStateContext';

import HomeBackground from '../assets/Images/boyGirlBackground.png';

const { width, height } = Dimensions.get('window');
const isMobileDevice = width < 768;

const isMaxIphone = width > 300 && height > 900;

export default function HomeScreen({ navigation, route }) {
  const { switchControl, selectedLanguage } = useContext(GlobalStateContext);

  useEffect(() => {
    console.log(switchControl + ' this is the log')
  },[switchControl])

  return (
    <View style={styles.container}>
      <Image style={styles.backgroundImage} contentFit="cover" source={HomeBackground} />
      <Text style={[styles.headerText, switchControl && {width: '40%'}]}>
        {!switchControl ? ('Seberapa sehatkah hubunganmu?') : ('How healthy is your relationship?')}
      </Text>
      <View style={styles.bottomContentContainer}>
        <Text style={styles.subHeaderText}>
          {!switchControl ? ('2,673 Tes dilakukan dalam 30 hari terakhir') : ('2,673 Tests taken in the last 30 days')}
        </Text>
        <View style={styles.divider}>
          <Text style={styles.titleText}>
            {!switchControl ? ('Mengapa tes ini penting?') : ('Why is this test important?')}
          </Text>
        </View>
        <View style={styles.listContainer}>
          <View style={styles.IconTextView}>
            <Ionicons style={styles.checkmark} name="checkmark-circle-outline" />
            <Text style={styles.listText}>
              {!switchControl ? ('Meningkatkan komunikasi') : ('Improving communication')}
            </Text>
          </View>
          <View style={styles.IconTextView}>
            <Ionicons style={styles.checkmark} name="checkmark-circle-outline" />
            <Text style={styles.listText}>
              {!switchControl ? ('Mendeteksi masalah sejak dini') : ('Identifying issues early')}
            </Text>
          </View>
          <View style={styles.IconTextView}>
            <Ionicons style={styles.checkmark} name="checkmark-circle-outline" />
            <Text style={styles.listText}>
              {!switchControl ? ('Memperdalam ikatan emosional') : ('Strengthening emotional connections')}
            </Text>
          </View>
          <View style={styles.IconTextView}>
            <Ionicons style={styles.checkmark} name="checkmark-circle-outline" />
            <Text style={styles.listText}>
              {!switchControl ? ('Memantau perkembangan hubungan') : ('Tracking relationship development')}
            </Text>
          </View>
          <View style={styles.IconTextView}>
            <Ionicons style={styles.checkmark} name="checkmark-circle-outline" />
            <Text style={styles.listText}>
              {!switchControl ? ('Menjaga hubungan tetap sehat dan harmonis') : ('Maintaining a healthy and harmonious relationship')}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.startTestButton} onPress={() => navigation.navigate('Question', {switchControl})}>
          <Text style={styles.buttonText}>
            {!switchControl ? ('MULAI TES (FREE)') : ('START TEST (FREE)')}
          </Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>
          Copyright © 2024 Relationship Pulse. All rights reserved.
        </Text>
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
  },
  bottomContentContainer: {
    height: '62%',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  listContainer: {
    width: '100%',
    height: '40%',
    justifyContent: 'space-between',
    paddingHorizontal: '8%',
    marginBottom: 20
  },
  backgroundImage: {
    width: '100%',
    height: '36%'
  },
  startTestButton: {
    backgroundColor: '#874E4C',
    width: '38%',
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  IconTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 14,
    marginBottom: 4
  },
  checkmark: {
    fontSize: 32,
    marginRight: 8,
    color: 'black'
  },
  headerText: {
    position: 'absolute',
    top: 130,
    left: 26,
    width: '42%',
    color: 'white',
    textAlign: 'left',
    fontSize: RFValue(20), // Adjusted to be responsive
    fontFamily: 'PlayfairDisplay-Regular',
    lineHeight: RFValue(26) // Adjusted to be responsive
  },
  subHeaderText: {
    fontSize: RFValue(10), // Adjusted to be responsive
    width: '36%',
    marginTop: 8,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular'
  },
  divider: {
    borderTopColor: 'black',
    borderTopWidth: 2,
    paddingTop: isMaxIphone ? 28 : 22
  },
  titleText: {
    fontSize: RFValue(22), // Adjusted to be responsive
    textAlign: 'center',
    fontFamily: 'PlayfairDisplay-Regular'
  },
  listText: {
    fontSize: RFValue(12), // Adjusted to be responsive
    fontFamily: 'Montserrat-Regular',
  },
  buttonText: {
    fontSize: RFValue(11),
    color: 'white',
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center'
  },
  footerText: {
    fontSize: RFValue(8), // Adjusted to be responsive
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center'
  }
});
