import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface MealPlan {
  id: string;
  day: string;
  meals: {
    breakfast: string;
    lunch: string;
    dinner: string;
    snack: string;
  };
  totalCalories: number;
}

interface Recipe {
  id: string;
  name: string;
  calories: number;
  prepTime: number;
  ingredients: string[];
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export function MealPlanner() {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([
    {
      id: '1',
      day: 'Monday',
      meals: {
        breakfast: 'Overnight oats with berries',
        lunch: 'Grilled chicken salad',
        dinner: 'Salmon with quinoa',
        snack: 'Greek yogurt'
      },
      totalCalories: 1850
    },
    {
      id: '2',
      day: 'Tuesday',
      meals: {
        breakfast: 'Avocado toast',
        lunch: 'Turkey wrap',
        dinner: 'Stir-fry vegetables',
        snack: 'Almonds'
      },
      totalCalories: 1750
    },
  ]);

  const [recipes] = useState<Recipe[]>([
    {
      id: '1',
      name: 'Protein Smoothie Bowl',
      calories: 320,
      prepTime: 10,
      ingredients: ['Banana', 'Protein powder', 'Almond milk', 'Berries'],
      mealType: 'breakfast'
    },
    {
      id: '2',
      name: 'Mediterranean Bowl',
      calories: 450,
      prepTime: 15,
      ingredients: ['Quinoa', 'Chickpeas', 'Cucumber', 'Feta', 'Olive oil'],
      mealType: 'lunch'
    },
    {
      id: '3',
      name: 'Grilled Salmon',
      calories: 380,
      prepTime: 20,
      ingredients: ['Salmon fillet', 'Asparagus', 'Lemon', 'Herbs'],
      mealType: 'dinner'
    },
    {
      id: '4',
      name: 'Trail Mix',
      calories: 180,
      prepTime: 2,
      ingredients: ['Almonds', 'Dried cranberries', 'Dark chocolate chips'],
      mealType: 'snack'
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newDay, setNewDay] = useState('');
  const [selectedView, setSelectedView] = useState<'plans' | 'recipes'>('plans');

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const averageCalories = mealPlans.reduce((sum, plan) => sum + plan.totalCalories, 0) / mealPlans.length;

  const addMealPlan = () => {
    if (newDay) {
      const newPlan: MealPlan = {
        id: Date.now().toString(),
        day: newDay,
        meals: {
          breakfast: '',
          lunch: '',
          dinner: '',
          snack: ''
        },
        totalCalories: 0
      };
      setMealPlans([...mealPlans, newPlan]);
      setNewDay('');
      setShowAddForm(false);
    } else {
      Alert.alert('Error', 'Please select a day');
    }
  };

  const getMealTypeColor = (mealType: string) => {
    switch (mealType) {
      case 'breakfast': return { backgroundColor: '#fef3c7', textColor: '#d97706' };
      case 'lunch': return { backgroundColor: '#dbeafe', textColor: '#2563eb' };
      case 'dinner': return { backgroundColor: '#e9d5ff', textColor: '#7c3aed' };
      case 'snack': return { backgroundColor: '#d1fae5', textColor: '#059669' };
      default: return { backgroundColor: '#f3f4f6', textColor: '#6b7280' };
    }
  };

  const getMealIcon = (mealType: string) => {
    switch (mealType) {
      case 'breakfast': return 'sunny';
      case 'lunch': return 'partly-sunny';
      case 'dinner': return 'moon';
      case 'snack': return 'cafe';
      default: return 'restaurant';
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Meal Planner</Text>
        <Text style={styles.subtitle}>Plan your weekly nutrition</Text>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsGrid}>
        <Card style={[styles.statCard, { backgroundColor: '#e9d5ff' }]}>
          <View style={styles.statHeader}>
            <Icon name="calendar" size={18} color="#7c3aed" />
            <Text style={[styles.statLabel, { color: '#6d28d9' }]}>This Week</Text>
          </View>
          <Text style={[styles.statValue, { color: '#581c87' }]}>{mealPlans.length}</Text>
          <Text style={[styles.statUnit, { color: '#7c3aed' }]}>days planned</Text>
        </Card>
        
        <Card style={[styles.statCard, { backgroundColor: '#fef3c7' }]}>
          <View style={styles.statHeader}>
            <Icon name="analytics" size={18} color="#d97706" />
            <Text style={[styles.statLabel, { color: '#b45309' }]}>Avg Calories</Text>
          </View>
          <Text style={[styles.statValue, { color: '#92400e' }]}>{Math.round(averageCalories) || 0}</Text>
          <Text style={[styles.statUnit, { color: '#d97706' }]}>per day</Text>
        </Card>
      </View>

      {/* View Toggle */}
      <View style={styles.viewToggle}>
        <TouchableOpacity
          style={[styles.toggleButton, selectedView === 'plans' && styles.activeToggle]}
          onPress={() => setSelectedView('plans')}
        >
          <Text style={[styles.toggleText, selectedView === 'plans' && styles.activeToggleText]}>
            Meal Plans
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, selectedView === 'recipes' && styles.activeToggle]}
          onPress={() => setSelectedView('recipes')}
        >
          <Text style={[styles.toggleText, selectedView === 'recipes' && styles.activeToggleText]}>
            Recipes
          </Text>
        </TouchableOpacity>
      </View>

      {selectedView === 'plans' ? (
        <View>
          {/* Add Plan Button */}
          <View style={styles.addButtonContainer}>
            <Button
              onPress={() => setShowAddForm(!showAddForm)}
              style={styles.mainAddButton}
            >
              Plan a Day
            </Button>
          </View>

          {/* Add Plan Form */}
          {showAddForm && (
            <Card style={[styles.addForm, { backgroundColor: '#e9d5ff' }]}>
              <Text style={styles.formTitle}>Add Meal Plan</Text>
              <View style={styles.dayPicker}>
                {daysOfWeek.map((day) => (
                  <TouchableOpacity
                    key={day}
                    style={[
                      styles.dayButton,
                      newDay === day && styles.selectedDay
                    ]}
                    onPress={() => setNewDay(day)}
                  >
                    <Text style={[
                      styles.dayButtonText,
                      newDay === day && styles.selectedDayText
                    ]}>
                      {day.substring(0, 3)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.formButtons}>
                <Button
                  onPress={addMealPlan}
                  style={[styles.formButton, styles.submitButton]}
                >
                  Create Plan
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

          {/* Meal Plans */}
          <View style={styles.mealPlansList}>
            {mealPlans.map((plan) => (
              <Card key={plan.id} style={styles.mealPlanCard}>
                <View style={styles.planHeader}>
                  <Text style={styles.planDay}>{plan.day}</Text>
                  <View style={styles.caloriesBadge}>
                    <Text style={styles.caloriesText}>{plan.totalCalories} cal</Text>
                  </View>
                </View>
                
                <View style={styles.mealsGrid}>
                  <View style={[styles.mealItem, { backgroundColor: '#fef3c7' }]}>
                    <Icon name={getMealIcon('breakfast')} size={16} color="#d97706" />
                    <View style={styles.mealInfo}>
                      <Text style={[styles.mealType, { color: '#92400e' }]}>Breakfast</Text>
                      <Text style={styles.mealName}>
                        {plan.meals.breakfast || 'Not planned'}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={[styles.mealItem, { backgroundColor: '#dbeafe' }]}>
                    <Icon name={getMealIcon('lunch')} size={16} color="#2563eb" />
                    <View style={styles.mealInfo}>
                      <Text style={[styles.mealType, { color: '#1e40af' }]}>Lunch</Text>
                      <Text style={styles.mealName}>
                        {plan.meals.lunch || 'Not planned'}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={[styles.mealItem, { backgroundColor: '#e9d5ff' }]}>
                    <Icon name={getMealIcon('dinner')} size={16} color="#7c3aed" />
                    <View style={styles.mealInfo}>
                      <Text style={[styles.mealType, { color: '#6d28d9' }]}>Dinner</Text>
                      <Text style={styles.mealName}>
                        {plan.meals.dinner || 'Not planned'}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={[styles.mealItem, { backgroundColor: '#d1fae5' }]}>
                    <Icon name={getMealIcon('snack')} size={16} color="#059669" />
                    <View style={styles.mealInfo}>
                      <Text style={[styles.mealType, { color: '#047857' }]}>Snack</Text>
                      <Text style={styles.mealName}>
                        {plan.meals.snack || 'Not planned'}
                      </Text>
                    </View>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.recipesList}>
          <Text style={styles.sectionTitle}>Recipe Collection</Text>
          {recipes.map((recipe) => {
            const colors = getMealTypeColor(recipe.mealType);
            return (
              <Card key={recipe.id} style={styles.recipeCard}>
                <View style={styles.recipeHeader}>
                  <View style={styles.recipeInfo}>
                    <Text style={styles.recipeName}>{recipe.name}</Text>
                    <View style={styles.recipeStats}>
                      <View style={styles.recipeStat}>
                        <Icon name="flame" size={14} color="#ef4444" />
                        <Text style={styles.recipeStatText}>{recipe.calories} cal</Text>
                      </View>
                      <View style={styles.recipeStat}>
                        <Icon name="time" size={14} color="#6b7280" />
                        <Text style={styles.recipeStatText}>{recipe.prepTime} min</Text>
                      </View>
                    </View>
                  </View>
                  <View style={[
                    styles.mealTypeBadge,
                    { backgroundColor: colors.backgroundColor }
                  ]}>
                    <Text style={[styles.mealTypeBadgeText, { color: colors.textColor }]}>
                      {recipe.mealType.charAt(0).toUpperCase() + recipe.mealType.slice(1)}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.ingredientsList}>
                  <Text style={styles.ingredientsTitle}>Ingredients:</Text>
                  <Text style={styles.ingredientsText}>
                    {recipe.ingredients.join(', ')}
                  </Text>
                </View>
              </Card>
            );
          })}
        </View>
      )}
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
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeToggle: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  activeToggleText: {
    color: '#111827',
  },
  addButtonContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  mainAddButton: {
    backgroundColor: '#d6bcfa',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 16,
  },
  addForm: {
    marginBottom: 24,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
    textAlign: 'center',
  },
  dayPicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
    justifyContent: 'center',
  },
  dayButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    minWidth: 45,
    alignItems: 'center',
  },
  selectedDay: {
    backgroundColor: '#7c3aed',
  },
  dayButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  selectedDayText: {
    color: 'white',
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
  mealPlansList: {
    gap: 16,
  },
  mealPlanCard: {
    marginBottom: 0,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  planDay: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  caloriesBadge: {
    backgroundColor: '#e9d5ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  caloriesText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#7c3aed',
  },
  mealsGrid: {
    gap: 12,
  },
  mealItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
  },
  mealInfo: {
    marginLeft: 12,
    flex: 1,
  },
  mealType: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  mealName: {
    fontSize: 14,
    color: '#6b7280',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  recipesList: {
    gap: 16,
  },
  recipeCard: {
    marginBottom: 0,
  },
  recipeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  recipeInfo: {
    flex: 1,
  },
  recipeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  recipeStats: {
    flexDirection: 'row',
    gap: 16,
  },
  recipeStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recipeStatText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
  mealTypeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  mealTypeBadgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  ingredientsList: {
    marginTop: 8,
  },
  ingredientsTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 4,
  },
  ingredientsText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
});