import React from "react";
import { View, Text, StyleSheet, FlatList, ImageBackground } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../theme/Colors';
import { GlobalStyles } from '../theme/GlobalStyles';
import { VenueCard } from '../components/VenueCard';
import { ModernHeader } from '../components/ModernHeader';

const venues = [
	{
		name: "Royal Palace Banquet",
		city: "Bidar",
		images: [
			require('../../assets/venues/venue1_img1.jpg'),
			require('../../assets/venues/venue1_img2.jpg'),
			require('../../assets/venues/venue1_img3.jpg'),
		],
		image: require('../../assets/venues/venue1_img1.jpg'), // main image (optional)
		description: "A beautiful venue for weddings, birthdays, and more. Spacious halls and premium facilities.",
		cost: "9000 /-",
	},
	{
		name: "Royal Palace Banquet",
		city: "Kalaburgi",
		images: [
			require('../../assets/venues/venue2_img1.jpg'),
			require('../../assets/venues/venue2_img2.jpg'),
			require('../../assets/venues/venue1_img2.jpg'),
		],
		image: require('../../assets/venues/venue2_img1.jpg'),
		description: "A beautiful venue for weddings, birthdays, and more. Spacious halls and premium facilities.",
		cost: "8000 /-",    
	},
	{
		name: "Sunshine Gardens",
		city: "Kalaburgi",
		images: [
			require('../../assets/venues/venue3_img1.jpg'),
			require('../../assets/venues/venue2_img2.jpg'),
			require('../../assets/venues/venue1_img2.jpg'),
		],
		image: require('../../assets/venues/venue3_img1.jpg'),
		description: "Open-air garden venue perfect for outdoor celebrations and family gatherings.",
		cost: "8500 /-",  
	},
	{
		name: "Bijapur Grand Hall",
		city: "Bijapur",
		images: [
			require('../../assets/venues/venue4_img1.jpg'),
			require('../../assets/venues/venue2_img2.jpg'),
			require('../../assets/venues/venue1_img2.jpg'),
		],
		image: require('../../assets/venues/venue4_img1.jpg'),
		description: "Modern amenities and elegant interiors for all your special events.",
		cost: "10500 /-",
	},
	{
		name: "Raichur Heritage Venue",
		city: "Raichur",
		images: [
			require('../../assets/venues/venue1_img1.jpg'),
			require('../../assets/venues/venue2_img2.jpg'),
			require('../../assets/venues/venue1_img2.jpg'),
		],
		image: require('../../assets/venues/venue1_img1.jpg'),
		description: "A heritage property with classic charm and all modern comforts.",
		cost: "9000 /-",
	},
];

export default function VenuesPage({ navigation, route }) {
    // Optional: filter by city if passed as param
    const city = route?.params?.city;
    const filteredVenues = city ? venues.filter((v) => v.city === city) : venues;

    const renderVenue = ({ item, index }) => (
        <VenueCard
            venue={item}
            onPress={() => navigation.navigate("VenueDetails", {
                venue: {
                    ...item,
                    images: item.images || [item.image], // fallback for single image
                    amenities: item.amenities || [
                        "Spacious Hall",
                        "Parking",
                        "AC",
                        "Stage",
                        "Dining Area",
                    ],
                    location: item.location || item.city,
                    cost: item.cost || "Contact for price",
                },
            })}
            style={styles.venueCard}
        />
    );

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
                    title={city ? `Venues in ${city}` : "All Venues"}
                    subtitle="Browse and book the best venues for your celebration"
                    gradient={Colors.gradients.primary}
                    showBackButton={true}
                    navigation={navigation}
                />
                
                <View style={styles.content}>
                    {city && (
                        <View style={[GlobalStyles.card, styles.filterCard]}>
                            <Text style={styles.filterText}>
                                Showing {filteredVenues.length} venues in <Text style={styles.cityName}>{city}</Text>
                            </Text>
                        </View>
                    )}
                    
                    <FlatList
                        data={filteredVenues}
                        renderItem={renderVenue}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.venuesList}
                    />
                </View>
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
    
    content: {
        flex: 1,
        paddingTop: 16,
    },
    
    filterCard: {
        marginHorizontal: 16,
        marginBottom: 8,
        alignItems: 'center',
    },
    
    filterText: {
        fontSize: 16,
        color: Colors.onSurface,
        textAlign: 'center',
    },
    
    cityName: {
        fontWeight: 'bold',
        color: Colors.primary,
    },
    
    venuesList: {
        paddingBottom: 32,
    },
    
    venueCard: {
        marginBottom: 0, // VenueCard component handles its own margin
    },
});
