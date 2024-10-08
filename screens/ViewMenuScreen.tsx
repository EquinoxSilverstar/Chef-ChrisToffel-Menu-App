import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AppStackParamList } from '../AppStackParaList';
import { MenuItem } from '../MenuItem';
import { Image } from 'react-native'; 
              
type ViewMenuScreenProps = StackScreenProps<AppStackParamList, 'ViewMenu'> & {
  menuItems: MenuItem[];
};

const ViewMenuScreen: React.FC<ViewMenuScreenProps> = ({ navigation, menuItems }) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, marginBottom: 20, fontFamily: 'serif' }}>Menu Items</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.item}>
              {item.imageUri ? (
              <Image source={{ uri: item.imageUri }} style={styles.image} />
              
            ) : (
              <Text style={styles.noImageText}>No Image</Text>
            )}
            <Text style={styles.itemText}>{item.name} - ${item.price}</Text>
            <Text style={styles.itemText}>{item.category}</Text>
            <Text style={styles.itemText}>{item.description}</Text>
            <Button
              title="Edit"
              onPress={() => navigation.navigate('EditMenuItem', { menuItem: item })}
            />
          </View>
        )}
      />
      <Button title="Add Menu Item" onPress={() => navigation.navigate('AddMenuItem')} />
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
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
  },
  noImageText: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
    resizeMode: 'contain',
  }
});

export default ViewMenuScreen;
