import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import { MenuItem } from '../MenuItem';

const FilterMenuScreen: React.FC<{ menuItems: MenuItem[] }> = ({ menuItems }) => {
  const [filteredCategory, setFilteredCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = filteredCategory ? item.category === filteredCategory : true;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Menu</Text>
      <Text style={styles.total}>Total items: {menuItems.length}</Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Search by name..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
 <View style={styles.buttonContainer2}>
           <TouchableOpacity
             onPress={() => setFilteredCategory(null)}
             style={[styles.button, filteredCategory === null && styles.activeButton]}>
           <Text style={styles.buttonText}>All Categories</Text>
         </TouchableOpacity>
          </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => setFilteredCategory('Starter')}
          style={[styles.button, filteredCategory === 'Starter' && styles.activeButton]}
        >
          <Text style={styles.buttonText}>Starters</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFilteredCategory('Main')}
          style={[styles.button, filteredCategory === 'Main' && styles.activeButton]}
        >
          <Text style={styles.buttonText}>Mains</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFilteredCategory('Dessert')}
          style={[styles.button, filteredCategory === 'Dessert' && styles.activeButton]}
        >
          <Text style={styles.buttonText}>Desserts</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredItems}
        renderItem={({ item }) => (
          <View style={styles.item}>
             <Text style={styles.itemCourse}>~{item.category}~</Text>
            <Image source={{ uri: item.imageUri }} style={styles.itemImage} />
            <Text style={styles.itemText}>{item.name} - R{item.price}</Text>
            <Text style={styles.itemText}>{item.description}</Text>
          </View>
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 29,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
    color: 'white',
    shadowColor: 'yellow',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 6.99,
    shadowRadius: 2,
    fontFamily: 'monospace',
  },
  searchBar: {
    height: 40,
    borderColor: 'yellow',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  buttonContainer2: {
    flexDirection: 'column',
    marginTop: 0,
    marginBottom: 40,
    marginLeft: 90,
    marginRight: 10,
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'yellow',
    minWidth: 100,
    maxWidth: 150,
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: 'yellow', // Active state color
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
    fontFamily: 'monospace',
    fontSize: 15,
  },
  item: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'yellow',
  },
  itemText: {
    fontSize: 18,
    marginBottom: 5,
    fontFamily: 'monospace',
    color: 'black',
  },
  itemCourse: {
    fontSize: 20,
    marginBottom: 5,
    fontFamily: 'monospace',
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    borderBottomColor: 'yellow',
    borderBottomWidth: 9,
    paddingBottom: 1,
   
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  total: {
    fontSize: 17,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 20,
    color: 'yellow',
    fontFamily: 'monospace',
  },
});

export default FilterMenuScreen;
