import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList, ImageBackground, Image, ScrollView
} from 'react-native';
import { Ionicons, MaterialIcons, Feather, FontAwesome } from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const vaultColors = ['#7A58C1', '#AD99FF', '#5A3C9A'];

const vaultBackgrounds = {
  trip: require('../assets/bg_travel.avif'),
  family: require('../assets/bg_family.jpg'),
  party: require('../assets/bg_party.jpg'),
  default: require('../assets/bg_default.jpg'),
};


const mockActivities = [
  { id: '1', text: 'You deposited ₹500 in Travel Vault', time: '2h ago' },
  { id: '2', text: 'Amit joined Family Vault', time: '5h ago' },
  { id: '3', text: 'You withdrew ₹200 from Party Vault', time: '1d ago' },
];

export default function HomeScreen({ navigation }) {
  const [activeVaults, setActiveVaults] = useState([]);
  const [notifications, setNotifications] = useState(2);
  const [filter, setFilter] = useState('all');
  const [profile, setProfile] = useState({
    name: 'User',
    avatar: 'https://www.gravatar.com/avatar/?d=mp'
  });

  useFocusEffect(
    useCallback(() => {
      const loadVaults = async () => {
        try {
          const storedVaults = await AsyncStorage.getItem('vaults');
          const parsedVaults = storedVaults ? JSON.parse(storedVaults) : [];
          setActiveVaults(parsedVaults);
        } catch (error) {
          console.error('Error loading vaults:', error);
        }
      };

      const loadProfile = async () => {
        try {
          const storedName = await AsyncStorage.getItem('@profile_name');
          const storedImage = await AsyncStorage.getItem('@profile_image');
          setProfile({
            name: storedName || 'User',
            avatar: storedImage || 'https://www.gravatar.com/avatar/?d=mp'
          });
        } catch (err) {
          console.error('Failed to load profile:', err);
        }
      };

      loadVaults();
      loadProfile();
    }, [])
  );

  const filteredVaults = filter === 'all'
    ? activeVaults
    : activeVaults.filter(v => v.amount > 5000);


const getVaultBackground = (title) => {
  const key = title?.toLowerCase();
  if (key.includes('trip')) return vaultBackgrounds.trip;
  if (key.includes('family')) return vaultBackgrounds.family;
  if (key.includes('party')) return vaultBackgrounds.party;
  return vaultBackgrounds.default;
};


  return (
    <View style={styles.container}>
      {/* Fixed Top Bar */}
      <View style={styles.topBarFixed}>
        <View style={styles.greetingContainer}>
          <Image source={{ uri: profile.avatar }} style={styles.avatar} />
          <Text style={styles.greetingText}>Hi, {profile.name} </Text>
        </View>
        <TouchableOpacity
          style={styles.notificationIcon}
          onPress={() => navigation.navigate('Notifications')}
        >
          <Ionicons name="notifications-outline" size={wp('7%')} color="#E4D9FF" />
          {notifications > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{notifications}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp('14%'), paddingTop: hp('8%') }}
      >
        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryText}>Total Vaults Joined: {activeVaults.length}</Text>
          <Text style={styles.summarySubText}>The Goals will be Achieved, {profile.name}! </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.quickActionBtn}
            onPress={() => navigation.navigate('Deposit')}
          >
            <FontAwesome name="plus-circle" size={wp('7%')} color="#AD99FF" />
            <Text style={styles.quickActionText}>Deposit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickActionBtn}
            onPress={() => navigation.navigate('Withdraw')}
          >
            <FontAwesome name="minus-circle" size={wp('7%')} color="#AD99FF" />
            <Text style={styles.quickActionText}>Withdraw</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickActionBtn}
            onPress={() => navigation.navigate('Invite')}
          >
            <Ionicons name="person-add-outline" size={wp('7%')} color="#AD99FF" />
            <Text style={styles.quickActionText}>Invite</Text>
          </TouchableOpacity>
        </View>

        {/* Vault Management */}
        <View style={styles.mainButtons}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('CreateVault')}
          >
            <Text style={styles.buttonText}>Create a Vault</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('JoinVault')}
          >
            <Text style={styles.buttonText}>Join a Vault</Text>
          </TouchableOpacity>
        </View>

        {/* Vault Filter */}
        <View style={styles.filterBar}>
          <TouchableOpacity
            style={[styles.filterBtn, filter === 'all' && styles.filterBtnActive]}
            onPress={() => setFilter('all')}
          >
            <Text style={styles.filterText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterBtn, filter === 'high' && styles.filterBtnActive]}
            onPress={() => setFilter('high')}
          >
            <Text style={styles.filterText}>High Value</Text>
          </TouchableOpacity>
        </View>

        {/* Vault List */}
        <Text style={styles.vaultStripHeader}>My Active Vaults</Text>
        <FlatList
          horizontal
          data={filteredVaults}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.vaultStripContainer}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[
                styles.vaultCardWrapper]}
              onPress={() => navigation.navigate('VaultDetails', { vaultId: item.id })}
            >
              <ImageBackground
               source={getVaultBackground(item.title)}
               style={styles.vaultCard}
                imageStyle={{ borderRadius: wp('4%') }}
                >
              <Text style={styles.vaultTitle}>{item.title}</Text>
              <Text style={styles.vaultAmount}>{item.amount}</Text>
              
             
              </ImageBackground>
            </TouchableOpacity>
          )}
        />

        {/* Activity Feed */}
        <Text style={styles.activityHeader}>Recent Activity</Text>
        <View style={styles.activityFeed}>
          {mockActivities.map(activity => (
            <View key={activity.id} style={styles.activityItem}>
              <Text style={styles.activityText}>{activity.text}</Text>
              <Text style={styles.activityTime}>{activity.time}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Groups')}>
          <Ionicons name="people-outline" size={wp('8%')} color="#D4C2FF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Savings')}>
          <MaterialIcons name="savings" size={wp('8%')} color="#D4C2FF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Feather name="user" size={wp('8%')} color="#D4C2FF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    padding: wp('5%'),
    paddingTop: hp('6%'),
  },
  topBarFixed: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: '#0A0A0A',
    paddingHorizontal: wp('5%'),
    paddingTop: hp('6%'),
    paddingBottom: hp('2%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // Add shadow for elevation if desired
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  topBar: {
    // Not used anymore, kept for reference
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    marginRight: wp('2%'),
  },
  greetingText: {
    color: '#E4D9FF',
    fontSize: wp('5%'),
    fontWeight: '700',
  },
  notificationIcon: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: '#AD99FF',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  badgeText: {
    color: '#0A0A0A',
    fontSize: wp('3%'),
    fontWeight: '700',
  },
  summaryCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: wp('4%'),
    borderWidth: 1,
    borderColor: '#7A58C1',
    padding: wp('5%'),
    marginBottom: hp('2%'),
  },
  summaryText: {
    color: '#E4D9FF',
    fontSize: wp('4.8%'),
    fontWeight: '600',
    marginBottom: hp('1%'),
  },
  summarySubText: {
    color: '#AAA',
    fontSize: wp('4%'),
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('2%'),
  },
  quickActionBtn: {
    backgroundColor: '#1F1333',
    borderRadius: wp('4%'),
    padding: wp('3%'),
    alignItems: 'center',
    width: wp('25%'),
  },
  quickActionText: {
    color: '#E4D9FF',
    fontSize: wp('3.5%'),
    marginTop: 4,
    fontWeight: '600',
  },
  mainButtons: {
    gap: hp('2%'),
    marginBottom: hp('2%'),
  },
  actionButton: {
    backgroundColor: '#1F1333',
    paddingVertical: hp('2%'),
    borderRadius: wp('6%'),
    borderColor: '#7A58C1',
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  buttonText: {
    color: '#E4D9FF',
    fontSize: wp('4.5%'),
    fontWeight: '600',
  },
  filterBar: {
    flexDirection: 'row',
    marginBottom: hp('1%'),
    gap: wp('2%'),
  },
  filterBtn: {
    backgroundColor: '#1A1A1A',
    paddingVertical: hp('0.8%'),
    paddingHorizontal: wp('4%'),
    borderRadius: wp('4%'),
    borderWidth: 1,
    borderColor: '#7A58C1',
  },
  filterBtnActive: {
    backgroundColor: '#7A58C1',
  },
  filterText: {
    color: '#E4D9FF',
    fontSize: wp('3.8%'),
    fontWeight: '600',
  },
  vaultStripHeader: {
    fontSize: wp('4.5%'),
    color: '#E4D9FF',
    fontWeight: '600',
    marginBottom: hp('1.2%'),
  },
  vaultStripContainer: {
    paddingBottom: hp('1.5%'),
  },
  vaultCard: {
    borderRadius: wp('4%'),
    padding: wp('3.5%'),
    marginRight: wp('3.5%'),
    width: wp('40%'),
    height: hp('15%'),
    justifyContent: 'center',
  },
  vaultTitle: {
    color: '#FFF',
    fontSize: wp('4.2%'),
    fontWeight: '700',
    marginBottom: hp('0.5%'),
  },
  vaultAmount: {
    color: '#E4D9FF',
    fontSize: wp('3.5%'),
    marginBottom: hp('0.5%'),
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#1A1A1A',
    borderRadius: 4,
    marginVertical: 4,
    width: '100%',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 8,
    backgroundColor: '#E4D9FF',
    borderRadius: 4,
  },
  goalText: {
    color: '#AAA',
    fontSize: wp('3%'),
    marginTop: 2,
  },
  activityHeader: {
    fontSize: wp('4.2%'),
    color: '#E4D9FF',
    fontWeight: '600',
    marginTop: hp('2%'),
    marginBottom: hp('1%'),
  },
  activityFeed: {
    maxHeight: hp('15%'),
    marginBottom: hp('2%'),
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1A1A1A',
    borderRadius: wp('3%'),
    padding: wp('3%'),
    marginBottom: hp('0.8%'),
  },
  activityText: {
    color: '#E4D9FF',
    fontSize: wp('3.5%'),
    flex: 1,
  },
  activityTime: {
    color: '#AAA',
    fontSize: wp('3%'),
    marginLeft: wp('2%'),
  },
  bottomBar: {
    position: 'absolute',
    bottom: hp('4%'),
    left: wp('10%'),
    right: wp('10%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vaultCardWrapper: {
  marginRight: wp('3.5%'),
  width: wp('40%'),
  height: hp('15%'),
  },
  vaultCard: {
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
  justifyContent: 'center',
  padding: wp('3.5%'),
  },

}); 
