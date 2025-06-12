import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const images = [
  {
    src: "https://images.pexels.com/photos/14646752/pexels-photo-14646752.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=600&h=400",
    alt: "Venue 1"
  },
  {
    src: "https://images.pexels.com/photos/17023032/pexels-photo-17023032.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=600&h=400",
    alt: "Venue 2"
  },
  {
    src: "https://images.pexels.com/photos/17206173/pexels-photo-17206173.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=600&h=400",
    alt: "Venue 3"
  },
  {
    src: "https://images.pexels.com/photos/10949592/pexels-photo-10949592.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=600&h=400",
    alt: "Venue 4"
  }
];

const cities = ["Bidar", "Kalaburgi", "Bijapur", "Raichur"];
const windowWidth = Dimensions.get('window').width;

export default function HomePage({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCity, setSelectedCity] = useState("");

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handleDotClick = (idx) => {
    setCurrentIndex(idx);
  };

  const handleCityChange = (itemValue) => {
    setSelectedCity(itemValue);
    if (itemValue && navigation) {
      navigation.navigate('Venues', { city: itemValue });
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🎉 Find the Perfect Venue for Your Special Events</Text>
        <Text style={styles.headerSubtitle}>
          Celebrate birthdays, anniversaries, baby showers, reunions, and more with <Text style={styles.brand}>Sambrama</Text>
        </Text>
      </View>

      <View style={styles.ctaContainer}>
        <Text style={styles.findVenueLabel}>Find your venue</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCity}
            style={styles.picker}
            onValueChange={handleCityChange}
            dropdownIconColor="#ff6b6b"
            mode={Platform.OS === 'ios' ? 'dialog' : 'dropdown'}
          >
            <Picker.Item label="-- Select City --" value="" />
            {cities.map((city) => (
              <Picker.Item key={city} label={city} value={city} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.gallerySection}>
        <Text style={styles.galleryTitle}>Popular Venues</Text>
        <View style={styles.galleryContainer}>
          <TouchableOpacity style={styles.arrow} onPress={handlePrev} activeOpacity={0.7}>
            <Text style={styles.arrowText}>←</Text>
          </TouchableOpacity>
          <Image
            source={{ uri: images[currentIndex].src }}
            style={styles.galleryImage}
            resizeMode="cover"
          />
          <TouchableOpacity style={styles.arrow} onPress={handleNext} activeOpacity={0.7}>
            <Text style={styles.arrowText}>→</Text>
          </TouchableOpacity>
        </View>
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

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Why Sambrama?</Text>
        <Text style={styles.infoItem}>✨ Curated venues for every occasion</Text>
        <Text style={styles.infoItem}>📍 Easy city selection and instant viewing</Text>
        <Text style={styles.infoItem}>📸 Browse beautiful venue photos</Text>
        <Text style={styles.infoItem}>💬 Friendly support for your event needs</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2025 <Text style={styles.brandFooter}>Sambrama.com</Text> — Your Celebration, Our Venue
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff3eb' },
  scrollContent: {
    paddingBottom: 32,
    paddingTop: 0,
  },
  header: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 52,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 14,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
  },
  brand: {
    fontWeight: 'bold',
    color: '#fff'
  },
  ctaContainer: {
    marginTop: 8,
    marginBottom: 24,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  findVenueLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff6b6b',
    marginBottom: 8,
    textAlign: 'center',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    maxWidth: 350,
    marginBottom: 2,
    overflow: 'hidden',
  },
  picker: {
    height: 55,
    width: '100%',
  },
  gallerySection: {
    marginTop: 8,
    alignItems: 'center',
    paddingHorizontal: 0,
    marginBottom: 24,
  },
  galleryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  galleryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff3eb',
    paddingVertical: 12,
    paddingHorizontal: 0,
  },
  galleryImage: {
    width: Math.min(windowWidth * 0.8, 320),
    height: 180,
    borderRadius: 10,
    marginHorizontal: 8,
    backgroundColor: '#eee',
  },
  arrow: {
    backgroundColor: '#ff6b6b',
    borderRadius: 22,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
    elevation: 8,
  },
  arrowText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
     alignItems: 'center',
    justifyContent: 'center'
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 0,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#ff6b6b',
  },
  infoSection: {
    marginTop: 8,
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  infoItem: {
    fontSize: 15,
    marginBottom: 4,
    color: '#444',
    textAlign: 'center',
  },
  footer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    borderRadius: 12,
    marginHorizontal: 16,
  },
  footerText: {
    color: '#777',
    fontSize: 14,
    textAlign: 'center',
  },
  brandFooter: {
    fontWeight: 'bold',
    color: '#ff6b6b',
  },
});