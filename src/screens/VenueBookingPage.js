import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Platform, ScrollView, ImageBackground } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../theme/Colors';
import { GlobalStyles } from '../theme/GlobalStyles';
import { ModernButton } from '../components/ModernButton';
import { ModernInput } from '../components/ModernInput';
import { ModernHeader } from '../components/ModernHeader';

const today = new Date();
const oneYearFromToday = new Date();
oneYearFromToday.setFullYear(today.getFullYear() + 1);

export default function VenueBookingPage({ route, navigation }) {
    // Get venue details from navigation params
    const venue = route?.params?.venue;

    const [date, setDate] = useState(today);
    const [showPicker, setShowPicker] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onChange = (event, selectedDate) => {
        setShowPicker(Platform.OS === 'ios');
        if (selectedDate) setDate(selectedDate);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = 'Name is required';
        if (!phone.trim()) newErrors.phone = 'Phone number is required';
        if (phone.trim() && !/^\d{10}$/.test(phone.trim())) {
            newErrors.phone = 'Please enter a valid 10-digit number';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleBooking = async () => {
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
            Alert.alert(
                'Booking Successful!',
                'We will contact you shortly to confirm your booking.',
                [{ text: 'OK', onPress: () => navigation.navigate('Home') }]
            );
        } catch (error) {
            Alert.alert('Error', 'Failed to submit booking. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
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
                    title="Book Your Venue"
                    subtitle="Complete the form below to reserve your perfect event space"
                    gradient={Colors.gradients.primary}
                    showBackButton={true}
                    navigation={navigation}
                />
                
                <ScrollView 
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {venue && (
                        <View style={[GlobalStyles.cardElevated, styles.venueCard]}>
                            <Text style={[GlobalStyles.heading2, styles.venueName]}>{venue.name}</Text>
                            <Text style={styles.venueLocation}>📍 {venue.location}</Text>
                            <Text style={styles.venueCost}>💰 {venue.cost}</Text>
                        </View>
                    )}

                    <View style={[GlobalStyles.card, styles.formCard]}>
                        <Text style={[GlobalStyles.heading3, styles.formTitle]}>Booking Details</Text>
                        
                        <View style={styles.dateSection}>
                            <Text style={styles.sectionLabel}>Select Event Date</Text>
                            <ModernButton
                                title={date.toDateString()}
                                onPress={() => setShowPicker(true)}
                                variant="outline"
                                style={styles.dateButton}
                            />
                            {showPicker && (
                                <DateTimePicker
                                    value={date}
                                    mode="date"
                                    display="default"
                                    minimumDate={today}
                                    maximumDate={oneYearFromToday}
                                    onChange={onChange}
                                />
                            )}
                        </View>

                        <ModernInput
                            label="Full Name"
                            value={name}
                            onChangeText={setName}
                            placeholder="Enter your full name"
                            error={errors.name}
                        />

                        <ModernInput
                            label="Phone Number"
                            value={phone}
                            onChangeText={setPhone}
                            placeholder="Enter 10-digit phone number"
                            keyboardType="phone-pad"
                            maxLength={10}
                            error={errors.phone}
                        />

                        <View style={styles.submitSection}>
                            <ModernButton
                                title="Book Venue"
                                onPress={handleBooking}
                                loading={isSubmitting}
                                gradient={Colors.gradients.primary}
                                size="large"
                                style={styles.submitButton}
                            />
                            
                            <ModernButton
                                title="Cancel"
                                onPress={() => navigation.goBack()}
                                variant="outline"
                                style={styles.cancelButton}
                            />
                        </View>
                    </View>

                    <View style={[GlobalStyles.card, styles.infoCard]}>
                        <Text style={[GlobalStyles.heading3, styles.infoTitle]}>Booking Information</Text>
                        <Text style={styles.infoText}>
                            • We'll contact you within 24 hours to confirm your booking
                        </Text>
                        <Text style={styles.infoText}>
                            • A booking fee may be required to secure your date
                        </Text>
                        <Text style={styles.infoText}>
                            • Free cancellation up to 48 hours before the event
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
        paddingTop: 16,
    },
    
    venueCard: {
        marginHorizontal: 16,
        marginBottom: 16,
        alignItems: 'center',
    },
    
    venueName: {
        textAlign: 'center',
        color: Colors.onSurface,
        marginBottom: 8,
    },
    
    venueLocation: {
        fontSize: 16,
        color: Colors.onSurfaceVariant,
        marginBottom: 4,
    },
    
    venueCost: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.celebration,
    },
    
    formCard: {
        marginHorizontal: 16,
        marginBottom: 16,
    },
    
    formTitle: {
        textAlign: 'center',
        marginBottom: 20,
        color: Colors.onSurface,
    },
    
    dateSection: {
        marginVertical: 16,
    },
    
    sectionLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.onSurface,
        marginBottom: 12,
    },
    
    dateButton: {
        marginBottom: 8,
    },
    
    submitSection: {
        marginTop: 24,
        gap: 12,
    },
    
    submitButton: {
        marginBottom: 8,
    },
    
    cancelButton: {
        marginTop: 8,
    },
    
    infoCard: {
        marginHorizontal: 16,
        marginBottom: 16,
    },
    
    infoTitle: {
        textAlign: 'center',
        marginBottom: 16,
        color: Colors.onSurface,
    },
    
    infoText: {
        fontSize: 14,
        color: Colors.onSurfaceVariant,
        lineHeight: 20,
        marginBottom: 8,
    },
});
