import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Colors } from '../theme/Colors';

export const ModernInput = ({ 
  label, 
  value, 
  onChangeText, 
  placeholder, 
  multiline = false,
  numberOfLines = 1,
  style,
  inputStyle,
  error,
  ...props 
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          multiline && styles.multilineInput,
          error && styles.errorInput,
          inputStyle
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.onSurfaceVariant}
        multiline={multiline}
        numberOfLines={numberOfLines}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.onSurface,
    marginBottom: 8,
  },
  
  input: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.outline,
    color: Colors.onSurface,
    shadowColor: Colors.shadow.light,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  
  errorInput: {
    borderColor: Colors.error,
    borderWidth: 2,
  },
  
  errorText: {
    fontSize: 12,
    color: Colors.error,
    marginTop: 4,
  },
});
