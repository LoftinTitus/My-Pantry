import React from 'react';
import { TextInput, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface InputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  keyboardType?: 'default' | 'numeric' | 'email-address';
  secureTextEntry?: boolean;
  multiline?: boolean;
}

export function Input({ 
  placeholder, 
  value, 
  onChangeText, 
  style,
  textStyle,
  keyboardType = 'default',
  secureTextEntry = false,
  multiline = false
}: InputProps) {
  return (
    <TextInput
      style={[styles.input, style, textStyle]}
      placeholder={placeholder}
      placeholderTextColor="#9ca3af"
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      multiline={multiline}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#374151',
    borderWidth: 0,
  },
});