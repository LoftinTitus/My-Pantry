import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

interface PantryItem {
  id: string;
  name: string;
  category: string;
  expirationDate: string;
  quantity: string;
  daysUntilExpiry: number;
}

export function PantryTracker() {
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([
    { 
      id: '1', 
      name: 'Whole wheat bread', 
      category: 'Bakery',
      expirationDate: '2025-07-20',
      quantity: '1 loaf',
      daysUntilExpiry: 2
    },
    { 
      id: '2', 
      name: 'Canned tomatoes', 
      category: 'Canned goods',
      expirationDate: '2026-03-15',
      quantity: '3 cans',
      daysUntilExpiry: 240
    },
    { 
      id: '3', 
      name: 'Greek yogurt', 
      category: 'Dairy',
      expirationDate: '2025-07-22',
      quantity: '4 cups',
      daysUntilExpiry: 4
    },
    { 
      id: '4', 
      name: 'Bananas', 
      category: 'Produce',
      expirationDate: '2025-07-19',
      quantity: '6',
      daysUntilExpiry: 1
    },
  ]);
  
  const [newItem, setNewItem] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newExpiration, setNewExpiration] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const calculateDaysUntilExpiry = (expirationDate: string): number => {
    const today = new Date();
    const expiry = new Date(expirationDate);
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const addPantryItem = () => {
    if (newItem && newExpiration) {
      const daysUntilExpiry = calculateDaysUntilExpiry(newExpiration);
      const newPantryItem: PantryItem = {
        id: Date.now().toString(),
        name: newItem,
        category: newCategory || 'Other',
        expirationDate: newExpiration,
        quantity: newQuantity || '1',
        daysUntilExpiry
      };
      setPantryItems([...pantryItems, newPantryItem]);
      setNewItem('');
      setNewCategory('');
      setNewExpiration('');
      setNewQuantity('');
      setShowAddForm(false);
    } else {
      Alert.alert('Error', 'Please fill in item name and expiration date');
    }
  };

  const getExpiryStatus = (days: number) => {
    if (days < 0) return { 
      status: 'expired', 
      backgroundColor: '#fecaca', 
      textColor: '#b91c1c', 
      text: 'Expired' 
    };
    if (days <= 3) return { 
      status: 'critical', 
      backgroundColor: '#fed7aa', 
      textColor: '#c2410c', 
      text: `${days}d left` 
    };
    if (days <= 7) return { 
      status: 'warning', 
      backgroundColor: '#fef3c7', 
      textColor: '#d97706', 
      text: `${days}d left` 
    };
    return { 
      status: 'good', 
      backgroundColor: '#bbf7d0', 
      textColor: '#16a34a', 
      text: `${days}d left` 
    };
  };

  const expiringSoon = pantryItems.filter(item => item.daysUntilExpiry <= 7).length;
  const expired = pantryItems.filter(item => item.daysUntilExpiry < 0).length;
  const sortedItems = [...pantryItems].sort((a, b) => a.daysUntilExpiry - b.daysUntilExpiry);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Pantry Tracker</Text>
        <Text style={styles.subtitle}>Monitor expiration dates</Text>
      </View>

      {/* Status Overview */}
      <View style={styles.statsGrid}>
        <Card style={[styles.statCard, { backgroundColor: '#fed7aa' }]}>
          <View style={styles.statHeader}>
            <Icon name="warning" size={18} color="#c2410c" />
            <Text style={[styles.statLabel, { color: '#c2410c' }]}>Expiring Soon</Text>
          </View>
          <Text style={[styles.statValue, { color: '#9a3412' }]}>{expiringSoon}</Text>
          <Text style={[styles.statUnit, { color: '#c2410c' }]}>items</Text>
        </Card>
        
        <Card style={[styles.statCard, { backgroundColor: '#fecaca' }]}>
          <View style={styles.statHeader}>
            <Icon name="time" size={18} color="#dc2626" />
            <Text style={[styles.statLabel, { color: '#dc2626' }]}>Expired</Text>
          </View>
          <Text style={[styles.statValue, { color: '#b91c1c' }]}>{expired}</Text>
          <Text style={[styles.statUnit, { color: '#dc2626' }]}>items</Text>
        </Card>
      </View>

      {/* Total Items Card */}
      <View style={styles.totalCard}>
        <View style={styles.cardHeader}>
          <View style={styles.cardHeaderLeft}>
            <Icon name="cube" size={20} color="rgba(255,255,255,0.8)" />
            <Text style={styles.cardHeaderText}>Total Items</Text>
          </View>
        </View>
        
        <View style={styles.totalDisplay}>
          <Text style={styles.totalNumber}>{pantryItems.length}</Text>
          <Text style={styles.totalLabel}>items in pantry</Text>
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
        <Card style={[styles.addForm, { backgroundColor: '#dbeafe' }]}>
          <Input
            placeholder="Item name"
            value={newItem}
            onChangeText={setNewItem}
            style={styles.formInput}
          />
          <Input
            placeholder="Category"
            value={newCategory}
            onChangeText={setNewCategory}
            style={styles.formInput}
          />
          <Input
            placeholder="Quantity"
            value={newQuantity}
            onChangeText={setNewQuantity}
            style={styles.formInput}
          />
          <Input
            placeholder="Expiration date (YYYY-MM-DD)"
            value={newExpiration}
            onChangeText={setNewExpiration}
            style={styles.formInput}
          />
          <View style={styles.formButtons}>
            <Button
              onPress={addPantryItem}
              style={[styles.formButton, styles.submitButton]}
            >
              Add to Pantry
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

      {/* Pantry Items */}
      <View style={styles.itemsSection}>
        <Text style={styles.sectionTitle}>Pantry Items</Text>
        <View style={styles.itemsList}>
          {sortedItems.map((item) => {
            const expiryInfo = getExpiryStatus(item.daysUntilExpiry);
            
            return (
              <Card key={item.id} style={styles.pantryItem}>
                <View style={styles.itemContent}>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <View style={styles.itemDetails}>
                      <Text style={styles.itemCategory}>{item.category} • {item.quantity}</Text>
                      <View style={styles.expirationInfo}>
                        <Icon name="calendar-outline" size={12} color="#6b7280" />
                        <Text style={styles.expirationText}>
                          Expires: {new Date(item.expirationDate).toLocaleDateString()}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={[
                    styles.expiryBadge, 
                    { backgroundColor: expiryInfo.backgroundColor }
                  ]}>
                    <Text style={[styles.expiryText, { color: expiryInfo.textColor }]}>
                      {expiryInfo.text}
                    </Text>
                  </View>
                </View>
              </Card>
            );
          })}
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
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
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
  totalCard: {
    backgroundColor: '#43e97b',
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
  totalDisplay: {
    alignItems: 'center',
  },
  totalNumber: {
    fontSize: 48,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  totalLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
  },
  addButtonContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  mainAddButton: {
    backgroundColor: '#667eea',
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
  itemsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  itemsList: {
    gap: 12,
  },
  pantryItem: {
    marginBottom: 0,
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  itemDetails: {
    gap: 4,
  },
  itemCategory: {
    fontSize: 14,
    color: '#6b7280',
  },
  expirationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expirationText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 4,
  },
  expiryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  expiryText: {
    fontSize: 12,
    fontWeight: '500',
  },
});