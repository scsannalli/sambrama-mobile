import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../theme/Colors';

export const ModernButton = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'medium',
  loading = false,
  disabled = false,
  gradient = null,
  style,
  textStyle 
}) => {
  const getButtonStyle = () => {
    const baseStyle = [styles.button];
    
    switch (size) {
      case 'small':
        baseStyle.push(styles.smallButton);
        break;
      case 'large':
        baseStyle.push(styles.largeButton);
        break;
      default:
        baseStyle.push(styles.mediumButton);
    }

    switch (variant) {
      case 'secondary':
        baseStyle.push(styles.secondaryButton);
        break;
      case 'outline':
        baseStyle.push(styles.outlineButton);
        break;
      default:
        baseStyle.push(styles.primaryButton);
    }

    if (disabled) {
      baseStyle.push(styles.disabledButton);
    }

    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.buttonText];
    
    switch (size) {
      case 'small':
        baseStyle.push(styles.smallText);
        break;
      case 'large':
        baseStyle.push(styles.largeText);
        break;
      default:
        baseStyle.push(styles.mediumText);
    }

    switch (variant) {
      case 'outline':
        baseStyle.push(styles.outlineText);
        break;
      default:
        baseStyle.push(styles.primaryText);
    }

    return baseStyle;
  };

  const ButtonContent = () => (
    <>
      {loading ? (
        <ActivityIndicator size="small" color={variant === 'outline' ? Colors.primary : Colors.onPrimary} />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </>
  );

  if (gradient) {
    return (
      <TouchableOpacity 
        onPress={onPress} 
        disabled={disabled || loading}
        style={[getButtonStyle(), style]}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={gradient}
          style={styles.gradientButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <ButtonContent />
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity 
      onPress={onPress} 
      disabled={disabled || loading}
      style={[getButtonStyle(), style]}
      activeOpacity={0.8}
    >
      <ButtonContent />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  
  // Size variants
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  
  mediumButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  
  largeButton: {
    paddingVertical: 20,
    paddingHorizontal: 40,
  },

  // Style variants
  primaryButton: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
  },
  
  secondaryButton: {
    backgroundColor: Colors.secondary,
    shadowColor: Colors.secondary,
  },
  
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primary,
    shadowOpacity: 0,
    elevation: 0,
  },
  
  disabledButton: {
    backgroundColor: Colors.outline,
    shadowOpacity: 0,
    elevation: 0,
  },

  gradientButton: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },

  // Text styles
  buttonText: {
    fontWeight: '600',
  },
  
  smallText: {
    fontSize: 14,
  },
  
  mediumText: {
    fontSize: 16,
  },
  
  largeText: {
    fontSize: 18,
  },
  
  primaryText: {
    color: Colors.onPrimary,
  },
  
  outlineText: {
    color: Colors.primary,
  },
});
