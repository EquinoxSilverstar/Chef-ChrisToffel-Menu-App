import React, { useState, useEffect } from 'react';
import {View,Text,TextInput,TouchableOpacity,FlatList,StyleSheet,Image,ScrollView, Alert, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MenuItem } from '../MenuItem'; // Ensure MenuItem is correctly defined



const courses = ['Starter', 'Main Course', 'Dessert'];

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  // State variables for input fields
  const [name, setDishName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCourse] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  // Local state for menuItems
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  useEffect(() => {
    console.log(`Total items in menu: ${menuItems.length}`);
  }, [menuItems]);

  const addMenuItem = async () => {
    if (name && description && category && price && !isNaN(parseFloat(price))) {
      const newItem: MenuItem = {
        name,
        description,
        category,
        price: parseFloat(price),
        
      };
      setMenuItems([...menuItems, newItem]); // Update the menu items

      // Clear the input fields
      setDishName('');
      setDescription('');
      setCourse('');
      setPrice('');
    } else {
      Alert.alert('Error', 'Please fill in all fields with valid data');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.backgroundContainer}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
          <Image source={require('../assets/ChefAtYourService.png')} style={styles.image} />
          </View>
          <Text style={styles.text}>Enter Dish Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setDishName}
            placeholder="Dish Name"
            placeholderTextColor="grey"
          />

          <Text style={styles.text}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            placeholder="Description"
            placeholderTextColor="grey"
          />

          <Text style={styles.text}>Select The Course</Text>
          <View style={styles.courseButtonContainer}>
            {courses.map((courseOption) => (
              <TouchableOpacity
                key={courseOption}
                style={[
                  styles.courseButton,
                  category === courseOption && styles.selectedCourseButton,
                ]}
                onPress={() => setCourse(courseOption)}
              >
                <Text
                  style={[
                    styles.courseButtonText,
                    category === courseOption && styles.selectedCourseButtonText,
                  ]}
                >
                  {courseOption}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.text}>Enter Price</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            placeholder="Price"
            keyboardType="numeric"
            placeholderTextColor="grey"
          />

          <TouchableOpacity style={styles.button} onPress={addMenuItem}>
            <Text style={styles.buttonText}>Add Menu Item</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuContainer}>
          <Text style={styles.menuTitle}>Today's Menu</Text>
          <FlatList
            data={menuItems}
            keyExtractor={(item) => item.name}  // Use a unique property like 'name'
            renderItem={({ item }) => (
            <View style={styles.menuItem}>
              <View style={styles.menuTextContainer}>
              <Text style={styles.menuText2}>{item.category}</Text>
                <Text style={styles.menuText}>{item.name}</Text>
                <Text style={styles.menuDescription}>{item.description}</Text>
                <Text style={styles.price}>~R{item.price.toFixed(2)}</Text>
              </View>
              </View>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalItems}>Total Items:</Text>
            <Text style={styles.totalItemsCount}>{menuItems.length}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 22,
    marginVertical: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'white',
    color: 'white',
    width: '100%',
    marginBottom: 15,
    padding: 10,
  },
  courseButtonContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    width: '100%',
    flexDirection: 'column',
  },
  courseButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    width: '90%',
    alignItems: 'center',
   
  },
  selectedCourseButton: {
    backgroundColor: 'yellow',
  },
  courseButtonText: {
    color: 'white',
  },
  selectedCourseButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'yellow',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuContainer: {
    marginTop: 20,
    width: '100%',
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    color: 'white',
    marginBottom: 10,
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  menuTextContainer: {
    marginBottom: 5,
  },
  menuText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  menuText2: {
    fontSize: 29,
    fontFamily: 'monospace',
    fontWeight: 'bold',
    color: 'yellow',
  },
  price: {
    fontSize: 20,
    color: 'yellow',
  },
  menuDescription: {
    fontFamily: 'monospace',
    color: 'white',
  },
  image: {
    padding: 10,
    width: 350,
    height: 100,
    resizeMode: 'cover',
  },
  imageContainer: {
    marginBottom: 20,
  },
  totalContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  totalItems: {
    fontSize: 18,
    color: 'white',
  },
  totalItemsCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'yellow',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  backgroundContainer: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
