import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Modal, Button, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import { AppStackParamList } from '../AppStackParamList';
import { MenuItem } from '../MenuItem';
import { ScrollView } from 'react-native-gesture-handler';

type ViewMenuScreenProps = StackScreenProps<AppStackParamList, 'ViewMenu'> & {
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
};

const ViewMenuScreen: React.FC<ViewMenuScreenProps> = ({ navigation, menuItems, setMenuItems }) => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDeleteItem = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalVisible(true);
  };

  useEffect(() => {
    loadMenuItems();
  }, []);

  useEffect(() => {
    if (menuItems.length > 0) {
      saveMenuItems(menuItems);
    }
  }, [menuItems]);

  const loadMenuItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('menuItems');
      if (storedItems) {
        setMenuItems(JSON.parse(storedItems));
      }
    } catch (error) {
      console.error("Failed to load menu items from storage:", error);
    }
  };

  const saveMenuItems = async (items: MenuItem[]) => {
    try {
      await AsyncStorage.setItem('menuItems', JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save menu items to storage:", error);
    }
  };

  const confirmDelete = () => {
    if (selectedItem) {
      const updatedItems = menuItems.filter(item => item !== selectedItem);
      setMenuItems(updatedItems);
    }
    setIsModalVisible(false);
  };

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <ScrollView style={styles.item}>
      {item.imageUri ? (
        <Image source={{ uri: item.imageUri }} style={styles.image} />
      ) : (
        <Text style={styles.noImageText}>No Image</Text>
      )}
      <Text style={styles.itemTitle}>Course Name</Text>
      <Text style={styles.itemText}>~{item.name}</Text>
      <Text style={styles.itemTitle}>Price</Text>
      <Text style={styles.itemText}>~ R{item.price}</Text>
      <Text style={styles.itemTitle}>Category</Text>
      <Text style={styles.itemText}>~{item.category}</Text>
      <Text style={styles.itemTitle}>Description</Text>
      <Text style={styles.itemText}>~{item.description}</Text>

      <View style={styles.ButtonAlign}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'rgb(255, 222, 0)' }]}
          onPress={() => navigation.navigate('EditMenuItem', { menuItem: item })}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteItem(item)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const calculatePrices = (items: MenuItem[]) => {
    const total = items.reduce((sum, item) => sum + item.price, 0);
    const average = items.length ? total / items.length : 0;
    return { total, average };
  };

  const { total, average } = calculatePrices(menuItems);

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.title}>Menu Items</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddMenuItem')}
        >
          <Text style={styles.buttonText}>Add Menu Item</Text>
        </TouchableOpacity>
        <Text style={styles.totalPrice}>Total menu items: {menuItems.length}</Text>
        <Text style={styles.totalPrice}>Total Price: R{total.toFixed(2)}</Text>
        <Text style={styles.totalPrice}>Average Price: R{average.toFixed(2)}</Text>
      </View>
      {menuItems.length === 0 ? (
        <Text style={{ color: 'white', textAlign: 'center', marginTop: 20 }}>
          No items found in the menu.
        </Text>
      ) : (
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.name}
          renderItem={renderMenuItem}
        />
      )}

      <Modal visible={isModalVisible} transparent={true} onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Delete Item?</Text>
            <Text style={styles.modalText}>Are you sure you want to delete this menu item?</Text>
            <View style={styles.modalButtonContainer}>
              <Button title="Yes" color="red" onPress={confirmDelete} />
              <Button title="No" color="black" onPress={() => setIsModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};
;

const styles = StyleSheet.create({
  container: {
    padding: 2,
    paddingBottom: 200,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 20,
    marginBottom: 0,
    fontFamily: 'monospace',
    color: 'white',
    textAlign: 'center',
    borderColor: 'yellow',
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  totalPrice: {
    fontSize: 12,
    marginBottom: 5,
    color: 'white',
    fontFamily: 'monospace',
    borderBottomColor: 'yellow',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginVertical: 5,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  filterButton: {
    padding: 10,
    backgroundColor: 'gray',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selectedFilter: {
    backgroundColor: 'yellow',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  filterText: {
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'yellow',
  },
  itemTitle: {
    fontFamily: 'monospace',
    fontSize: 20,
    marginBottom: 10,
    color: 'yellow',
    textTransform: 'uppercase',
  },
  image: {
    width: 350,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    resizeMode: 'cover',
    borderColor: 'yellow',
    borderWidth: 2,
  },
  ButtonAlign: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    marginBottom: 10,
    margin: 120,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: 100,
    height: 40,
  },
  addButton: {
    backgroundColor: 'rgb(255, 222, 0)',
    padding: 10,
    width: 200,
    height: 40,
    marginLeft: 90,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  deleteButton: {
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: 'red',
    width: 90,
    height: 40,
    marginLeft: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    textAlign: 'center',
  },
  noImageText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    color: 'white',
    marginBottom: 10,
  },
  itemText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'monospace',
  },
  totalPri: {
    fontSize: 22,
    marginBottom: 5,
    color: 'black',
    fontFamily: 'monospace',
    borderBottomColor: 'yellow',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginVertical: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deleteText: {
    color: 'red',
    textDecorationLine: 'underline',
  },
});

console.log(`i implemented a picker`);


export default ViewMenuScreen;
