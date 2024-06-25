// ResultScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function ResultScreen({ route, navigation }) {
    const { healthScore, survivalScore, switchControl } = route.params || {};

    useEffect(() => {
        console.log('healthScore: ' + healthScore)
        console.log('survivalScore: ' + survivalScore)
    },[healthScore, survivalScore, route.params])

    return (
        <View>
        <Text>Result Screen</Text>
        <Button title="Go to Payment" onPress={() => navigation.navigate('Payment')} />
        </View>
    );
}
