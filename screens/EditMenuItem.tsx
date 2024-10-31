import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AppStackParamList } from '../AppStackParamList';
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
      <TextInput
        placeholder="Image URI"
        value={imageUri}
        onChangeText={setImageUri}
        style={styles.input}
      />
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

});

export default EditMenuItem;
