// PaymentScreen.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function PaymentScreen({ navigation }) {
  return (
    <View>
      <Text>Payment Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}
