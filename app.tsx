import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { CalorieTracker } from './components/CalorieTracker.tsx';
import { GroceryList } from './components/GroceryList';
import { PantryTracker } from './components/PantryTracker';
import { MealPlanner } from './components/MealPlanner';

const Tab = createBottomTabNavigator();

const COLORS = {
  primary: '#667eea',
  secondary: '#764ba2',
  pastelPink: '#fbb6ce',
  pastelBlue: '#90cdf4',
  pastelGreen: '#9ae6b4',
  pastelPurple: '#d6bcfa',
  white: '#ffffff',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray500: '#6b7280',
  gray700: '#374151',
  gray900: '#111827',
};

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <View style={styles.container}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let backgroundColor;

              if (route.name === 'Calories') {
                iconName = 'trending-up';
                backgroundColor = focused ? COLORS.pastelPink : '#fce7f3';
              } else if (route.name === 'Grocery') {
                iconName = 'bag';
                backgroundColor = focused ? COLORS.pastelBlue : '#dbeafe';
              } else if (route.name === 'Pantry') {
                iconName = 'cube';
                backgroundColor = focused ? COLORS.pastelGreen : '#d1fae5';
              } else if (route.name === 'Meals') {
                iconName = 'restaurant';
                backgroundColor = focused ? COLORS.pastelPurple : '#e9d5ff';
              }

              return (
                <View style={[styles.tabIcon, { backgroundColor }]}>
                  <Icon name={iconName} size={size} color={color} />
                </View>
              );
            },
            tabBarActiveTintColor: COLORS.gray700,
            tabBarInactiveTintColor: COLORS.gray500,
            tabBarStyle: styles.tabBar,
            tabBarLabelStyle: styles.tabBarLabel,
            headerShown: false,
          })}
        >
          <Tab.Screen name="Calories" component={CalorieTracker} />
          <Tab.Screen name="Grocery" component={GroceryList} />
          <Tab.Screen name="Pantry" component={PantryTracker} />
          <Tab.Screen name="Meals" component={MealPlanner} />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  tabBar: {
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray100,
    paddingBottom: 8,
    paddingTop: 8,
    height: 80,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  tabIcon: {
    padding: 8,
    borderRadius: 16,
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});