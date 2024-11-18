import React, { useState, useEffect, useRef } from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated, Modal, Pressable, Alert, TextInput, GestureResponderEvent } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [buttonText, setButtonText] = useState("The Chef options");
  const [buttonText2, setButtonText2] = useState("Filter Menu");
  const [isModalVisible, setModalVisible] = useState(false); // State for modal visibility
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-20)).current;

  const [pin, setPin] = useState('');
const [pinError, setPinError] = useState('');

const validatePin = () => {
  const correctPin = '1234'; // Replace with your actual PIN logic
  if (pin === correctPin) {
    confirmChefOption(); // Navigate if PIN is correct
    setPinError('');
  } else {
    setPinError('Invalid PIN. Please try again.');
  }
};


  const handleChefOptionPress = () => {
    setModalVisible(true); // Show modal on Chef button press
  };

  const confirmChefOption = () => {
    setModalVisible(false);
    setButtonText("Chef option");
    navigation.navigate('ViewMenu');
  };

  const cancelChefOption = () => {
    setModalVisible(false); // Close modal on cancel
  };

  const handleButtonPress2 = () => {
    setButtonText2("Filter Course");
    navigation.navigate('FilterMenu');
  };

  const startAnimation = () => {
    scaleValue.setValue(1);
    Animated.timing(scaleValue, {
      toValue: 1.2,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    });
  };

  useEffect(() => {
    startAnimation();
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    Animated.timing(translateY, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  function handleForgotPin(event: GestureResponderEvent): void {
    throw new Error('Function not implemented.');
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Animated.Image 
            source={require('../assets/ChefAtYourService.png')} 
            style={[styles.image, { transform: [{ scale: scaleValue }] }]} 
          />
        </View>
        <Animated.Text 
          style={[
            styles.animatedText2,
            { opacity: opacity, transform: [{ translateY: translateY }] }
          ]}
        >
          Welcome {"\n"}to{"\n"} Chef Christoffels
        </Animated.Text>
        <Text style={styles.text}>Today's Menu for you</Text>
        
        <TouchableOpacity onPress={handleChefOptionPress} style={styles.button}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleButtonPress2} style={styles.button}>
          <Text style={styles.buttonText}>{buttonText2}</Text>
        </TouchableOpacity>
      </View>
      
      <Modal
  animationType="slide"
  transparent={true}
  visible={isModalVisible}
  onRequestClose={cancelChefOption}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContainer}>
      <Text style={styles.modalText}>
        Please enter your PIN to access the Chef options.
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter PIN"
          secureTextEntry={true}
          value={pin}
          onChangeText={setPin}
        />
      </View>
      {pinError ? <Text style={styles.errorText}>{pinError}</Text> : null}
      <TouchableOpacity style={styles.forgotButton} onPress={handleForgotPin}>
       <Text style={styles.forgotButtonText}>Forgot PIN?</Text>
      </TouchableOpacity>
      <View style={styles.modalButtonContainer}>
        <TouchableOpacity style={styles.modalButton} onPress={validatePin}>
          <Text style={styles.modalButtonText}>proceed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modalButton} onPress={cancelChefOption}>
          <Text style={styles.modalButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>
</View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: 'black',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: 'black',
  
  },
  imageContainer: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 100,
  },
  text: {
    fontFamily: 'monospace',
    color: 'white',
    fontSize: 22,
    marginVertical: 5,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'yellow',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  animatedText2: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    backgroundColor: 'yellow',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  forgotButton: {
    marginBottom: 10,
  },
  forgotButtonText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  pinInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  pinError: {
    color:'red',
    marginBottom: 10,
  },
  pinButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
  },
  pinButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  

});

export default HomeScreen;
