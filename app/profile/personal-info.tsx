import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from './styles';
import { CustomInput } from './components/CustomInput';
import { CustomDropdown } from './components/CustomDropdown';

export default function PersonalInfoScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [stateCity, setStateCity] = useState('');

  const handleNext = () => {
    router.push('/profile/professional-story');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EEF3F9' }}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled={Platform.OS !== 'web'}
      >
        <ScrollView 
          style={{ flex: 1 }}
          contentContainerStyle={[styles.container, { paddingBottom: 40 }]} 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Tell Us About Yourself</Text>
          <Text style={styles.subtitle}>Let's set up your profile to personalize your experiences</Text>

          <CustomInput
            label="Your Name"
            placeholder="Alex Joshua"
            value={name}
            onChangeText={setName}
          />

          <CustomInput
            label="Phone Number"
            placeholder=""
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <CustomInput
            label="Your email"
            placeholder="example@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <CustomDropdown
            label="Country"
            value={country}
            options={['United States', 'United Kingdom', 'Nigeria', 'South Africa', 'Kenya']}
            onSelect={setCountry}
          />

          <CustomDropdown
            label="State / city"
            value={stateCity}
            options={['North Carolina', 'Scotland', 'Lagos', 'Western Cape', 'Nairobi County']}
            onSelect={setStateCity}
          />

          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
