import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Image,
  StatusBar
} from 'react-native';

const CheckoutScreen = ({ route, navigation }) => {
  const { cartItems = [], totalAmount = 0 } = route.params || {};
  const [phone, setPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Process payment
  const processPayment = () => {
    // Basic validation
    if (!phone || !deliveryAddress) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Validate phone number format (simple check for Kenya number)
    if (!/^(0|\+254|254)[7|1][0-9]{8}$/.test(phone)) {
      Alert.alert('Error', 'Please enter a valid M-Pesa phone number');
      return;
    }

    // Simulate payment processing
    setIsProcessing(true);
    
    // Simulate a delay for processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      
      // Show success message
      Alert.alert(
        'Payment Successful',
        'Your order has been placed successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              // Navigate back to home with cart cleared
              navigation.navigate('Home', { cartCleared: true });
            }
          }
        ]
      );
    }, 3000);
  };

  // Render the order summary
  const renderOrderSummary = () => (
    <View style={styles.orderSummary}>
      <Text style={styles.summaryTitle}>Order Summary</Text>
      
      {cartItems.map(item => (
        <View key={item.id} style={styles.summaryItem}>
          <Text style={styles.summaryItemName}>{item.name}</Text>
          <Text style={styles.summaryItemPrice}>{item.price}</Text>
        </View>
      ))}
      
      <View style={styles.divider} />
      
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Subtotal</Text>
        <Text style={styles.summaryValue}>KES {totalAmount}</Text>
      </View>
      
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Delivery Fee</Text>
        <Text style={styles.summaryValue}>KES 200</Text>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.summaryRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>KES {totalAmount + 200}</Text>
      </View>
    </View>
  );

  // Render payment form
  const renderPaymentForm = () => (
    <View style={styles.paymentForm}>
      <Text style={styles.formTitle}>Payment Details</Text>
      
      <Text style={styles.inputLabel}>M-Pesa Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., 0712345678"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      
      <Text style={styles.inputLabel}>Delivery Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your delivery address"
        value={deliveryAddress}
        onChangeText={setDeliveryAddress}
        multiline
      />
      
      <Text style={styles.inputLabel}>Additional Information (Optional)</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Any special instructions for delivery"
        value={additionalInfo}
        onChangeText={setAdditionalInfo}
        multiline
        numberOfLines={4}
      />
      
      <TouchableOpacity
        style={styles.payButton}
        onPress={processPayment}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <Text style={styles.payButtonText}>Pay with M-Pesa</Text>
        )}
      </TouchableOpacity>
      
      <Text style={styles.secureText}>
        Your payment information is secure and encrypted
      </Text>
    </View>
  );

  // Render success screen
  const renderSuccessScreen = () => (
    <View style={styles.successContainer}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' }}
        style={styles.successImage}
        resizeMode="contain"
      />
      <Text style={styles.successTitle}>Order Placed!</Text>
      <Text style={styles.successText}>
        Your order has been successfully placed and will be delivered soon.
      </Text>
      <Text style={styles.orderNumber}>
        Order #: KFM{Math.floor(Math.random() * 10000)}
      </Text>
      
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.navigate('Home', { cartCleared: true })}
      >
        <Text style={styles.continueButtonText}>Continue Shopping</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Checkout</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {isComplete ? renderSuccessScreen() : (
          <>
            {renderOrderSummary()}
            {renderPaymentForm()}
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollContainer: {
    padding: 16,
  },
  orderSummary: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryItemName: {
    fontSize: 14,
    color: '#333',
  },
  summaryItemPrice: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  paymentForm: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  payButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  payButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  secureText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
  },
  successContainer: {
    alignItems: 'center',
    padding: 20,
  },
  successImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 12,
  },
  successText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginBottom: 24,
  },
  continueButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default CheckoutScreen;