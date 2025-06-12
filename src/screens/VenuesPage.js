import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

const venues = [
  {
    name: "Royal Palace Banquet",
    city: "Bidar",
    image: "https://images.pexels.com/photos/14646752/pexels-photo-14646752.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=600&h=400",
    description: "A beautiful venue for weddings, birthdays, and more. Spacious halls and premium facilities."
  },
  {
    name: "Royal Palace Banquet",
    city: "Kalaburgi",
    image: "https://images.pexels.com/photos/14646752/pexels-photo-14646752.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=600&h=400",
    description: "A beautiful venue for weddings, birthdays, and more. Spacious halls and premium facilities."
  },
  {
    name: "Sunshine Gardens",
    city: "Kalaburgi",
    image: "https://images.pexels.com/photos/17023032/pexels-photo-17023032.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=600&h=400",
    description: "Open-air garden venue perfect for outdoor celebrations and family gatherings."
  },
  {
    name: "Bijapur Grand Hall",
    city: "Bijapur",
    image: "https://images.pexels.com/photos/17206173/pexels-photo-17206173.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=600&h=400",
    description: "Modern amenities and elegant interiors for all your special events."
  },
  {
    name: "Raichur Heritage Venue",
    city: "Raichur",
    image: "https://images.pexels.com/photos/10949592/pexels-photo-10949592.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=600&h=400",
    description: "A heritage property with classic charm and all modern comforts."
  }
];

export default function VenuesPage({ navigation, route }) {
  // Optional: filter by city if passed as param
  const city = route?.params?.city;
  const filteredVenues = city ? venues.filter(v => v.city === city) : venues;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Venues</Text>
        <Text style={styles.headerSubtitle}>Browse and book the best venues for your celebration</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backLink}>← Back to Home</Text>
      </TouchableOpacity>
      <View style={styles.venueGrid}>
        {filteredVenues.map((venue, idx) => (
          <View style={styles.venueCard} key={idx}>
            <Image source={{ uri: venue.image }} style={styles.venueImage} />
            <View style={styles.venueInfo}>
              <Text style={styles.venueName}>{venue.name}</Text>
              <Text style={styles.venueCity}>City: {venue.city}</Text>
              <Text style={styles.venueDesc}>{venue.description}</Text>
            </View>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.bookBtn}>
        <Text style={styles.bookBtnText}>Book a Venue</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2025 <Text style={styles.brand}>Sambrama.com</Text> — Your Celebration, Our Venue
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff3eb" },
  header: {
    backgroundColor: "#ff6b6b",
    paddingVertical: 52,
    paddingHorizontal: 16,
    alignItems: "center",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 10,
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
  bookBtn: {
    backgroundColor: "#ff6b6b",
    alignSelf: "center",
    borderRadius: 8,
    marginTop: 24,
    marginBottom: 24,
    paddingVertical: 12,
    paddingHorizontal: 32,
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