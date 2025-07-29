import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, Platform, ActivityIndicator, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import { Colors } from '../theme/Colors';
import { GlobalStyles } from '../theme/GlobalStyles';
import { ModernButton } from '../components/ModernButton';
import { ModernHeader } from '../components/ModernHeader';

const images = [
  {
    src: require('../../assets/venues/venue1_img1.jpg'),
    alt: "Venue 1"
  },
  {
    src: require('../../assets/venues/venue2_img1.jpg'),
    alt: "Venue 2"
  },
  {
    src: require('../../assets/venues/venue3_img2.jpg'),
    alt: "Venue 3"
  },
  {
    src: require('../../assets/venues/venue4_img1.jpg'),
    alt: "Venue 4"
  }
];

const cities = ["Bidar", "Kalaburgi", "Bijapur", "Raichur"];
const windowWidth = Dimensions.get('window').width;

export default function HomePage({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCity, setSelectedCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handleDotClick = (idx) => {
    setCurrentIndex(idx);
  };

  const handleCityChange = async (itemValue) => {
    if (itemValue) {
      setIsLoading(true);
      try {
        setSelectedCity(itemValue);
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate loading
        navigation.navigate('Venues', { city: itemValue });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / (windowWidth * 0.8 < 320 ? windowWidth * 0.8 : 320));
    setCurrentIndex(index);
  };

  const handleImageTap = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <ImageBackground
      source={require('../../assets/glossy_bg.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
      imageStyle={{ opacity: 0.8 }}
    >
      <LinearGradient
        colors={Colors.gradients.darkNavy}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <ModernHeader
            title="🎉 Find Perfect Venues"
            subtitle="Celebrate birthdays, anniversaries, baby showers, reunions, and more with Sambrama"
            gradient={Colors.gradients.celebration}
          />

          <View style={[GlobalStyles.card, styles.ctaCard]}>
            <Text style={styles.findVenueLabel}>Find your venue</Text>
            <View style={styles.pickerContainer}>
              {isLoading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color={Colors.primary} />
                  <Text style={styles.loadingText}>Searching venues...</Text>
                </View>
              ) : (
                <Picker
                  selectedValue={selectedCity}
                  style={styles.picker}
                  onValueChange={handleCityChange}
                  dropdownIconColor={Colors.primary}
                  mode={Platform.OS === 'ios' ? 'dialog' : 'dropdown'}
                >
                  <Picker.Item label="-- Select City --" value="" />
                  {cities.map((city) => (
                    <Picker.Item key={city} label={city} value={city} />
                  ))}
                </Picker>
              )}
            </View>
          </View>

          <View style={[GlobalStyles.cardElevated, styles.galleryCard]}>
            <Text style={[GlobalStyles.heading2, styles.galleryTitle]}>Popular Venues</Text>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              style={styles.galleryContainer}
              onScroll={onScroll}
              scrollEventThrottle={16}
            >
              {images.map((img, idx) => (
                <View key={idx} style={styles.imageContainer}>
                  <TouchableOpacity activeOpacity={0.9} onPress={handleImageTap}>
                    <View style={styles.imageWrapper}>
                      <Image
                        source={img.src}
                        style={styles.galleryImage}
                        resizeMode="cover"
                      />
                      <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.6)']}
                        style={styles.imageOverlay}
                      />
                      <View style={styles.imageTextOverlay}>
                        <Text style={styles.imageTitle}>{img.alt}</Text>
                        <Text style={styles.imageSubtitle}>Perfect for celebrations</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
            <View style={styles.dotsContainer}>
              {images.map((_, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[styles.dot, idx === currentIndex && styles.activeDot]}
                  onPress={() => handleDotClick(idx)}
                  activeOpacity={0.7}
                />
              ))}
            </View>
          </View>

          <View style={[GlobalStyles.card, styles.infoCard]}>
            <Text style={[GlobalStyles.heading2, styles.infoTitle]}>Why Choose Sambrama?</Text>
            <View style={styles.featuresList}>
              {[
                { icon: '✨', title: 'Curated Venues', desc: 'Hand-picked venues for every occasion' },
                { icon: '📍', title: 'Easy Selection', desc: 'Find venues by city instantly' },
                { icon: '📸', title: 'Beautiful Photos', desc: 'Browse stunning venue galleries' },
                { icon: '💬', title: 'Expert Support', desc: 'Friendly help for your events' },
              ].map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Text style={styles.featureIcon}>{feature.icon}</Text>
                  <View style={styles.featureContent}>
                    <Text style={styles.featureTitle}>{feature.title}</Text>
                    <Text style={styles.featureDesc}>{feature.desc}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.ctaButtonContainer}>
            <ModernButton
              title="Explore All Venues"
              onPress={() => navigation.navigate('Venues')}
              gradient={Colors.gradients.primary}
              size="large"
              style={styles.exploreButton}
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              © 2025 <Text style={styles.brandFooter}>Sambrama.com</Text> — Your Celebration, Our Venue
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  
  backgroundGradient: {
    flex: 1,
  },
  
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    paddingBottom: 32,
  },

  ctaCard: {
    marginTop: 20,
    alignItems: 'center',
  },

  findVenueLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.onSurface,
    marginBottom: 16,
    textAlign: 'center',
  },

  pickerContainer: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.outline,
    backgroundColor: Colors.surface,
    shadowColor: Colors.shadow.medium,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
    width: '100%',
    overflow: 'hidden',
  },

  picker: {
    height: 55,
    width: '100%',
    color: Colors.onSurface,
  },

  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },

  loadingText: {
    marginTop: 8,
    color: Colors.onSurfaceVariant,
    fontSize: 14,
  },

  galleryCard: {
    marginTop: 16,
    paddingBottom: 20,
  },

  galleryTitle: {
    textAlign: 'center',
    marginBottom: 16,
    color: Colors.onSurface,
  },

  galleryContainer: {
    backgroundColor: 'transparent',
  },

  imageContainer: {
    width: windowWidth - 64,
    marginHorizontal: 16,
    alignItems: 'center',
  },

  imageWrapper: {
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.shadow.dark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 12,
  },

  galleryImage: {
    width: windowWidth - 64,
    height: 200,
    backgroundColor: Colors.surfaceVariant,
  },

  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },

  imageTextOverlay: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },

  imageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.onPrimary,
    marginBottom: 4,
  },

  imageSubtitle: {
    fontSize: 14,
    color: Colors.onPrimary,
    opacity: 0.9,
  },

  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.outline,
    marginHorizontal: 4,
  },

  activeDot: {
    backgroundColor: Colors.primary,
    width: 24,
  },

  infoCard: {
    marginTop: 16,
  },

  infoTitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: Colors.onSurface,
  },

  featuresList: {
    gap: 16,
  },

  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  featureIcon: {
    fontSize: 24,
    marginRight: 16,
    marginTop: 2,
  },

  featureContent: {
    flex: 1,
  },

  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.onSurface,
    marginBottom: 4,
  },

  featureDesc: {
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    lineHeight: 20,
  },

  ctaButtonContainer: {
    marginTop: 24,
    marginHorizontal: 16,
  },

  exploreButton: {
    marginVertical: 8,
  },

  footer: {
    marginTop: 32,
    marginHorizontal: 16,
    padding: 20,
    backgroundColor: Colors.surfaceVariant,
    borderRadius: 12,
    alignItems: 'center',
  },

  footerText: {
    color: Colors.onSurfaceVariant,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },

  brandFooter: {
    fontWeight: 'bold',
    color: Colors.primary,
  },
});