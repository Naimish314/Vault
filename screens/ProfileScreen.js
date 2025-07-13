import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  Image, TouchableOpacity, Alert, Linking, Modal
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen({ navigation }){
  const [image, setImage] = useState(null);
  const [logoutVisible, setLogoutVisible] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const storedUri = await AsyncStorage.getItem('@profile_image');
        if (storedUri) setImage(storedUri);

        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Required', 'Please allow media access to update your profile picture.');
        }
      } catch (err) {
        console.log('Permission/Storage Error:', err);
      }
    })();
  }, []);



  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // ✅ Fixed line
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled && result.assets?.length > 0) {
        const uri = result.assets[0].uri;
        setImage(uri);
        await AsyncStorage.setItem('@profile_image', uri);
      }
    } catch (err) {
      console.log('Image Picker Error:', err);
    }
  };

  const handleLogout = () => {
  Alert.alert(
    'Leaving the Vault?',
  'Your saved data is safe.\nAre you sure you want to log out?',
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Yes, Log Out',
        style: 'destructive',
        onPress: () => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Welcome' }],
          });
        },
      },
    ]
  );
};


  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* User Info */}
        <View style={styles.profileContainer}>
          <TouchableOpacity style={styles.profileImageWrapper} onPress={pickImage}>
            <Image
              source={image ? { uri: image } : require('../assets/icon.png')}
              style={styles.profileImage}
            />
            <View style={styles.editIconWrapper}>
              <Feather name="edit-2" size={16} color="#FFF" />
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
          <Option icon={<Ionicons name="help-circle-outline" size={22} color="#AD99FF" />}
          text="FAQs and support" onPress={() => navigation.navigate('FAQs')}/>

          <Option icon={<MaterialIcons name="format-list-bulleted" size={22} color="#AD99FF" />}
          text="DO’S and DON’Ts" onPress={() => navigation.navigate('DosDonts')}/>

          <Option icon={<Feather name="shield" size={22} color="#AD99FF" />} 
          text="Privacy settings"  onPress={() => navigation.navigate('PrivacySettings')}/>

          <Option icon={<Feather name="file-text" size={22} color="#AD99FF" />} 
          text="T&Cs and policies" onPress={() => navigation.navigate('TermsPolicies')} />
        </View>

        {/* App Settings Section */}
        <Text style={styles.sectionHeader}>App Settings</Text>
        <View style={styles.section}>
          <Option icon={<Ionicons name="notifications-outline" size={22} color="#C7B3FF" />} 
          text="Alert settings" onPress={() => navigation.navigate('AlertSettings')} />

          <Option icon={<Ionicons name="globe-outline" size={22} color="#C7B3FF" />} 
          text="Rate us on the App Store" 
          onPress={() => {
            Linking.openURL('https://play.google.com/store/apps/details?id=com.example.vault');
             // Replace with your actual app/package ID
          }}/>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={() => setLogoutVisible(true)}>
         <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Modal
          transparent
          visible={logoutVisible}
          animationType="fade"
          onRequestClose={() => setLogoutVisible(false)}>
            <View style={styles.modalBackdrop}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Leaving the Vault?</Text>
                <Text style={styles.modalMessage}>Your saved data is safe.{"\n"}Are you sure you want to log out?</Text>
                
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                  style={styles.modalButtonCancel} onPress={() => setLogoutVisible(false)}>
                    <Text style={styles.modalButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                  style={styles.modalButtonConfirm} 
                  onPress={async () => {
                    await AsyncStorage.removeItem('@profile_image');
                    setLogoutVisible(false);
                    navigation.navigate('Welcome');
                  }}
                  >
                    <Text style={[styles.modalButtonText, { color: '#E4D9FF' }]}>Yes, Logout</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
        </Modal>


      </ScrollView>
    </SafeAreaView>
  );
}

const Option = ({ icon, text, onPress }) => (
  <TouchableOpacity style={styles.optionRow} onPress={onPress}>
    <View style={styles.optionLeft}>
      {icon}
      <Text style={styles.optionText}>{text}</Text>
    </View>
    <Feather name="chevron-right" size={20} color="#999" />
  </TouchableOpacity>
);


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImageWrapper: {
    position: 'relative',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editIconWrapper: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#7A58C1',
    borderRadius: 10,
    padding: 4,
  },
  profileDetails: {
    marginLeft: 16,
  },
  name: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: '700',
  },
  info: {
    color: '#AAA',
    fontSize: 14,
    marginTop: 2,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
    marginTop: 24,
    marginBottom: 10,
  },
  section: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#2A2A2A',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionText: {
    color: '#E4D9FF',
    fontSize: 15,
  },
  logoutButton: {
    backgroundColor: '#1F1333',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  logoutText: {
    color: '#E4D9FF',
    fontSize: 16,
    fontWeight: '700',
  },
  modalBackdrop: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  justifyContent: 'center',
  alignItems: 'center',
},
modalContainer: {
  width: '80%',
  backgroundColor: '#1A1A1A',
  padding: 20,
  borderRadius: 16,
  borderColor: '#7A58C1',
  borderWidth: 1,
},
modalTitle: {
  fontSize: 18,
  fontWeight: '700',
  color: '#E4D9FF',
  marginBottom: 10,
},
modalMessage: {
  fontSize: 14,
  color: '#AAA',
  marginBottom: 20,
},
modalButtons: {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  gap: 10,
},
modalButtonCancel: {
  backgroundColor: '#333',
  paddingVertical: 10,
  paddingHorizontal: 16,
  borderRadius: 10,
},
modalButtonConfirm: {
  backgroundColor: '#7A58C1',
  paddingVertical: 10,
  paddingHorizontal: 16,
  borderRadius: 10,
},
modalButtonText: {
  fontSize: 14,
  color: '#FFF',
  fontWeight: '600',
},

});
