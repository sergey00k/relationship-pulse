import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { db } from '../../secrets/firebaseConfig';
import { doc, setDoc, updateDoc } from "firebase/firestore"; 
import { Image } from 'expo-image';
import { GlobalStateContext } from '../GlobalStateContext';

import check from '../assets/Images/check.png'

const { width, height } = Dimensions.get('window');
const isMaxIphone = width > 425 && height > 720;

export default function ContactUsScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { switchControl, selectedLanguage } = React.useContext(GlobalStateContext);
  const [query, setQuery] = useState('');
  const [querySubmitted, setQuerySubmitted] = useState(false)

  const handleSubmit = async (email: string, name: string, query: string) => {
    if (querySubmitted) {
        return
    }

    const lowerCaseEmail = email.toLowerCase()
    setEmail(lowerCaseEmail)
    try {
        await setDoc(doc(db, 'customerQueries', lowerCaseEmail), {
          email: lowerCaseEmail,
          name: name,
          query: query
        });
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    setQuerySubmitted(true)
    setEmail("")
    setName("")
    setQuery("")
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Contact Us</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#A5A5A5"
        value={name}
        onChangeText={setName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#A5A5A5"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      
      <TextInput
        style={[styles.input, styles.queryInput]}
        placeholder="Your Query"
        placeholderTextColor="#A5A5A5"
        value={query}
        onChangeText={setQuery}
        multiline
      />
      
      <TouchableOpacity style={styles.submitButton} onPress={() => handleSubmit(email, name, query)}>
        {querySubmitted ? (
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.buttonText}>Submitted</Text>
                <Image source={check} style={{height: 20, width: 20, marginLeft: 8}} />
            </View>
        ) : (
            <Text style={styles.buttonText}>Submit</Text>
        )}
        
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#E5DACE',
  },
  headerText: {
    fontSize: RFValue(24), // Adjusted to be responsive
    color: '#563728',
    fontFamily: 'PlayfairDisplay-Bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    padding: 12,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#563728',
    fontSize: RFValue(14), // Adjusted to be responsive
    fontFamily: 'Montserrat-Regular',
    color: '#563728',
    backgroundColor: '#FFF',
  },
  queryInput: {
    height: 200,
    textAlignVertical: 'top',
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#874E4C',
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  buttonText: {
    fontSize: RFValue(14), // Adjusted to be responsive
    color: 'white',
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
  },
});
