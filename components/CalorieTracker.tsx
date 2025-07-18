import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

interface FoodEntry {
  id: string;
  name: string;
  calories: number;
  time: string;
}

export function CalorieTracker() {
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([
    { id: '1', name: 'Oatmeal with berries', calories: 320, time: '8:30 AM' },
    { id: '2', name: 'Grilled chicken salad', calories: 450, time: '12:45 PM' },
  ]);
  
  const [newFood, setNewFood] = useState('');
  const [newCalories, setNewCalories] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  
  const dailyGoal = 2000;
  const totalCalories = foodEntries.reduce((sum, entry) => sum + entry.calories, 0);
  const remainingCalories = dailyGoal - totalCalories;
  const progressPercentage = (totalCalories / dailyGoal) * 100;

  const addFoodEntry = () => {
    if (newFood && newCalories) {
      const newEntry: FoodEntry = {
        id: Date.now().toString(),
        name: newFood,
        calories: parseInt(newCalories),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setFoodEntries([...foodEntries, newEntry]);
      setNewFood('');
      setNewCalories('');
      setShowAddForm(false);
    } else {
      Alert.alert('Error', 'Please fill in both food name and calories');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Daily Calories</Text>
        <Text style={styles.subtitle}>Track your nutrition goals</Text>
      </View>

      {/* Daily Overview Card */}
      <View style={styles.gradientCard}>
        <View style={styles.cardHeader}>
          <View style={styles.cardHeaderLeft}>
            <Icon name="flag" size={20} color="rgba(255,255,255,0.8)" />
            <Text style={styles.cardHeaderText}>Daily Goal</Text>
          </View>
          <Text style={styles.cardHeaderValue}>{dailyGoal} cal</Text>
        </View>
        
        <View style={styles.calorieDisplay}>
          <Text style={styles.calorieNumber}>{totalCalories}</Text>
          <Text style={styles.calorieLabel}>calories consumed</Text>
        </View>
        
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${Math.min(progressPercentage, 100)}%` }]} />
        </View>
        
        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>
            Remaining: {remainingCalories > 0 ? remainingCalories : 0} cal
          </Text>
          <Text style={styles.progressText}>{Math.round(progressPercentage)}% of goal</Text>
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsGrid}>
        <Card style={[styles.statCard, { backgroundColor: '#fce7f3' }]}>
          <View style={styles.statHeader}>
            <Icon name="flame" size={18} color="#ec4899" />
            <Text style={[styles.statLabel, { color: '#be185d' }]}>Burned</Text>
          </View>
          <Text style={[styles.statValue, { color: '#9d174d' }]}>420</Text>
          <Text style={[styles.statUnit, { color: '#db2777' }]}>calories</Text>
        </Card>
        
        <Card style={[styles.statCard, { backgroundColor: '#dbeafe' }]}>
          <View style={styles.statHeader}>
            <Icon name="time" size={18} color="#3b82f6" />
            <Text style={[styles.statLabel, { color: '#1d4ed8' }]}>Last meal</Text>
          </View>
          <Text style={[styles.statValue, { color: '#1e40af' }]}>2h</Text>
          <Text style={[styles.statUnit, { color: '#2563eb' }]}>ago</Text>
        </Card>
      </View>

      {/* Food Entries */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Meals</Text>
          <Button
            onPress={() => setShowAddForm(!showAddForm)}
            style={[styles.addButton, { backgroundColor: '#d1fae5' }]}
            textStyle={{ color: '#047857' }}
            size="sm"
          >
            Add Food
          </Button>
        </View>

        {/* Add Food Form */}
        {showAddForm && (
          <Card style={[styles.addForm, { backgroundColor: '#d1fae5' }]}>
            <Input
              placeholder="Food name"
              value={newFood}
              onChangeText={setNewFood}
              style={styles.formInput}
            />
            <Input
              placeholder="Calories"
              value={newCalories}
              onChangeText={setNewCalories}
              keyboardType="numeric"
              style={styles.formInput}
            />
            <View style={styles.formButtons}>
              <Button
                onPress={addFoodEntry}
                style={[styles.formButton, styles.submitButton]}
              >
                Add Entry
              </Button>
              <Button
                onPress={() => setShowAddForm(false)}
                style={[styles.formButton, styles.cancelButton]}
                textStyle={{ color: '#374151' }}
              >
                Cancel
              </Button>
            </View>
          </Card>
        )}

        {/* Food List */}
        <View style={styles.foodList}>
          {foodEntries.map((entry) => (
            <Card key={entry.id} style={styles.foodItem}>
              <View style={styles.foodItemContent}>
                <View style={styles.foodInfo}>
                  <Text style={styles.foodName}>{entry.name}</Text>
                  <Text style={styles.foodTime}>{entry.time}</Text>
                </View>
                <View style={styles.calorieInfo}>
                  <Text style={styles.foodCalories}>{entry.calories}</Text>
                  <Text style={styles.calorieUnit}>calories</Text>
                </View>
              </View>
            </Card>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  gradientCard: {
    backgroundColor: '#667eea',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardHeaderText: {
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 8,
    fontSize: 16,
  },
  cardHeaderValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  calorieDisplay: {
    alignItems: 'center',
    marginBottom: 16,
  },
  calorieNumber: {
    fontSize: 48,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  calorieLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
  },
  progressBar: {
    height: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 6,
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 6,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 4,
  },
  statUnit: {
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  addButton: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  addForm: {
    marginBottom: 16,
  },
  formInput: {
    marginBottom: 12,
  },
  formButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  formButton: {
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#43e97b',
  },
  cancelButton: {
    backgroundColor: '#f3f4f6',
  },
  foodList: {
    gap: 12,
  },
  foodItem: {
    marginBottom: 0,
  },
  foodItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  foodTime: {
    fontSize: 14,
    color: '#6b7280',
  },
  calorieInfo: {
    alignItems: 'flex-end',
  },
  foodCalories: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ea580c',
    marginBottom: 2,
  },
  calorieUnit: {
    fontSize: 12,
    color: '#6b7280',
  },
});