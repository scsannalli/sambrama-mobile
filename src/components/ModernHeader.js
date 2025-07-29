import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../theme/Colors';

export const ModernHeader = ({ 
  title, 
  subtitle, 
  gradient = Colors.gradients.primary,
  style,
  titleStyle,
  subtitleStyle,
  showBackButton = false,
  onBackPress,
  navigation
}) => {
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else if (navigation) {
      navigation.goBack();
    }
  };

  return (
    <LinearGradient
      colors={gradient}
      style={[styles.header, style]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {showBackButton && (
        <TouchableOpacity 
          onPress={handleBackPress}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      )}
      
      <View style={styles.content}>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  
  content: {
    alignItems: 'center',
  },
  
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.onPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  
  subtitle: {
    fontSize: 16,
    color: Colors.onPrimary,
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 22,
  },
  
  backButton: {
    position: 'absolute',
    top: 60,
    left: 8,
    zIndex: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  
  backButtonText: {
    color: Colors.onPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
});
