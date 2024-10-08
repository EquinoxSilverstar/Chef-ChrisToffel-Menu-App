import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Import Image Picker from expo-image-picker
import { StackScreenProps } from '@react-navigation/stack';
import { AppStackParamList } from '../AppStackParaList';
import { MenuItem } from '../MenuItem';

type AddMenuItemScreenProps = StackScreenProps<AppStackParamList, 'AddMenuItem'> & {
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  menuItems: MenuItem[];
};

const categories = ['Appetizer', 'Main Course', 'Dessert'];

const AddMenuItemScreen: React.FC<AddMenuItemScreenProps> = ({ navigation, setMenuItems, menuItems }) => {
  const [name, setName] = useState ('');
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

      // Add the new item to the menuItems array
      setMenuItems([...menuItems, newMenuItem]);

      // Go back to the ViewMenu screen
      navigation.goBack();
    } else {
      alert('Please fill in all fields');
    }
  };

  // Function to handle image picking
  const pickImage = async () => {
    // Ask for permission to access the camera roll
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.granted === false) {
      alert('Permission to access gallery is required!');
      return;
    }

    // Open image picker
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setImageUri(pickerResult.assets[0].uri);
      console.log("Selected Image URI: ", pickerResult.assets[0].uri); // Log URI to ensure it's valid
    }
      // Set the selected image URI
       // Save the selected image URI
    }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Menu Item</Text>
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

      {/* Dropdown for categories */}
      <View style={styles.pickerContainer}>
        <Text>Select a Category</Text>
        <View style={styles.dropdown}>
          {categories.map((cat) => (
            <Button
              key={cat}
              title={cat}
              color={category === cat ? 'blue' : 'gray'}
              onPress={() => setCategory(cat)}
            />
          ))}
        </View>
      </View>

      {/* Image Picker and Display */}
      <Button title="Pick an Image" onPress={pickImage} />
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.image} />
      )}

      <Button title="Add Item" onPress={onAddMenuItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
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
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});

export default AddMenuItemScreen;
