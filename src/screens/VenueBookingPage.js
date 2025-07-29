import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Platform, TouchableOpacity, ActivityIndicator, ScrollView, ImageBackground } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BlurView } from 'expo-blur';

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
            style={{ flex: 1 }}
            resizeMode="cover"
        >
            <ScrollView style={{ flex: 1, backgroundColor: 'transparent' }} contentContainerStyle={styles.scrollContent}>
                
                <View style={styles.header}>
                    <Text style={styles.heading}>Venue Booking</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Text style={styles.backButtonText}>← Back</Text>
                    </TouchableOpacity>
                </View>
                
                {venue && (
                    <View style={styles.venueDetails}>
                        <Text style={styles.venueName}>{venue.name}</Text>
                        <Text style={styles.venueLocation}>{venue.location}</Text>
                        <Text style={styles.venueCost}>Cost: {venue.cost}</Text>
                    </View>
                )}
                <Text style={styles.label}>Select Date</Text>
                <TouchableOpacity style={styles.dateBtn} onPress={() => setShowPicker(true)}>
                    <Text style={styles.dateBtnText}>{date.toDateString()}</Text>
                </TouchableOpacity>
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
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={[styles.input, errors.name && styles.inputError]}
                    placeholder="Your Name"
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor="#90caf9"
                />
                {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    style={[styles.input, errors.phone && styles.inputError]}
                    placeholder="Your Phone Number"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    placeholderTextColor="#90caf9"
                />
                {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
                <TouchableOpacity 
                    style={[styles.bookBtn, isSubmitting && styles.bookBtnDisabled]}
                    onPress={handleBooking}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.bookBtnText}>Book and Pay</Text>
                    )}
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
		borderWidth: 2,
    borderColor: 'rgba(220,220,220,0.7)', // shiny glossy border
    },
    backButton: {
        position: 'absolute',
        left: 16,
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 4,
        elevation: 2,
        marginTop: 20,
    },
    backButtonText: {
        color: '#ff6b6b',
        fontSize: 12,
        fontWeight: 'bold',
        alignContent: 'center',
        textAlign: 'center',
        padding: 2,
        marginBottom:4,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        flex: 1,
        marginTop:10,
    },
    venueDetails: {
        marginBottom: 18,
        backgroundColor: '#ffe0d3', // soft orange/peach for card
        borderRadius: 10,
        padding: 16,
        marginHorizontal: 18,
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: 'rgba(220,220,220,0.7)', // shiny glossy border
    },
    venueName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 2,
    },
    venueLocation: {
        fontSize: 15,
        color: '#000',
        marginTop: 2,
    },
    venueCost: {
        fontSize: 15,
        color: '#2e7d32',
        marginTop: 2,
    },
    label: {
        fontSize: 18,
        marginTop: 12,
        marginBottom: 8,
        color: '#fff',
        marginLeft: 28,
    },
    dateBtn: {
        backgroundColor: '#ffbfae',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
        marginBottom: 8,
        marginHorizontal: 24,
        borderWidth: 1.5,
        borderColor: 'rgba(220,220,220,0.7)', // shiny glossy border
    },
    dateBtnText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1.5,
        borderColor: 'rgba(220,220,220,0.7)', // shiny glossy border
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginHorizontal: 24,
        marginBottom: 8,
        backgroundColor: '#fff',
        color: '#ff6b6b',
    },
    inputError: {
        borderColor: '#ff0000',
    },
    errorText: {
        color: '#ff0000',
        fontSize: 12,
        marginLeft: 24,
        marginBottom: 8,
    },
    bookBtn: {
        backgroundColor: '#ff6b6b',
        borderRadius: 8,
        marginTop: 24,
        marginHorizontal: 24,
        paddingVertical: 14,
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: 'rgba(220,220,220,0.7)', // shiny glossy border
    },
    bookBtnDisabled: {
        opacity: 0.7,
    },
    bookBtnText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingBottom: 24,
    },
});