import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../theme/Colors';

export const VenueCard = ({ 
  venue, 
  onPress, 
  style,
  imageHeight = 180,
  showGradientOverlay = true 
}) => {
  return (
    <TouchableOpacity 
      style={[styles.card, style]} 
      onPress={onPress}
      activeOpacity={0.95}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={venue.image} 
          style={[styles.image, { height: imageHeight }]} 
          resizeMode="cover"
        />
        {showGradientOverlay && (
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.imageOverlay}
          />
        )}
        <View style={styles.badgeContainer}>
          <View style={styles.costBadge}>
            <Text style={styles.costText}>₹{venue.cost}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.venueName} numberOfLines={2}>{venue.name}</Text>
        <Text style={styles.venueCity}>📍 {venue.city}</Text>
        <Text style={styles.venueDescription} numberOfLines={3}>
          {venue.description}
        </Text>
        
        <View style={styles.footer}>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ 4.8</Text>
            <Text style={styles.reviews}>(124 reviews)</Text>
          </View>
          <View style={styles.featuresContainer}>
            <Text style={styles.features}>🎉 Events • 👥 500 guests</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    marginVertical: 12,
    marginHorizontal: 16,
    shadowColor: Colors.shadow.dark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 12,
    overflow: 'hidden',
  },
  
  imageContainer: {
    position: 'relative',
  },
  
  image: {
    width: '100%',
    backgroundColor: Colors.surfaceVariant,
  },
  
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  
  badgeContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  
  costBadge: {
    backgroundColor: Colors.celebration,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    shadowColor: Colors.celebration,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  
  costText: {
    color: Colors.onPrimary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  
  content: {
    padding: 16,
  },
  
  venueName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.onSurface,
    marginBottom: 6,
  },
  
  venueCity: {
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    marginBottom: 8,
  },
  
  venueDescription: {
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    lineHeight: 20,
    marginBottom: 12,
  },
  
  footer: {
    borderTopWidth: 1,
    borderTopColor: Colors.outline,
    paddingTop: 12,
  },
  
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.onSurface,
    marginRight: 8,
  },
  
  reviews: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
  },
  
  featuresContainer: {
    marginTop: 4,
  },
  
  features: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
  },
});
