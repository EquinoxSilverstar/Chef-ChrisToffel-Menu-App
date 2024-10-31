import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Alert, } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { StackScreenProps } from '@react-navigation/stack';
import { AppStackParamList } from '../AppStackParamList';
import { MenuItem } from '../MenuItem';

type AddMenuItemScreenProps = StackScreenProps<AppStackParamList, 'AddMenuItem'> & {
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  menuItems: MenuItem[];
};


const categories = ['Starter', 'Main', 'Dessert'];

const AddMenuItemScreen: React.FC<AddMenuItemScreenProps> = ({ navigation, setMenuItems, menuItems }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const onAddMenuItem = () => {
    if (name && description && price && category) {
      const newMenuItem: MenuItem = {
        name,
        description,
        price: parseFloat(price),
        category,
        imageUri: imageUri || '',
      };

      setMenuItems([...menuItems, newMenuItem]);
      navigation.goBack();
    } else {
      Alert.alert('Please fill in all fields');
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access gallery is required!');
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
      console.log("Selected Image URI: ", pickerResult.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PICK A IMAGE</Text>
      
      <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
        <Image
          source={require('../assets/add-button.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.image} />
      )}
      
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
        <Text>Select a Category</Text>
        <View style={styles.dropdown}>
          {categories.map((cat) => (
            <Button
              key={cat}
              title={cat}
              color={category === cat ? 'black' : 'gray'}
              onPress={() => setCategory(cat)}
            />
          ))}
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        <Button title="Add Item" onPress={onAddMenuItem} color="black" />
        <TouchableOpacity onPress={() => navigation.navigate('ViewMenu')}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      
      
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
  dropdown: {
    flexDirection: 'column',
    justifyContent: 'space-around',
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
});

console.log(`i implemented a picker`);

export default AddMenuItemScreen;
