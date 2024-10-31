import React, { useState, useEffect, useRef } from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [buttonText, setButtonText] = useState("The Chef options");
  const [buttonText2, setButtonText2] = useState("Filter Menu");
  const [isModalVisible, setModalVisible] = useState(false); // State for modal visibility
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-20)).current;

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

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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
            <Text style={styles.modalText}>Are you sure you want to access the Chef options?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={confirmChefOption}>
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={cancelChefOption}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
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
    paddingVertical: 20,
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
});

export default HomeScreen;
