import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { GlobalStateContext } from '../GlobalStateContext';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

interface PaymentModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isVisible, onClose }) => {
    const { switchControl, selectedLanguage } = React.useContext(GlobalStateContext);

  const handleStripeCheckout = () => {
    const checkoutUrl = 'https://buy.stripe.com/eVacQ51p1eedd3OdQQ'; // Replace with your Stripe Checkout URL
    window.location.href = checkoutUrl;
  };

  const handleOVOPayment = async () => {
    // Placeholder for OVO payment API call
    Alert.alert('OVO Payment', 'OVO payment functionality is not implemented.');
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Choose a Payment Method</Text>
        <TouchableOpacity style={styles.startTestButton} onPress={handleStripeCheckout}>
          <Text style={styles.buttonText}>
            {!switchControl ? ('KARTU CREDIT/DEBIT') : ('CREDIT/DEBIT CARD')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.startTestButton} onPress={handleOVOPayment}>
          <Text style={styles.buttonText}>
           OVO
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: '#E5DACE',
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 280
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  startTestButton: {
    backgroundColor: '#874E4C',
    width: 200,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: RFValue(14),
    fontFamily: 'Montserrat-Regular'
  },
});

export default PaymentModal;
