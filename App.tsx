import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddMenuItemScreen from './screens/AddMenuItemScreen';
import ViewMenuScreen from './screens/ViewMenuScreen';
import HomeScreen from './screens/HomeScreen';
import EditMenuItem from './screens/EditMenuItem';
import FilterMenuScreen from './screens/FilterMenuScreen';
import { MenuItem } from './MenuItem';

const Stack = createStackNavigator();

const App: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    console.log(`Total items in menu: ${menuItems.length}`);
  }, [menuItems]);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'yellow',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="ViewMenu">
          {(props) => <ViewMenuScreen {...props} menuItems={menuItems} setMenuItems={setMenuItems} />}
        </Stack.Screen>
        <Stack.Screen name="AddMenuItem">
          {(props) => <AddMenuItemScreen {...props} menuItems={menuItems} setMenuItems={setMenuItems} />}
        </Stack.Screen>
        <Stack.Screen name="EditMenuItem">
          {(props) => <EditMenuItem {...props} menuItems={menuItems} setMenuItems={setMenuItems} />}
        </Stack.Screen>
        <Stack.Screen name="FilterMenu">
          {(props) => <FilterMenuScreen {...props} menuItems={menuItems} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
