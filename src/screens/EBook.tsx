import React, { useState } from 'react';
import { View, Text,TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { GlobalStateContext } from '../GlobalStateContext';
import book from '../assets/Images/book-cover.png'
import { TextInput } from 'react-native-gesture-handler';
import { db } from '../../secrets/firebaseConfig';
import { collection, doc, setDoc, updateDoc, getDocs } from "firebase/firestore"; 
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Asset } from 'expo-asset';

const { width, height } = Dimensions.get('window');
const isMaxIphone = width > 425 && height > 720;

export default function EBookScreen() {
  const { switchControl, selectedLanguage } = React.useContext(GlobalStateContext);

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [emailConfirmed, setEmailConfirmed] = useState(false)
  const [emailError, setEmailError] = useState(false);

  const downloadFile = async () => {
    // Load the asset
    const pdfAsset = Asset.fromModule(require('../assets/example.pdf'));
    await pdfAsset.downloadAsync(); // Ensure the asset is downloaded

    // Get the local URI
    const { localUri } = pdfAsset;

    // Destination path for saving the file
    const fileUri = FileSystem.documentDirectory + 'example.pdf';

    try {
        if (localUri) {
            // Create an anchor element and click it to trigger the download
            const link = document.createElement('a');
            link.href = localUri;
            link.download = 'example.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            console.log('Download complete', 'File downloaded successfully!');
          } else {
            console.log('File not found', 'Unable to find the file');
          }
    } catch (error) {
      console.error('Error downloading file:', error);
      console.log('Download failed', 'An error occurred while downloading the file');
    }
  };


  const userEnteredEmail = async (email: string, password: string) => {
    setEmailError(false)
    const lowerCaseEmail = email.toLowerCase()
    setEmail(lowerCaseEmail)

    const collectionRef = collection(db, 'emailList')
    const querySnapshot = await getDocs(collectionRef)
    const allEmails = querySnapshot.docs.map(doc => doc.data());

    let flag = true

    for (const index in allEmails) {
        if ((allEmails[index].email === lowerCaseEmail) && (allEmails[index]?.password === password)) {
            if (allEmails[index].paid) {
                setEmailConfirmed(true)
                flag = false
            }
        }
    }

    if (flag) {
        setEmailError(true)
        return
    }

    await updateDoc(doc(db, 'emailList', email), {
        paid: true
      });
  }

  return (
    <View style={styles.container}>
        {emailConfirmed ? (
            <View style={{width: '70%', height: '24%', paddingBottom: 20, justifyContent: 'space-between', alignItems: 'center'}}>
                <TouchableOpacity style={[styles.startTestButton, {height: 70, width: '80%', marginTop: 60}]} onPress={() => downloadFile()}>
                    <Text style={styles.buttonText}>
                        {!switchControl ? ('DOWNLOAD E-BOOK') : ('DOWNLOAD E-BOOK')}
                    </Text>
                </TouchableOpacity>
            </View>
        ) : (
        <View style={{width: '70%', height: '20%', paddingBottom: 20, justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={styles.bodyText}>Enter your email and password</Text>
            {emailError && (<Text style={{color: 'red', textAlign: 'center', marginTop: 4, fontFamily: 'Montserrat-Regular', fontSize: RFValue(10)}}>{!switchControl ? ("Sorry, the email or password is incorrect.") : ("Sorry, the email or password is incorrect.")}</Text>)}
            <TextInput style={[styles.input, {marginTop: 24}]} placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput style={[styles.input, {marginTop: 12, fontSize: 16, paddingVertical: 6}]} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={true} />
            <TouchableOpacity style={[styles.startTestButton, {height: 40, width: '64%', marginTop: 30}]} onPress={() => userEnteredEmail(email, password)}>
              <Text style={styles.buttonText}>
                {!switchControl ? ('UNLOCK') : ('UNLOCK')}
              </Text>
            </TouchableOpacity>
        </View>
        )}
    <View style={{alignItems: 'center'}}>
        <Image source={book} style={styles.ebook} />

        <Text style={styles.footerText}>
            © 2024 Relationship Pulse. All rights reserved.
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
    padding: 10,
    backgroundColor: '#E5DACE'
  },
  headerText: {
    fontSize: RFValue(22), // Adjusted to be responsive
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
    textAlign: 'center',
    marginTop: 20
  },
  ebook: {
    width: 160,
    height: 300,
    marginBottom: 10
  },
  startTestButton: {
    backgroundColor: '#874E4C',
    width: 200,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  buttonText: {
    color: 'white',
    fontSize: RFValue(14),
    fontFamily: 'Montserrat-Regular'
  },
  input: {
    width: '80%',
    paddingVertical: 6,
    fontSize: RFValue(14),
    borderColor: '#874E4C',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  footerText: {
    fontSize: RFValue(10), // Adjusted to be responsive
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    color: '#563728',
    marginBottom: 16,
    marginTop: 10
  }
});
