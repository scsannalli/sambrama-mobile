import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from "react-native";
import { BlurView } from 'expo-blur';

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
			require('../../assets/venues/venue4_img1.jpg'),
			require('../../assets/venues/venue2_img2.jpg'),
			require('../../assets/venues/venue1_img3.jpg'),
		],
		image: require('../../assets/venues/venue4_img1.jpg'),
		description: "A heritage property with classic charm and all modern comforts.",
		cost: "9000 /-",
	},
];

export default function VenuesPage({ navigation, route }) {
    // Optional: filter by city if passed as param
    const city = route?.params?.city;
    const filteredVenues = city ? venues.filter((v) => v.city === city) : venues;

    return (
        <ImageBackground
            source={require('../../assets/glossy_bg.png')}
            style={{ flex: 1 }}
            resizeMode="cover"
        >
            <ScrollView style={{ flex: 1, backgroundColor: 'transparent' }} contentContainerStyle={styles.scrollContent}>
                <View style={[styles.header, {backgroundColor: 'rgba(255,107,107,0.8)'}]}>
                    <Text style={styles.headerTitle}>Venues</Text>
                    <Text style={styles.headerSubtitle}>
                        Browse and book the best venues for your celebration
                    </Text>
                </View>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backLink}>← Back to Home</Text>
                </TouchableOpacity>
                <View style={styles.venueGrid}>
                  {filteredVenues.map((venue, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={styles.venueCard}
                      activeOpacity={0.85}
                      onPress={() =>
                        navigation.navigate("VenueDetails", {
                          venue: {
                            ...venue,
                            images: venue.images || [venue.image], // fallback for single image
                            amenities: venue.amenities || [
                              "Spacious Hall",
                              "Parking",
                              "AC",
                              "Stage",
                              "Dining Area",
                            ],
                            location: venue.location || venue.city,
                            cost: venue.cost || "Contact for price",
                          },
                        })
                      }
                    >
                      <Image source={venue.image} style={styles.venueImage} />
                      <View style={styles.venueInfo}>
                        <Text style={styles.venueName}>{venue.name}</Text>
                        <Text style={styles.venueCity}>City: {venue.city}</Text>
                        <Text style={styles.venueDesc}>{venue.description}</Text>
                        <Text style={styles.venuePrice}>
                          {venue.cost ? `₹ ${venue.cost}` : "Contact for price"}
                        </Text>
                        <TouchableOpacity
                          style={styles.bookBtn}
                          onPress={() =>
                            navigation.navigate("VenueDetails", {
                              venue: {
                                ...venue,
                                images: venue.images || [venue.image],
                                amenities: venue.amenities || [
                                  "Spacious Hall",
                                  "Parking",
                                  "AC",
                                  "Stage",
                                  "Dining Area",
                                ],
                                location: venue.location || venue.city,
                                cost: venue.cost || "Contact for price",
                              },
                            })
                          }
                        >
                          <Text style={styles.bookBtnText}>Book Now</Text>
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        © 2025{" "}
                        <Text style={styles.brand}>Sambrama.com</Text> — Your Celebration, Our Venue
                    </Text>
                </View>
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
	header: {
		backgroundColor: "#ff6b6b",
		paddingVertical: 52,
		paddingHorizontal: 16,
		alignItems: "center",
		borderBottomLeftRadius: 24,
		borderBottomRightRadius: 24,
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		marginBottom: 10,
		marginTop: 24,
    borderWidth: 2,
    borderColor: 'rgba(220,220,220,0.7)', // shiny glossy border
	},
	headerTitle: {
		color: "#fff",
		fontSize: 22,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 8,
	},
	headerSubtitle: {
		color: "#fff",
		fontSize: 15,
		textAlign: "center",
	},
	backLink: {
		color: "#ff6b6b",
		fontSize: 16,
		marginLeft: 16,
		marginTop: 16,
		marginBottom: 8,
	},
	venueGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		paddingHorizontal: 8,
	},
	venueCard: {
		backgroundColor: "#fff",
		borderRadius: 10,
		margin: 8,
		width: 320,
		shadowColor: "#000",
		shadowOpacity: 0.07,
		shadowRadius: 8,
		elevation: 2,
		overflow: "hidden",
    borderWidth: 1.5,
    borderColor: 'rgba(220,220,220,0.7)', // shiny glossy border
	},
	venueImage: {
		width: "100%",
		height: 180,
	},
	venueInfo: {
		padding: 12,
	},
	venueName: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 4,
	},
	venueCity: {
		fontSize: 14,
		color: "#888",
		marginBottom: 4,
	},
	venueDesc: {
		fontSize: 14,
		color: "#444",
	},
	venuePrice: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#0288d1",
		marginTop: 8,
		marginBottom: 8,
	},
	bookBtn: {
		backgroundColor: "#ff6b6b",
		alignSelf: "center",
		borderRadius: 8,
		marginTop: 4,
		marginBottom: 4,
		paddingVertical: 10,
		paddingHorizontal: 28,
	},
	bookBtnText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
	footer: {
		alignItems: "center",
		padding: 16,
		backgroundColor: "#f1f1f1",
		borderRadius: 12,
		marginHorizontal: 16,
		marginBottom: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(220,220,220,0.7)', // shiny glossy border
	},
	footerText: {
		color: "#777",
		fontSize: 14,
		textAlign: "center",
	},
	brand: {
		fontWeight: "bold",
		color: "#ff6b6b",
	},
});