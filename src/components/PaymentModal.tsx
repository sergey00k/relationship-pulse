import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { GlobalStateContext } from '../GlobalStateContext';
import { RFValue } from "react-native-responsive-fontsize";
import { useStripe as useStripeJS, Elements, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { db } from '../../secrets/firebaseConfig';
import { doc, setDoc, updateDoc } from "firebase/firestore"; 
import SendEmail from './SendEmail';

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

  const [email, setEmail] = useState("")
  const [emailConfirmed, setEmailConfirmed] = useState(false)


  const [ovoCustomerId, setOvoCustomerId] = useState("");
  const [ovoCustomerName, setOvoCustomerName] = useState("");
  const [ovoCustomerPhone, setOvoCustomerPhone] = useState("");
  const [ovoCustomerEmail, setOvoCustomerEmail] = useState("");

  const [test, setTest] = useState('white');

  useEffect(() => {
    if (chosenPaymentMethod.length > 1) {
      setChosenPaymentMethod("")
    }
  }, [isVisible])

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
          amount: 330, // Example amount: 330 cents ($3.30)
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
      Alert.alert('Payment failed', result.error.message!);
    } else if (result.paymentIntent?.status === 'succeeded') {
      await updateDoc(doc(db, 'emailList', email), {
        paid: true
      });
      SendEmail(email)
      
      Alert.alert('Success', 'Your payment was successful!');
      onClose(); // Close the modal on success
    }
  };

  const userEnteredEmail = async (email: string) => {
    const lowerCaseEmail = email.toLowerCase()
    setEmail(lowerCaseEmail)
    
    try {
      await setDoc(doc(db, 'emailList', lowerCaseEmail), {
        email: lowerCaseEmail,
        paid: false
      });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
    setEmailConfirmed(true)
  }

  const handleOVOPayment = async () => {
    if (!chosenPaymentMethod) {
      setChosenPaymentMethod("ovo");
      return;
    }
  
    try {
      // Replace with sandbox URL for testing
      const response = await axios.post('https://api-sandbox.doku.com/ovo-open-api/v1/payment', {
        customer: {
          id: ovoCustomerId,
          name: ovoCustomerName,
          phone: ovoCustomerPhone,
          email: ovoCustomerEmail,
        },
        order: {
          invoice_number: 'MINV20201231468',
          line_items: [
            { name: 'Relationship test result', price: 49000, quantity: 1 },
          ],
          amount: 49000, // Use a realistic amount for testing
        },
        ovo_account: {
          token_id: 'valid-sandbox-token-id', // Replace with a valid sandbox token
          payment_use_ovo_point: false,
          success_payment_url: 'https://www.yoursite.com/success',
          failed_payment_url: 'https://www.yoursite.com/failed',
        },
      });
  
      const data = response.data;
      console.log(data); // Log the response for debugging
  
      if (data.error) {
        Alert.alert('OVO Payment Error', data.error.message);
      } else {
        Alert.alert('Success', 'OVO payment was successful!');
        onClose();
      }
    } catch (error) {
      console.error(error); // Log the error for debugging
      Alert.alert('Error', 'Failed to process OVO payment');
    }
  };

  

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContent}>
        {(!emailConfirmed || (!email.includes('@'))) ? ( 
          <View style={{width: '70%', height: '100%', paddingBottom: 20, justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={styles.modalTitle}>Enter your email</Text>
            <TextInput style={[styles.input, {marginTop: 24}]} placeholder="Email" value={email} onChangeText={setEmail} />
            <TouchableOpacity style={[styles.startTestButton, {height: 40, width: '64%', marginTop: 30}]} onPress={() => userEnteredEmail(email)}>
              <Text style={styles.buttonText}>
                {!switchControl ? ('CONFIRM') : ('CONFIRM')}
              </Text>
            </TouchableOpacity>
        </View>) : (
        <>
          {chosenPaymentMethod.length > 1 ? (
            <Text style={styles.modalTitle}>Enter your details</Text>
          ) : (
            <Text style={styles.modalTitle}>Choose a Payment Method</Text>
          )}
          {((chosenPaymentMethod.length > 1) && (email.includes('@'))) ? (
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
                  <TextInput
                    style={styles.input}
                    placeholder="Customer ID"
                    value={ovoCustomerId}
                    onChangeText={setOvoCustomerId}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Customer Name"
                    value={ovoCustomerName}
                    onChangeText={setOvoCustomerName}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Customer Phone"
                    value={ovoCustomerPhone}
                    onChangeText={setOvoCustomerPhone}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Customer Email"
                    value={ovoCustomerEmail}
                    onChangeText={setOvoCustomerEmail}
                  />
                  <TouchableOpacity style={styles.startTestButton} onPress={handleOVOPayment}>
                    <Text style={styles.buttonText}>Pay with OVO</Text>
                  </TouchableOpacity>
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
                <Text style={styles.buttonText}>OVO</Text>
              </TouchableOpacity>
            </>
          )}
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
  input: {
    width: '100%',
    height: 40,
    borderColor: '#874E4C',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5
  }
});

const StripePaymentModalWrapper: React.FC<PaymentModalProps> = (props) => (
  <Elements stripe={stripePromise}>
    <PaymentModal {...props} />
  </Elements>
);

export default StripePaymentModalWrapper;
