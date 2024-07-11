import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { GlobalStateContext } from '../GlobalStateContext';

const { width, height } = Dimensions.get('window');
const isMaxIphone = width > 425 && height > 720;

export default function AboutScreen() {
  const { switchControl, selectedLanguage } = React.useContext(GlobalStateContext);

  return (
    <View style={styles.container}>

            <Text style={styles.headerText}>
                {!switchControl ? ("Tentang Kami") : ("About Us")}
            </Text>
            <Text style={styles.bodyText}>{!switchControl ? (`Selamat datang di Relationship Pulse!
Perjalanan kami dimulai dengan misi untuk membantu pasangan memahami kesehatan hubungan mereka.

Mobile website kami menawarkan tes yang cepat dan mudah untuk memberi Anda wawasan tentang kekuatan dan area yang perlu ditingkatkan dalam hubungan Anda. Baik untuk Anda yang baru memulai hubungan atau yang sudah lama bersama, tes kami akan membantu Anda mengevaluasi dan memperbaiki hubungan Anda.

Untuk mendukung perjalanan ini, kami juga telah menciptakan e-book yang penuh dengan saran praktis dan tips untuk menjadikan hubungan Anda lebih sehat.

Bergabunglah bersama kami dalam perjalanan ini!`) : (`Welcome to Relationship Pulse!\n Our journey began with a mission to help couples better understand their relationships' health.\n\nOur mobile website offers quick and easy tests designed to give you insights into your relationship's strengths and areas for growth. Whether you're just starting or have been together for years, our tests will help you evaluate and improve your bond.\n\n To further support you on this journey, we've created an e-book packed with practical advice and tips to make your relationship even healthier.\n\nJoin us on this journey!`)}
            </Text>

      <Text style={styles.footerText}>
        © 2024 Relationship Pulse. All rights reserved.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#E5DACE'
  },
  headerText: {
    fontSize: RFValue(24), // Adjusted to be responsive
    color: '#563728',
    fontFamily: 'PlayfairDisplay-Bold',
    marginBottom: 16,
    textAlign: 'center',
    marginTop: 30
  },
  bodyText: {
    fontSize: RFValue(14), // Adjusted to be responsive
    color: '#563728',
    fontFamily: 'Montserrat-Regular',
    marginBottom: 30,
    textAlign: 'center',
    marginTop: 20,
    borderTopColor: '#563728',
    borderTopWidth: 1,
    paddingVertical: 34,
    borderBottomWidth: 1,
    width: '86%'
  },
  footerText: {
    fontSize: RFValue(10), // Adjusted to be responsive
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    color: '#563728',
    marginBottom: 16
  }
});
