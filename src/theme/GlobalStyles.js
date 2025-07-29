import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from './Colors';

const { width, height } = Dimensions.get('window');

export const GlobalStyles = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },

  // Card Styles
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: Colors.shadow.medium,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 8,
  },

  cardElevated: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 20,
    marginVertical: 12,
    marginHorizontal: 16,
    shadowColor: Colors.shadow.dark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 12,
  },

  // Modern Buttons
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
  },

  floatingActionButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },

  // Typography
  heading1: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.onBackground,
    marginBottom: 8,
  },

  heading2: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.onBackground,
    marginBottom: 6,
  },

  heading3: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.onSurface,
    marginBottom: 4,
  },

  bodyLarge: {
    fontSize: 16,
    color: Colors.onSurface,
    lineHeight: 24,
  },

  bodyMedium: {
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    lineHeight: 20,
  },

  caption: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    lineHeight: 16,
  },

  // Input Styles
  textInput: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.outline,
    color: Colors.onSurface,
  },

  textInputFocused: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },

  // Image Styles
  heroImage: {
    width: width - 32,
    height: 200,
    borderRadius: 16,
    marginVertical: 16,
  },

  cardImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },

  // Layout Helpers
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Spacing
  mb8: { marginBottom: 8 },
  mb16: { marginBottom: 16 },
  mb24: { marginBottom: 24 },
  mt8: { marginTop: 8 },
  mt16: { marginTop: 16 },
  mt24: { marginTop: 24 },
  mx16: { marginHorizontal: 16 },
  my16: { marginVertical: 16 },

  // Status Indicators
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },

  successBadge: {
    backgroundColor: Colors.success,
  },

  warningBadge: {
    backgroundColor: Colors.warning,
  },

  errorBadge: {
    backgroundColor: Colors.error,
  },

  // Loading States
  skeleton: {
    backgroundColor: Colors.surfaceVariant,
    borderRadius: 8,
  },

  shimmer: {
    backgroundColor: Colors.outline,
    opacity: 0.5,
  },
});
