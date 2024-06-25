import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, Switch, Text } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import QuestionScreen from './screens/QuestionScreen';
import ResultScreen from './screens/ResultScreen';
import PaymentScreen from './screens/PaymentScreen';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Logo from './assets/Images/logo.png';
import { Image } from 'expo-image';
import Modal from "react-native-modal";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { GlobalStateProvider, GlobalStateContext } from './GlobalStateContext';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const { width, height } = Dimensions.get('window');
const isMobileDevice = width < 768;
const isMaxIphone = width > 300 && height > 900;

const Stack = createNativeStackNavigator();

function CustomHeader({ navigation }) {
  const { switchControl, setSwitchControl, selectedLanguage, setSelectedLanguage } = React.useContext(GlobalStateContext);
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={Logo} style={{ width: 120, height: 80, marginTop: 16 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setDrawerVisible(true)}>
          <Ionicons name="menu-outline" size={width * 0.1} color="white" />
        </TouchableOpacity>
      </View>
      <Modal isVisible={drawerVisible} animationIn="slideInRight" animationOut="slideOutRight" onBackdropPress={() => setDrawerVisible(false)}>
        <View style={styles.drawerContainer}>
          <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.drawerText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerItem}>
            <Text style={styles.drawerText}>About Us</Text>
          </TouchableOpacity>
          <View style={styles.drawerItem}>
            <Text style={styles.drawerText}>Language: </Text>
            <Text style={[styles.drawerText, { marginTop: 8, marginBottom: 8 }]}>{selectedLanguage}</Text>
            <Switch
              onValueChange={() => {
                if (!switchControl) {
                  setSwitchControl(true);
                  setSelectedLanguage('English');
                } else {
                  setSwitchControl(false);
                  setSelectedLanguage('Bahasa Indonesia');
                }
              }}
              trackColor={{ false: "#34C759", true: "#34C759" }}
              ios_backgroundColor="#34C759"
              value={switchControl}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('./assets/fonts/Montserrat/static/Montserrat-Regular.ttf'),
    'PlayfairDisplay-Regular': require('./assets/fonts/Playfair_Display/static/PlayfairDisplay-Regular.ttf'),
    'PlayfairDisplay-Bold': require('./assets/fonts/Playfair_Display/static/PlayfairDisplay-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GlobalStateProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            header: ({ navigation }) => <CustomHeader navigation={navigation} />,
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: true }} />
          <Stack.Screen name="Question" component={QuestionScreen} options={{ headerShown: true }} />
          <Stack.Screen name="Result" component={ResultScreen} options={{ headerShown: true }} />
          <Stack.Screen name="Payment" component={PaymentScreen} options={{ headerShown: true }} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalStateProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerContainer: {
    position: 'absolute',
    paddingHorizontal: 14,
    paddingTop: height * 0.094,
    right: -20,
    height: height,
    width: width * 0.3,
    backgroundColor: '#874E4C',
  },
  drawerItem: {
    marginBottom: 30,
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: 'white',
    paddingVertical: 12,
  },
  drawerText: {
    fontSize: RFValue(14),
    fontFamily: 'Montserrat-Regular',
    color: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '6%',
    paddingTop: isMobileDevice ? '10%' : 0,
    alignItems: 'center',
    height: isMaxIphone ? 140 : 120,
    width: '100%',
    backgroundColor: '#874E4C',
  },
});
