import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { MenuItem } from '../MenuItem';

const categories = ['Starter', 'Main', 'Dessert'];

interface AddMenuItemScreenProps {
  navigation: any;
  setMenuItems: (menuItems: MenuItem[]) => void;
  menuItems: MenuItem[];
}

const AddMenuItemScreen: React.FC<AddMenuItemScreenProps> = ({ navigation, setMenuItems, menuItems }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(categories[0]); // Default category
  const [imageUri, setImageUri] = useState<string | null>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const showErrorModal = (message: string) => {
    setErrorMessage(message);
    setModalVisible(true);
  };

  const onAddMenuItem = () => {
    if (!name || !description || !price || !category) {
      showErrorModal('Please fill in all fields');
      return;
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      showErrorModal('Price must be a valid number');
      return;
    }

    const newMenuItem = {
      name,
      description,
      price: parsedPrice,
      category,
      imageUri: imageUri || '',
    };

    setMenuItems([...menuItems, newMenuItem]);
    navigation.goBack();
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      showErrorModal('Permission to access the gallery is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setImageUri(pickerResult.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Menu Item</Text>

      <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
        <Image
          source={require('../assets/add-button.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />

      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Select a Category</Text>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
        >
          {categories.map((cat) => (
            <Picker.Item key={cat} label={cat} value={cat} />
          ))}
        </Picker>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Add Item" onPress={onAddMenuItem} color="black" />
        <TouchableOpacity onPress={() => navigation.navigate('ViewMenu')}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Errors */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{errorMessage}</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: "yellow",
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: 100,
    fontFamily: 'monospace',
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  pickerContainer: {

    marginBottom: 20,
  },

  pickerLabel: {
    fontFamily: 'monospace',
    fontSize: 16,
    marginBottom: 5,
    
  },

  picker: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    height: 50,
    width: '100%',
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 120,
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
    justifyContent: 'center',
  },
  imagePickerButton: {
    backgroundColor: 'black',
    width: 100,
    height: 100,
    marginRight: 90,
    marginLeft: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 5,
  },
  icon: {
    width: 80,
    height: 80,
    tintColor: 'white',
  },
  buttonContainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelText: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
    
  },
  button: {
    backgroundColor: "green",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "black",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: 'monospace',
  }

});

export default AddMenuItemScreen;
