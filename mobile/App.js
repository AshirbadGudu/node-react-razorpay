import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
const App = () => {
  const payNow = async () => {
    try {
      const response = await fetch(
        `http://localhost:5337/generate-razorpay-id`,
        {
          headers: {'Content-Type': 'application/json'},
          method: 'POST',
          body: JSON.stringify({amount: 200}),
        },
      );
      const data = await response.json();
      const options = {
        key: 'rzp_test_VULKZYu2VDqjkD',
        currency: data.currency,
        amount: data.amount.toString(),
        order_id: data.id,
        name: 'Node React Razorpay',
        description: 'Node React Razorpay',
        prefill: {
          name: 'Ashirbad Panigrahi',
          email: 'ashirbada@ashirbada.com',
          contact: '+91 9123456789',
        },
      };
      const {razorpay_payment_id} = await RazorpayCheckout.open(options);
      console.log(razorpay_payment_id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
      <Text style={{fontWeight: 'bold', fontSize: 18, marginVertical: 15}}>
        Welcome To React Native Razorpay
      </Text>
      <Button title="Pay Now" onPress={payNow} />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
