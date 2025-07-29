import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, PanResponder, Button, ActivityIndicator, ImageBackground } from 'react-native';
import { BlurView } from 'expo-blur';

const windowWidth = Dimensions.get('window').width;

export default function VenueDetails({ route, navigation }) {
    // Expecting venue details to be passed via route.params
    const { venue } = route.params;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageLoading, setImageLoading] = useState(true);

    // Swipe gesture handlers for image gallery
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) => {
                return Math.abs(gestureState.dx) > 20;
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dx < -30) {
                    setCurrentIndex((prev) => (prev + 1) % venue.images.length);
                } else if (gestureState.dx > 30) {
                    setCurrentIndex((prev) => (prev - 1 + venue.images.length) % venue.images.length);
                }
            },
        })
    ).current;

    const handleDotClick = (idx) => setCurrentIndex(idx);

    const handleBookNow = () => {
        navigation.navigate('VenueBookingPage', { venue });
    };

    return (
        <ImageBackground
            source={require('../../assets/glossy_bg.png')}
            style={{ flex: 1 }}
            resizeMode="cover"
        >
            <ScrollView style={{ flex: 1, backgroundColor: 'transparent' }} contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>{venue.name}</Text>
                </View>

                <View style={styles.gallerySection}>
                    <View style={styles.galleryContainer} {...panResponder.panHandlers}>
                        {imageLoading && (
                            <ActivityIndicator
                                size="large"
                                color="#ff6b6b"
                                style={styles.imageLoader}
                            />
                        )}
                        <Image
                            source={venue.images[currentIndex]}
                            style={[
                                styles.galleryImage,
                                imageLoading && styles.hiddenImage
                            ]}
                            onLoadStart={() => setImageLoading(true)}
                            onLoadEnd={() => setImageLoading(false)}
                        />
                    </View>
                    <View style={styles.dotsContainer}>
                        {venue.images.map((_, idx) => (
                            <TouchableOpacity
                                key={idx}
                                style={[styles.dot, idx === currentIndex && styles.activeDot]}
                                onPress={() => handleDotClick(idx)}
                                activeOpacity={0.7}
                            />
                        ))}
                    </View>
                </View>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backLink}>← Back to Venues</Text>
                </TouchableOpacity>
                <Text style={styles.sectionTitle}>Venue Details</Text>
                <Text style={styles.description}>{venue.description}</Text>

                <Text style={styles.sectionTitle}>Location</Text>
                <Text style={styles.location}>{venue.location}</Text>

                <Text style={styles.sectionTitle}>Amenities</Text>
                <View style={styles.amenitiesList}>
                    {venue.amenities.map((amenity, idx) => (
                        <Text key={idx} style={styles.amenityItem}>• {amenity}</Text>
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Cost</Text>
                <Text style={styles.cost}>₹ {venue.cost}</Text>

                <TouchableOpacity style={styles.bookNowButton} onPress={handleBookNow}>
                    <Text style={styles.bookNowText}>Book Now</Text>
                </TouchableOpacity>
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
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
	},
	headerTitle: {
		color: "#fff",
		fontSize: 22,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 8,
	},
    scrollContent: { padding: 20 },
    title: { fontSize: 26, fontWeight: 'bold', marginBottom: 10, color: '#222', marginTop:40, borderWidth: 1.5, borderColor: 'rgba(220,220,220,0.7)', borderRadius: 10, padding: 8, backgroundColor: '#fff' },
    gallerySection: { alignItems: 'center', marginBottom: 20 },
    galleryContainer: {
        width: windowWidth - 40,
        height: 220,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#f5f5f5',
        marginBottom: 2,
        marginTop: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1.5,
        borderColor: 'rgba(220,220,220,0.7)', // shiny glossy border
    },
    galleryImage: { width: '100%', height: '100%' },
    dotsContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 6 },
    dot: {
        width: 10, height: 10, borderRadius: 5, backgroundColor: '#ccc', margin: 4,
    },
    activeDot: { backgroundColor: '#ff6b6b' },
    sectionTitle: { fontSize: 18, fontWeight: '600', marginTop: 18, marginBottom: 6, color: '#444', borderWidth: 1.5, borderColor: 'rgba(220,220,220,0.7)', borderRadius: 8, padding: 6, backgroundColor: '#fff' },
    description: { fontSize: 16, color: '#fff', marginBottom: 2 },
    location: { fontSize: 16, color: '#fff', marginBottom: 8 },
    amenitiesList: { marginBottom: 8 },
    amenityItem: { fontSize: 15, color: '#fff', marginLeft: 8, marginBottom: 2 },
    cost: { fontSize: 18, fontWeight: 'bold', color: '#2e7d32', marginBottom: 10, marginTop: -4 },
    bookNowButton: {
        backgroundColor: '#ff6b6b',
        paddingVertical: 4,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 40,
        paddingBottom: -4,
        borderWidth: 1.5,
        borderColor: 'rgba(220,220,220,0.7)', // shiny glossy border
    },
    backLink: {
        color: "#ff6b6b",
        fontSize: 16,
        marginLeft: 16,
        marginTop: 10,
        marginBottom: 2,
    },
    bookNowText: { color: '#fff', fontSize: 18, fontWeight: 'bold', paddingBottom: 10, },
    imageLoader: {
        position: 'absolute',
        alignSelf: 'center',
        top: '50%',
        zIndex: 1,
    },
    hiddenImage: {
        opacity: 0,
    },
});