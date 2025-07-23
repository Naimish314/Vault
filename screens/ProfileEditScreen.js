// Your imports remain unchanged
import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Platform,
  Modal, ScrollView, KeyboardAvoidingView
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

const genderOptions = ['Male', 'Female', 'Other'];

export default function ProfileEditScreen({ route, navigation }) {
  const { name, accountNumber, email, image, birthday } = route.params || {};
  const [editedName, setEditedName] = useState(name || '');
  const [phone, setPhone] = useState('');
  const [editedEmail, setEditedEmail] = useState(email || '');
  const [bio, setBio] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [birthDate, setBirthDate] = useState(birthday ? new Date(birthday) : new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [genderModalVisible, setGenderModalVisible] = useState(false);

  const [socialExpanded, setSocialExpanded] = useState(false);
  const [instagram, setInstagram] = useState('');
  const [snapchat, setSnapchat] = useState('');

  useEffect(() => {
    (async () => {
      const storedPhone = await AsyncStorage.getItem('@profile_phone');
      const storedBio = await AsyncStorage.getItem('@profile_bio');
      const storedGender = await AsyncStorage.getItem('@profile_gender');
      const storedInstagram = await AsyncStorage.getItem('@profile_instagram');
      const storedSnapchat = await AsyncStorage.getItem('@profile_snapchat');
      setPhone(storedPhone || '');
      setBio(storedBio || '');
      setSelectedGender(storedGender || '');
      setInstagram(storedInstagram || '');
      setSnapchat(storedSnapchat || '');
    })();
  }, []);

  const saveProfile = async () => {
    try {
      await AsyncStorage.setItem('@profile_name', editedName);
      await AsyncStorage.setItem('@profile_email', editedEmail);
      await AsyncStorage.setItem('@profile_bio', bio);
      await AsyncStorage.setItem('@profile_gender', selectedGender);
      await AsyncStorage.setItem('@profile_birthday', birthDate.toISOString());
      await AsyncStorage.setItem('@profile_phone', phone);
      await AsyncStorage.setItem('@profile_instagram', instagram);
      await AsyncStorage.setItem('@profile_snapchat', snapchat);
      navigation.goBack();
    } catch (err) {
      // Handle error
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#181818' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 24}
    >
      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={28} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.header}>Personal Info</Text>

          <View style={styles.field}>
            <Text style={styles.label}>Name</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={editedName}
                onChangeText={setEditedName}
                placeholder="Enter your name"
                placeholderTextColor="#AAA"
                underlineColorAndroid="transparent"
                selectionColor="#9b59b6"
              />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
                placeholderTextColor="#AAA"
                underlineColorAndroid="transparent"
                selectionColor="#9b59b6"
              />
            </View>
            <TouchableOpacity style={styles.changeBtn}>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Email ID</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={editedEmail}
                onChangeText={setEditedEmail}
                placeholder="Enter email"
                keyboardType="email-address"
                placeholderTextColor="#AAA"
                underlineColorAndroid="transparent"
                selectionColor="#9b59b6"
              />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Bio</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={bio}
                onChangeText={setBio}
                placeholder="Add your bio"
                placeholderTextColor="#AAA"
                underlineColorAndroid="transparent"
                selectionColor="#9b59b6"
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.field, { flex: 1 }]}>
              <Text style={styles.label}>Birthday</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={{ color: '#FFF' }}>{birthDate.toLocaleDateString()}</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={birthDate}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) setBirthDate(selectedDate);
                  }}
                />
              )}
            </View>

            <View style={[styles.field, { flex: 1 }]}>
              <Text style={styles.label}>Gender</Text>
              <TouchableOpacity
                style={[styles.input, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}
                onPress={() => setGenderModalVisible(true)}
              >
                <Text style={{ color: selectedGender ? '#7A58C1' : '#FFF' }}>
                  {selectedGender || 'Select gender'}
                </Text>
                <Feather name="chevron-down" size={20} color="#FFF" />
              </TouchableOpacity>
              <Modal
                visible={genderModalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setGenderModalVisible(false)}
              >
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setGenderModalVisible(false)}>
                  <View style={styles.genderModal}>
                    {genderOptions.map(option => (
                      <TouchableOpacity
                        key={option}
                        style={styles.genderOption}
                        onPress={() => {
                          setSelectedGender(option);
                          setGenderModalVisible(false);
                        }}
                      >
                        <Text style={{
                          color: selectedGender === option ? '#7A58C1' : '#FFF',
                          fontWeight: selectedGender === option ? '700' : '400',
                          fontSize: 16,
                        }}>
                          {option}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </TouchableOpacity>
              </Modal>
            </View>
          </View>

          {/* Social Media Profiles Section */}
          <TouchableOpacity
            style={styles.socialHeader}
            onPress={() => setSocialExpanded(!socialExpanded)}
          >
            <Text style={styles.socialHeaderText}>Social Media Profiles</Text>
            <Feather name={socialExpanded ? 'chevron-up' : 'chevron-down'} size={22} color="#FFF" />
          </TouchableOpacity>

          {socialExpanded && (
            <View style={styles.socialFields}>
              <View style={styles.field}>
                <Text style={styles.label}>Instagram Handle</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    value={instagram}
                    onChangeText={setInstagram}
                    placeholder="Instagram username"
                    placeholderTextColor="#AAA"
                    underlineColorAndroid="transparent"
                    selectionColor="#9b59b6"
                  />
                </View>
              </View>
              <View style={styles.field}>
                <Text style={styles.label}>Snapchat Handle</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    value={snapchat}
                    onChangeText={setSnapchat}
                    placeholder="Snapchat username"
                    placeholderTextColor="#AAA"
                    underlineColorAndroid="transparent"
                    selectionColor="#9b59b6"
                  />
                </View>
              </View>
            </View>
          )}

          <TouchableOpacity style={styles.saveBtn} onPress={saveProfile}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#181818' },
  container: { flex: 1, padding: 24 },
  backBtn: { marginBottom: 16 },
  header: { fontSize: 22, fontWeight: '700', color: '#FFF', marginBottom: 24 },
  field: { marginBottom: 18 },
  label: { color: '#AAA', fontSize: 15, marginBottom: 6 },
  inputWrapper: { borderRadius: 10, overflow: 'hidden' },
  input: {
    backgroundColor: '#232323',
    borderRadius: 10,
    padding: 12,
    color: '#FFF',
    fontSize: 16,
    borderWidth: 0,
    elevation: 0,
    shadowColor: 'transparent',
    overflow: 'hidden',
  },
  changeBtn: {
    position: 'absolute',
    right: 10,
    top: 32,
    backgroundColor: '#AD99FF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  changeText: { color: '#232323', fontWeight: '700' },
  row: { flexDirection: 'row', gap: 12 },
  saveBtn: {
    backgroundColor: '#7A58C1',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  saveText: { color: '#FFF', fontWeight: '700', fontSize: 16 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  genderModal: {
    backgroundColor: '#232323',
    borderRadius: 12,
    padding: 20,
    minWidth: 180,
    alignItems: 'center',
  },
  genderOption: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  socialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 18,
    marginBottom: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  socialHeaderText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  socialFields: {
    marginBottom: 12,
  },
});
