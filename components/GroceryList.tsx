import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

interface GroceryItem {
  id: string;
  name: string;
  quantity: string;
  completed: boolean;
  category: string;
}

export function GroceryList() {
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([
    { id: '1', name: 'Organic apples', quantity: '6', completed: false, category: 'Produce' },
    { id: '2', name: 'Greek yogurt', quantity: '2 cups', completed: true, category: 'Dairy' },
    { id: '3', name: 'Chicken breast', quantity: '1 lb', completed: false, category: 'Meat' },
    { id: '4', name: 'Brown rice', quantity: '1 bag', completed: false, category: 'Pantry' },
  ]);
  
  const [newItem, setNewItem] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  
  const completedItems = groceryItems.filter(item => item.completed).length;
  const totalItems = groceryItems.length;

  const addGroceryItem = () => {
    if (newItem) {
      const newGroceryItem: GroceryItem = {
        id: Date.now().toString(),
        name: newItem,
        quantity: newQuantity || '1',
        completed: false,
        category: 'Other'
      };
      setGroceryItems([...groceryItems, newGroceryItem]);
      setNewItem('');
      setNewQuantity('');
      setShowAddForm(false);
    } else {
      Alert.alert('Error', 'Please enter an item name');
    }
  };

  const toggleItem = (id: string) => {
    setGroceryItems(items =>
      items.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteItem = (id: string) => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => setGroceryItems(items => items.filter(item => item.id !== id))
        }
      ]
    );
  };

  const groupedItems = groceryItems.reduce((groups, item) => {
    const category = item.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {} as Record<string, GroceryItem[]>);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Grocery List</Text>
        <Text style={styles.subtitle}>Never forget an item again</Text>
      </View>

      {/* Progress Card */}
      <View style={styles.progressCard}>
        <View style={styles.cardHeader}>
          <View style={styles.cardHeaderLeft}>
            <Icon name="bag" size={20} color="rgba(255,255,255,0.8)" />
            <Text style={styles.cardHeaderText}>Shopping Progress</Text>
          </View>
          <Text style={styles.cardHeaderValue}>{completedItems}/{totalItems}</Text>
        </View>
        
        <View style={styles.progressDisplay}>
          <Text style={styles.progressNumber}>{Math.round((completedItems / totalItems) * 100) || 0}%</Text>
          <Text style={styles.progressLabel}>completed</Text>
        </View>
      </View>

      {/* Add Item Button */}
      <View style={styles.addButtonContainer}>
        <Button
          onPress={() => setShowAddForm(!showAddForm)}
          style={styles.mainAddButton}
        >
          Add Item
        </Button>
      </View>

      {/* Add Item Form */}
      {showAddForm && (
        <Card style={[styles.addForm, { backgroundColor: '#e9d5ff' }]}>
          <Input
            placeholder="Item name"
            value={newItem}
            onChangeText={setNewItem}
            style={styles.formInput}
          />
          <Input
            placeholder="Quantity (optional)"
            value={newQuantity}
            onChangeText={setNewQuantity}
            style={styles.formInput}
          />
          <View style={styles.formButtons}>
            <Button
              onPress={addGroceryItem}
              style={[styles.formButton, styles.submitButton]}
            >
              Add to List
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

      {/* Grocery Items by Category */}
      <View style={styles.categoriesContainer}>
        {Object.entries(groupedItems).map(([category, items]) => (
          <View key={category} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{category}</Text>
            <View style={styles.itemsList}>
              {items.map((item) => (
                <Card 
                  key={item.id} 
                  style={[
                    styles.groceryItem,
                    item.completed && styles.completedItem
                  ]}
                >
                  <View style={styles.itemContent}>
                    <TouchableOpacity
                      onPress={() => toggleItem(item.id)}
                      style={styles.checkbox}
                    >
                      <Icon 
                        name={item.completed ? "checkmark-circle" : "ellipse-outline"} 
                        size={24} 
                        color={item.completed ? "#10b981" : "#d1d5db"} 
                      />
                    </TouchableOpacity>
                    <View style={styles.itemInfo}>
                      <Text style={[
                        styles.itemName,
                        item.completed && styles.completedText
                      ]}>
                        {item.name}
                      </Text>
                      {item.quantity && (
                        <Text style={styles.itemQuantity}>{item.quantity}</Text>
                      )}
                    </View>
                    <TouchableOpacity
                      onPress={() => deleteItem(item.id)}
                      style={styles.deleteButton}
                    >
                      <Icon name="trash-outline" size={16} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                </Card>
              ))}
            </View>
          </View>
        ))}
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
  progressCard: {
    backgroundColor: '#4facfe',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
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
  progressDisplay: {
    alignItems: 'center',
  },
  progressNumber: {
    fontSize: 48,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  progressLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
  },
  addButtonContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  mainAddButton: {
    backgroundColor: '#f093fb',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 16,
  },
  addForm: {
    marginBottom: 24,
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
  categoriesContainer: {
    gap: 24,
  },
  categorySection: {
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  itemsList: {
    gap: 8,
  },
  groceryItem: {
    backgroundColor: 'white',
    marginBottom: 0,
  },
  completedItem: {
    backgroundColor: '#f9fafb',
    opacity: 0.75,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 2,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#6b7280',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#6b7280',
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
  },
});