import React from 'react';
import { Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import SibApiV3Sdk from 'sib-api-v3-sdk';

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

  // Configure Brevo (Sendinblue) API
  const defaultClient = SibApiV3Sdk.ApiClient.instance;
  const apiKey = defaultClient.authentications['api-key'];
  apiKey.apiKey = 'YOUR_BREVO_API_KEY'; // Replace with your Brevo API key

  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail({
    to: [{ email }],
    sender: { email: 'your-email@example.com', name: 'Your Name' },
    subject: 'Here is your E-Book',
    htmlContent: '<html><body><p>Here is your E-Book</p></body></html>',
    attachments: [
      {
        content: base64Attachment.split(',')[1], // Remove base64 prefix
        name: 'example.pdf',
      },
    ],
  });

  try {
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Email sent successfully:', response);
    Alert.alert('Email sent successfully');
  } catch (error) {
    console.error('Failed to send email:', error);
    Alert.alert('Failed to send email');
  }
};

export default SendEmail;
