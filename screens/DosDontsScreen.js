// screens/DosDontsScreen.js

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DosDontsScreen({ navigation }) {
  const dos = [
    "Contribute on time to maintain trust.",
    "Communicate with your group regularly.",
    "Verify all members before creating a vault.",
  ];

  const donts = [
    "Don't withdraw funds without group approval.",
    "Don't add members without consensus.",
    "Avoid inactive participation.",
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={26} color="#D4C2FF" />
          </TouchableOpacity>
          <Text style={styles.headerText}>DOs & DON’Ts</Text>
        </View>

        {/* DOs Section */}
        <Text style={styles.sectionTitle}>✅ DOs</Text>
        {dos.map((item, index) => (
          <Text key={index} style={styles.bullet}>• {item}</Text>
        ))}

        {/* DON'Ts Section */}
        <Text style={styles.sectionTitle}>🚫 DON'Ts</Text>
        {donts.map((item, index) => (
          <Text key={index} style={styles.bullet}>• {item}</Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  container: {
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 24,
  },
  headerText: {
    fontSize: 20,
    color: '#E4D9FF',
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 18,
    color: '#C7B3FF',
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 8,
  },
  bullet: {
    fontSize: 15,
    color: '#B4A5E5',
    marginLeft: 10,
    marginBottom: 6,
  },
});
