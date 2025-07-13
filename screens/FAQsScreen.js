import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FAQsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={28} color="#D4C2FF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FAQs & Support</Text>
        <Ionicons name="help-circle-outline" size={24} color="#D4C2FF" />
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.faqItem}>
          <Text style={styles.question}>What is Vault?</Text>
          <Text style={styles.answer}>
            Vault is a group-based savings app where friends can pool money and unlock it together with mutual trust.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.question}>How do I join a vault?</Text>
          <Text style={styles.answer}>
            You can join a vault by receiving an invite link or code from a friend and using the "Join Vault" button on the home screen.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.question}>How do I reset my password?</Text>
          <Text style={styles.answer}>
            Go to the Profile section → Tap "Privacy Settings" → Follow the password reset instructions.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.question}>Need more help?</Text>
          <Text style={styles.answer}>
            You can contact us via vault.support@gmail.com. We usually reply within 24–48 hours.
          </Text>
        </View>
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#E4D9FF',
    fontSize: 18,
    fontWeight: '700',
  },
  faqItem: {
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 12,
    borderColor: '#7A58C1',
    borderWidth: 1,
    marginBottom: 16,
  },
  question: {
    color: '#DCCEFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  answer: {
    color: '#AAA',
    fontSize: 14,
    lineHeight: 20,
  },
});
