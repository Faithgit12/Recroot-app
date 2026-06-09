import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from '../../components/profile/styles';
import { CustomInput } from '../../components/profile/CustomInput';
import { CustomDropdown } from '../../components/profile/CustomDropdown';
import { authService } from '../../services/api/authService';
import { useAuthStore } from '../../store/authStore';

export default function PersonalInfoScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [stateCity, setStateCity] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const { profile, updateProfile } = useAuthStore();

  React.useEffect(() => {
    if (profile) {
      if (profile.fullName) setName(profile.fullName);
      if (profile.email) setEmail(profile.email);
      if (profile.phone) setPhone(profile.phone);
      if (profile.location) {
        const parts = profile.location.split(', ');
        if (parts.length > 1) {
          setStateCity(parts[0]);
          setCountry(parts[1]);
        } else {
          setCountry(profile.location);
        }
      }
    }
  }, [profile]);

  const handleCountrySelect = (val: string) => {
    setCountry(val);
    setStateCity(''); // Reset state/city when country changes
  };

  const nigeriaStates = [
    'Abia', 'Abuja (FCT)', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 
    'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe', 'Imo', 
    'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 
    'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
  ];

  const getStateOptions = () => {
    switch (country) {
      case 'Nigeria': return nigeriaStates;
      case 'United States': return ['California', 'New York', 'Texas', 'North Carolina', 'Florida', 'Illinois'];
      case 'United Kingdom': return ['England', 'Scotland', 'Wales', 'Northern Ireland'];
      case 'South Africa': return ['Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Eastern Cape'];
      case 'Kenya': return ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru'];
      default: return [];
    }
  };

  const handleNext = async () => {
    try {
      setIsUpdating(true);
      const locationString = stateCity ? `${stateCity}, ${country}` : country;
      
      updateProfile({
        fullName: name,
        email: email,
        phone: phone,
        location: locationString,
      });

      try {
        await authService.updateProfile({
          fullName: name,
          email: email,
          phone: phone,
          location: locationString,
        });
      } catch (apiErr: any) {
        if (apiErr?.response?.status === 404) {
          console.warn("Backend endpoint for updating profile not found (404). Proceeding with local state only.");
        } else {
          console.error("Profile update failed:", apiErr);
        }
      }
      
      router.push('/profile/professional-story');
    } catch (err: any) {
      Alert.alert("Error", err.message || "An unexpected error occurred.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EEF3F9' }}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        enabled={Platform.OS !== 'web'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView 
            style={{ flex: 1 }}
            contentContainerStyle={[styles.container, { paddingBottom: 40 }]} 
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
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
            onSelect={handleCountrySelect}
          />

          <CustomDropdown
            label="State / city"
            value={stateCity}
            options={getStateOptions()}
            onSelect={setStateCity}
          />

          <TouchableOpacity 
            style={[styles.button, isUpdating && { opacity: 0.7 }]} 
            onPress={handleNext}
            disabled={isUpdating}
          >
            <Text style={styles.buttonText}>{isUpdating ? 'Saving...' : 'Next'}</Text>
          </TouchableOpacity>
        </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
