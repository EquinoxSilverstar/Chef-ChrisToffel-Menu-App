import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Modal, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AppStackParamList } from '../AppStackParamList';
import * as ImagePicker from 'expo-image-picker';
import { MenuItem } from '../MenuItem';

type EditMenuItemScreenProps = StackScreenProps<AppStackParamList, 'EditMenuItem'> & {
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  menuItems: MenuItem[];
};

const EditMenuItem: React.FC<EditMenuItemScreenProps> = ({ route, navigation, setMenuItems, menuItems }) => {
  const { params: { menuItem } } = route;

  const [name, setName] = useState(menuItem.name);
  const [description, setDescription] = useState(menuItem.description);
  const [price, setPrice] = useState(menuItem.price.toString());
  const [category, setCategory] = useState(menuItem.category);
  const [imageUri, setImageUri] = useState(menuItem.imageUri);

  const onSaveChanges = () => {
    const updatedItem: MenuItem = {
      name,
      description,
      price: parseFloat(price),
      category,
      imageUri,
    };

    const updatedMenuItems = menuItems.map((item) =>
      item.name === menuItem.name ? updatedItem : item
    );

    setMenuItems(updatedMenuItems);
    navigation.goBack();
  };
  
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const showErrorModal = (message: string) => {
    setErrorMessage(message);
    setModalVisible(true);
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
      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />
        <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
        <Image
          source={require('../assets/add-button.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <Button title="Save Changes" color= 'black' onPress={onSaveChanges} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  imagePickerButton: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  icon: {
    width: 50,
    height: 50,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
  

});

export default EditMenuItem;
