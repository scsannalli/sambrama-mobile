import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, Platform, ActivityIndicator, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { BlurView } from 'expo-blur';

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
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <ScrollView style={{ flex: 1, backgroundColor: 'transparent' }} contentContainerStyle={styles.scrollContent}>
        <View style={[styles.header, { backgroundColor: 'rgba(255,107,107,0.8)' }]}>
          <Text style={styles.headerTitle}>🎉 Find the Perfect Venue for Your Special Events</Text>
          <Text style={styles.headerSubtitle}>
            Celebrate birthdays, anniversaries, baby showers, reunions, and more with <Text style={styles.brand}>Sambrama</Text>
          </Text>
        </View>

        <View style={styles.ctaContainer}>
          <Text style={styles.findVenueLabel}>Find your venue</Text>
          <View style={styles.pickerContainer}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#ff6b6b" style={styles.loader} />
            ) : (
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
            )}
          </View>
        </View>

        <View style={styles.gallerySection}>
          <Text style={styles.galleryTitle}>Popular Venues</Text>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={styles.galleryContainer}
            contentContainerStyle={{}}
            onScroll={onScroll}
            scrollEventThrottle={16}
          >
            {images.map((img, idx) => (
              <View key={idx} style={{ width: windowWidth, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity activeOpacity={0.9} onPress={handleImageTap}>
                  <Image
                    source={img.src}
                    style={styles.galleryImage}
                    resizeMode="cover"
                  />
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    paddingBottom: 32,
    paddingTop: 0,
  },
 header: {
		backgroundColor: "#ff6b6b",
		paddingVertical: 16,
		paddingHorizontal: 14,
		alignItems: "center",
		borderBottomLeftRadius: 24,
		borderBottomRightRadius: 24,
        borderTopRadius: 24,
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
		marginBottom: 10,
        marginTop: 40,
		borderWidth: 2,
    borderColor: 'rgba(220,220,220,0.7)', // shiny glossy border
	},
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    padding: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(200,200,200,0.5)',
    backgroundColor: '#fff',
    color: '#ff6b6b',
    overflow: 'hidden',
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
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: 'rgba(220,220,220,0.7)', // shiny glossy border
    backgroundColor: '#fff',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 2,
    width: '100%',
    maxWidth: 350,
    overflow: 'hidden',
  },
  picker: {
    height: 55,
    width: '100%',
    color: '#333',
    backgroundColor: 'transparent',
  },
  gallerySection: {
    marginTop: 8,
    alignItems: 'center',
    paddingHorizontal: 0,
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(220,220,220,0.7)', // shiny glossy border
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
  },
  galleryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
    marginTop: 8,
  },
  galleryContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 0,
  },
  galleryImage: {
    width: Math.min(windowWidth * 0.8, 320),
    height: 180,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: '#eee',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
    marginBottom: 4,
  },
  activeDot: {
    backgroundColor: '#ff6b6b',
  },
  infoSection: {
    marginTop: 8,
    paddingHorizontal: 24,
    marginBottom: 32,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(220,220,220,0.7)', // shiny glossy border
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
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
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(220,220,220,0.7)', // shiny glossy border
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
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
  loader: {
    marginVertical: 20,
  }
});