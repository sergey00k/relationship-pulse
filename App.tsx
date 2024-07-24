import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, Switch, Text, Platform, Appearance } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Image } from 'expo-image';
import Modal from "react-native-modal";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Your imports
import { GlobalStateProvider, GlobalStateContext } from './src/GlobalStateContext';
import HomeScreen from './src/screens/HomeScreen';
import QuestionScreen from './src/screens/QuestionScreen';
import ResultScreen from './src/screens/ResultScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import AboutScreen from './src/screens/AboutUsScreen';
import ContactUsScreen from './src/screens/ContactUsScreen';
import EBookScreen from './src/screens/EBook';
import Logo from './src/assets/Images/logo.png';

const colorScheme = Appearance.getColorScheme();
const isDarkMode = colorScheme === 'dark'

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const { width, height } = Dimensions.get('window');
const isMobileDevice = width < 768;
const isMaxIphone = width > 425 && height > 720;

const Stack = createNativeStackNavigator();

const stripePromise = loadStripe('pk_live_51PVQObAxfjIWgFbrqOmIosM0DjVaUGL6tkMTeQyMAoIzLza4A44lWctZ8Guu83VoCXciHQcNQrmg2nvfXyPi4Xif00BNVHPKrM');

function CustomHeader({ navigation }) {
  const { switchControl, setSwitchControl, selectedLanguage, setSelectedLanguage } = React.useContext(GlobalStateContext);
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={Logo} style={{ width: 100, height: 60, marginTop: 10 }} />
        </TouchableOpacity>
        {isMobileDevice ? (
          <TouchableOpacity onPress={() => setDrawerVisible(true)}>
            <Ionicons name="menu-outline" size={width * 0.1} color="white" />
          </TouchableOpacity>
        ) : (
        <View></View>
        )}
      </View>
      <Modal isVisible={drawerVisible} animationIn="slideInRight" animationOut="slideOutRight" onBackdropPress={() => setDrawerVisible(false)}>
        <View style={styles.drawerContainer}>
          <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.drawerText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerItem} onPress={() => {navigation.navigate('AboutUs')}}>
            <Text style={styles.drawerText}>About Us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerItem} onPress={() => {navigation.navigate('ContactUs')}}>
            <Text style={styles.drawerText}>Contact Us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerItem} onPress={() => {navigation.navigate('Ebook')}}>
            <Text style={styles.drawerText}>E-Book</Text>
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
              thumbColor={"#fff"}// Ensures thumb color is always white
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
    'Montserrat-Regular': require('./src/assets/fonts/Montserrat/static/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('./src/assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
    'PlayfairDisplay-Regular': require('./src/assets/fonts/Playfair_Display/static/PlayfairDisplay-Regular.ttf'),
    'PlayfairDisplay-Bold': require('./src/assets/fonts/Playfair_Display/static/PlayfairDisplay-Bold.ttf'),
  });



  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
    /*if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.style.setProperty('color-scheme', 'light');
      document.documentElement.style.setProperty('background-color', 'red', 'important');
      document.documentElement.style.setProperty('color', '#000', 'important');
    }*/
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GlobalStateProvider>
      <Elements stripe={stripePromise}>
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
            <Stack.Screen name="AboutUs" component={AboutScreen} options={{ headerShown: true }} />
            <Stack.Screen name="ContactUs" component={ContactUsScreen} options={{ headerShown: true }} />
            <Stack.Screen name="Ebook" component={EBookScreen} options={{ headerShown: true }} />
          </Stack.Navigator>
        </NavigationContainer>
      </Elements>
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
    marginBottom: 24,
    width: '100%',
    borderBottomWidth: 0.8,
    borderColor: 'white',
    paddingVertical: 8,
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
    alignItems: 'center',
    height: isMaxIphone ? 100 : 80,
    width: '100%',
    backgroundColor: !isDarkMode ? '#874E4C' : '#874E4C',
  },

});
