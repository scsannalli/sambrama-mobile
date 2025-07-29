import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, PanResponder, ActivityIndicator, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../theme/Colors';
import { GlobalStyles } from '../theme/GlobalStyles';
import { ModernButton } from '../components/ModernButton';
import { ModernHeader } from '../components/ModernHeader';

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

    const handleImageTap = () => {
        setCurrentIndex((prev) => (prev + 1) % venue.images.length);
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
                <ModernHeader
                    title={venue.name}
                    subtitle={`📍 ${venue.location || venue.city}`}
                    gradient={Colors.gradients.primary}
                    showBackButton={true}
                    navigation={navigation}
                />

                <ScrollView 
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Image Gallery */}
                    <View style={[GlobalStyles.cardElevated, styles.galleryCard]}>
                        <View style={styles.galleryContainer} {...panResponder.panHandlers}>
                            {imageLoading && (
                                <ActivityIndicator
                                    size="large"
                                    color={Colors.primary}
                                    style={styles.loadingIndicator}
                                />
                            )}
                            <TouchableOpacity activeOpacity={0.9} onPress={handleImageTap}>
                                <Image
                                    source={venue.images[currentIndex]}
                                    style={[styles.galleryImage, imageLoading && styles.hiddenImage]}
                                    onLoadStart={() => setImageLoading(true)}
                                    onLoadEnd={() => setImageLoading(false)}
                                    resizeMode="cover"
                                />
                                <LinearGradient
                                    colors={['transparent', 'rgba(0,0,0,0.3)']}
                                    style={styles.imageOverlay}
                                />
                            </TouchableOpacity>
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

                    {/* Venue Information */}
                    <View style={[GlobalStyles.card, styles.infoCard]}>
                        <View style={styles.priceSection}>
                            <Text style={[GlobalStyles.heading2, styles.venueName]}>{venue.name}</Text>
                            <View style={styles.priceTag}>
                                <Text style={styles.priceText}>₹{venue.cost}</Text>
                            </View>
                        </View>

                        <Text style={styles.description}>{venue.description}</Text>

                        <View style={styles.ratingSection}>
                            <Text style={styles.rating}>⭐ 4.8 (124 reviews)</Text>
                            <Text style={styles.capacity}>👥 Up to 500 guests</Text>
                        </View>
                    </View>

                    {/* Amenities */}
                    <View style={[GlobalStyles.card, styles.amenitiesCard]}>
                        <Text style={[GlobalStyles.heading3, styles.sectionTitle]}>Amenities</Text>
                        <View style={styles.amenitiesGrid}>
                            {(venue.amenities || [
                                "Spacious Hall",
                                "Parking",
                                "AC",
                                "Stage",
                                "Dining Area",
                                "Audio/Visual Equipment",
                                "Catering Kitchen",
                                "Security"
                            ]).map((amenity, index) => (
                                <View key={index} style={styles.amenityItem}>
                                    <Text style={styles.amenityIcon}>✅</Text>
                                    <Text style={styles.amenityText}>{amenity}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Location & Contact */}
                    <View style={[GlobalStyles.card, styles.contactCard]}>
                        <Text style={[GlobalStyles.heading3, styles.sectionTitle]}>Location & Contact</Text>
                        <View style={styles.contactItem}>
                            <Text style={styles.contactIcon}>📍</Text>
                            <Text style={styles.contactText}>{venue.location || venue.city}</Text>
                        </View>
                        <View style={styles.contactItem}>
                            <Text style={styles.contactIcon}>📞</Text>
                            <Text style={styles.contactText}>+91 9876543210</Text>
                        </View>
                        <View style={styles.contactItem}>
                            <Text style={styles.contactIcon}>✉️</Text>
                            <Text style={styles.contactText}>info@sambrama.com</Text>
                        </View>
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.actionSection}>
                        <ModernButton
                            title="Book This Venue"
                            onPress={handleBookNow}
                            gradient={Colors.gradients.celebration}
                            size="large"
                            style={styles.bookButton}
                        />
                        
                        <ModernButton
                            title="Back to Venues"
                            onPress={() => navigation.goBack()}
                            variant="outline"
                            style={styles.backButton}
                        />
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
        paddingTop: 16,
    },

    galleryCard: {
        marginHorizontal: 16,
        marginBottom: 16,
        paddingBottom: 16,
    },

    galleryContainer: {
        position: 'relative',
        borderRadius: 16,
        overflow: 'hidden',
    },

    galleryImage: {
        width: windowWidth - 64,
        height: 250,
        backgroundColor: Colors.surfaceVariant,
    },

    hiddenImage: {
        opacity: 0,
    },

    imageOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '30%',
    },

    loadingIndicator: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -20,
        marginTop: -20,
        zIndex: 1,
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
        marginHorizontal: 16,
        marginBottom: 16,
    },

    priceSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },

    venueName: {
        flex: 1,
        color: Colors.onSurface,
        marginRight: 16,
    },

    priceTag: {
        backgroundColor: Colors.celebration,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },

    priceText: {
        color: Colors.onPrimary,
        fontWeight: 'bold',
        fontSize: 16,
    },

    description: {
        fontSize: 16,
        color: Colors.onSurfaceVariant,
        lineHeight: 24,
        marginBottom: 16,
    },

    ratingSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: Colors.outline,
    },

    rating: {
        fontSize: 14,
        color: Colors.onSurface,
        fontWeight: '600',
    },

    capacity: {
        fontSize: 14,
        color: Colors.onSurfaceVariant,
    },

    amenitiesCard: {
        marginHorizontal: 16,
        marginBottom: 16,
    },

    sectionTitle: {
        textAlign: 'center',
        marginBottom: 16,
        color: Colors.onSurface,
    },

    amenitiesGrid: {
        gap: 12,
    },

    amenityItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    amenityIcon: {
        marginRight: 12,
        fontSize: 16,
    },

    amenityText: {
        fontSize: 14,
        color: Colors.onSurface,
    },

    contactCard: {
        marginHorizontal: 16,
        marginBottom: 16,
    },

    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },

    contactIcon: {
        marginRight: 12,
        fontSize: 16,
        width: 24,
    },

    contactText: {
        fontSize: 14,
        color: Colors.onSurface,
    },

    actionSection: {
        marginHorizontal: 16,
        gap: 12,
        marginTop: 8,
    },

    bookButton: {
        marginBottom: 8,
    },

    backButton: {
        marginTop: 8,
    },
});
