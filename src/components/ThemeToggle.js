import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../ThemeContext';

export const ThemeToggle = () => {
  const { dark, toggleTheme } = useTheme();
  
  return (
    <TouchableOpacity onPress={toggleTheme} style={styles.toggleContainer}>
      <Ionicons 
        name={dark ? 'moon' : 'sunny'}
        size={24}
        color={dark ? '#ff6b6b' : '#333'}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
  },
});