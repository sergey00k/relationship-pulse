import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { GlobalStateContext } from '../GlobalStateContext';
import { RFValue } from "react-native-responsive-fontsize";
import { useStripe as useStripeJS, Elements, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

interface PaymentModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const stripePromise = loadStripe('pk_test_51PVQObAxfjIWgFbrSwnC54rN9jy1J7nnjT8R2dLt4OKpjRVemzRNCtFupPcxhWUkw9uNHf3zcnkpIf3Z3RQswoB100F74OiGHP');

const PaymentModal: React.FC<PaymentModalProps> = ({ isVisible, onClose }) => {
  const { switchControl } = React.useContext(GlobalStateContext);
  const stripe = useStripeJS();
  const elements = useElements();
  const [chosenPaymentMethod, setChosenPaymentMethod] = useState("");
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const [test, setTest] = useState('white');

  useEffect(() => {
    if (isVisible && stripe) {
      createPaymentIntent();
    }
  }, [isVisible, stripe]);


  const createPaymentIntent = async () => {
    try {
      const response = await fetch('https://us-central1-relationshippulse-427504.cloudfunctions.net/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 330, // Example amount: 5000 cents ($50.00)
          currency: 'usd',
        }),
      });

      const data = await response.json();


      if (data.error) {

        Alert.alert('Error', data.error.message);
      } else {
        setClientSecret(data.clientSecret);
      }
    } catch (error) {

      Alert.alert('Error', 'Failed to create payment intent');
    }
  };

  const handleStripePayment = async () => {
    if (!chosenPaymentMethod) {
      setChosenPaymentMethod("stripe");
      return;
    }
    if (!stripe || !elements) {
      Alert.alert('Stripe is not loaded');
      return;
    }

    if (!clientSecret) {
      await createPaymentIntent();

      if (!clientSecret) {
        Alert.alert('Payment Intent is not created');
        return;
      }
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);


    if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
      Alert.alert('Stripe elements are not loaded properly');

      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardNumberElement,
        billing_details: {
          name: 'Jenny Rosen',
        },
      },
    });


    if (result.error) {
      setTest('red')
      Alert.alert('Payment failed', result.error.message!);

    } else if (result.paymentIntent?.status === 'succeeded') {
      setTest('green')
      Alert.alert('Success', 'Your payment was successful!');
      onClose(); // Close the modal on success
    }
  };

  const handleOVOPayment = async () => {
    if (!chosenPaymentMethod) {
      setChosenPaymentMethod("ovo");
      return;
    }
    // Placeholder for OVO payment API call
    Alert.alert('OVO Payment', 'OVO payment functionality is not implemented.');
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={[styles.modalContent, {backgroundColor: test}]}>
        {chosenPaymentMethod.length > 1 ? (<Text style={styles.modalTitle}>Enter your details</Text>) : (<Text style={styles.modalTitle}>Choose a Payment Method</Text>)}
        {chosenPaymentMethod.length > 1 ? (
          <>
            {chosenPaymentMethod === 'stripe' && (
              <View style={styles.cardContainer}>
                <View style={{ borderBottomWidth: 0.5, borderColor: '#874E4C'}}>
                  <CardNumberElement
                    options={{
                      style: {
                        base: {
                          fontSize: '22px',
                          color: '#424770',
                          letterSpacing: '0.025em',
                          fontFamily: 'Montserrat, sans-serif',
                          '::placeholder': {
                            color: '#aab7c4',
                          },
                        },
                        invalid: {
                          color: '#9e2146',
                        },
                      },
                    }}
                  />
                </View>
                <View style={styles.expiryCvcContainer}>
                  <View style={styles.expiryContainer}>
                    <CardExpiryElement
                      options={{
                        style: {
                          base: {
                            fontSize: '22px',
                            color: '#424770',
                            letterSpacing: '0.025em',
                            fontFamily: 'Montserrat, sans-serif',
                            '::placeholder': {
                              color: '#aab7c4',
                            },
                          },
                          invalid: {
                            color: '#9e2146',
                          },
                        },
                      }}
                    />
                  </View>
                  <View style={styles.cvcContainer}>
                    <CardCvcElement
                      options={{
                        style: {
                          base: {
                            fontSize: '22px',
                            textAlign: 'flex-end',
                            color: '#424770',
                            letterSpacing: '0.025em',
                            fontFamily: 'Montserrat, sans-serif',
                            '::placeholder': {
                              color: '#aab7c4',
                            },
                          },
                          invalid: {
                            color: '#9e2146',
                          },
                        },
                      }}
                    />
                  </View>
                </View>
                <View style={{width: '100%', alignItems: 'center'}}>
                  <TouchableOpacity style={[styles.startTestButton, {height: 40, width: '64%', marginTop: 30}]} onPress={handleStripePayment}>
                    <Text style={styles.buttonText}>
                      {!switchControl ? ('BAYAR') : ('BUY NOW')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {chosenPaymentMethod === 'ovo' && (
              <View style={styles.cardContainer}>
                {/*<CardElement options={{ hidePostalCode: true }} />*/}
              </View>
            )}
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.startTestButton} onPress={handleStripePayment}>
              <Text style={styles.buttonText}>
                {!switchControl ? ('KARTU CREDIT/DEBIT') : ('CREDIT/DEBIT CARD')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.startTestButton} onPress={handleOVOPayment}>
              <Text style={styles.buttonText}>
                OVO
              </Text>
            </TouchableOpacity>
          </>
        )}
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
  cardContainer: {
    width: '64%',
  },
  expiryCvcContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 26
  },
  expiryContainer: {
    flex: 1,
    marginRight: 10,
    borderBottomWidth: 0.5,
    borderColor: '#874E4C'
  },
  cvcContainer: {
    flex: 1,
    width: '25%',
    borderBottomWidth: 0.5,
    borderColor: '#874E4C'
  },
});

const StripePaymentModalWrapper: React.FC<PaymentModalProps> = (props) => (
  <Elements stripe={stripePromise}>
    <PaymentModal {...props} />
  </Elements>
);

export default StripePaymentModalWrapper;
