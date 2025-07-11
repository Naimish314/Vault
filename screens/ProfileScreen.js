import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
    <ScrollView style={styles.container}>
      {/* User Info */}
      
      <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.profileImageWrapper}>
          <Image
            source={require('../assets/icon.png')}
            style={styles.profileImage}
          />
          <View style={styles.editIconWrapper}>
            <Feather name="edit-2" size={wp('3.5%')} color="#FFF" />
          </View>
        </TouchableOpacity>
        <View style={styles.profileDetails}>
          <Text style={styles.name}>Aaliya Mubashira</Text>
          <Text style={styles.info}>Account No: 1234567890</Text>
          <Text style={styles.info}>aaliya@example.com</Text>
        </View>
      </View>

      {/* Privacy & Support Section */}
      <Text style={styles.sectionHeader}>Privacy & Support</Text>
      <View style={styles.section}>
        <Option icon={<Ionicons name="help-circle-outline" size={wp('5.5%')} color="#AD99FF" />} text="FAQs and support" />
        <Option icon={<MaterialIcons name="format-list-bulleted" size={wp('5.5%')} color="#AD99FF" />} text="DO’S and DON’Ts" />
        <Option icon={<Feather name="shield" size={wp('5.5%')} color="#AD99FF" />} text="Privacy settings" />
        <Option icon={<Feather name="file-text" size={wp('5.5%')} color="#AD99FF" />} text="T&Cs and policies" />
      </View>

      {/* App Settings Section */}
      <Text style={styles.sectionHeader}>App Settings</Text>
      <View style={styles.section}>
        <Option icon={<Ionicons name="notifications-outline" size={wp('5.5%')} color="#C7B3FF" />} text="Alert settings" />
        <Option icon={<Ionicons name="globe-outline" size={wp('5.5%')} color="#C7B3FF" />} text="Rate us on the App Store" />
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
    </SafeAreaView>
  );
}

const Option = ({ icon, text }) => (
  <TouchableOpacity style={styles.optionRow}>
    <View style={styles.optionLeft}>
      {icon}
      <Text style={styles.optionText}>{text}</Text>
    </View>
    <Feather name="chevron-right" size={wp('4.5%')} color="#999" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#0A0A0A',
    },
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    padding: wp('5%'),
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('3%'),
  },
  profileImageWrapper: {
    position: 'relative',
  },
  profileImage: {
    width: wp('18%'),
    height: wp('18%'),
    borderRadius: wp('9%'),
  },
  editIconWrapper: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#7A58C1',
    borderRadius: wp('3%'),
    padding: wp('1.3%'),
  },
  profileDetails: {
    marginLeft: wp('4%'),
  },
  name: {
    fontSize: wp('5%'),
    color: '#FFF',
    fontWeight: '700',
  },
  info: {
    color: '#AAA',
    fontSize: wp('3.5%'),
    marginTop: hp('0.5%'),
  },
  sectionHeader: {
    fontSize: wp('4.2%'),
    fontWeight: '700',
    color: '#FFF',
    marginTop: hp('2.5%'),
    marginBottom: hp('1.2%'),
  },
  section: {
    backgroundColor: '#1A1A1A',
    borderRadius: wp('3%'),
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%'),
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp('1.6%'),
    borderBottomWidth: 1,
    borderColor: '#2A2A2A',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('3%'),
  },
  optionText: {
    color: '#E4D9FF',
    fontSize: wp('4%'),
  },
  logoutButton: {
    backgroundColor: '#1F1333',
    padding: hp('2%'),
    borderRadius: wp('3%'),
    alignItems: 'center',
    marginTop: hp('4%'),
  },
  logoutText: {
    color: '#E4D9FF',
    fontSize: wp('4%'),
    fontWeight: '700',
  },
});
