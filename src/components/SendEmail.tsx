import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import emailjs from 'emailjs-com';

// Initialize EmailJS with your public key and options


const SendEmail = async (email: string) => {

    const fetchFileAsBase64 = async (filePath: string): Promise<string> => {
        const response = await fetch(filePath);
        const blob = await response.blob();
        const reader = new FileReader();
    
        return new Promise<string>((resolve, reject) => {
          reader.onerror = () => {
            reader.abort();
            reject(new Error('Error parsing file'));
          };
    
          reader.onload = () => {
            resolve(reader.result as string);
          };
    
          reader.readAsDataURL(blob);
        });
      };

    const fileUri = require('../assets/example.pdf');
    const base64Attachment = await fetchFileAsBase64(fileUri);


    const templateParams = {
        to_email: email,
        message: 'Here is your E-Book',
        attachment: base64Attachment,
    };

    emailjs.init('zFM3HmNPJl7UpDW2X');

    emailjs.send('service_sanfhil', 'template_cbp3ihs', templateParams)
        .then((response) => {
        console.log('Email sent successfully:', response.status, response.text);
        Alert.alert('Email sent successfully');
        })
        .catch((error) => {
        console.error('Failed to send email:', error);
        Alert.alert('Failed to send email');
        });

};

export default SendEmail;
