import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, ActivityIndicator, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from '../../components/profile/styles';
import { CustomInput } from '../../components/profile/CustomInput';
import { CustomDropdown } from '../../components/profile/CustomDropdown';
import { authService } from '../../services/api/authService';
import { useAuthStore } from '../../store/authStore';

export default function ProfessionalStoryScreen() {
  const router = useRouter();

  const [experienceLevel, setExperienceLevel] = useState('');
  const [industry, setIndustry] = useState('');
  const [roleType, setRoleType] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [skills, setSkills] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const { profile, updateProfile } = useAuthStore();

  React.useEffect(() => {
    if (profile) {
      if (profile.jobTitle) setRoleType(profile.jobTitle);
      if (profile.skills && profile.skills.length > 0) {
        setSkills(profile.skills.join(', '));
      }
    }
  }, [profile]);

  const handleContinue = async () => {
    try {
      setIsUpdating(true);
      const skillsArray = skills ? skills.split(',').map(s => s.trim()) : [];
      
      updateProfile({
        jobTitle: roleType,
        skills: skillsArray,
      });

      try {
        await authService.updateProfile({
          title: roleType,
          skills: skillsArray,
        });
      } catch (apiErr: any) {
        if (apiErr?.response?.status === 404) {
          console.warn("Backend endpoint for updating profile not found (404). Proceeding with local state only.");
        } else {
          console.error("Profile update failed:", apiErr);
        }
      }
      
      router.push('/profile/upload-resume');
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
            <Text style={styles.title}>Your Professional Story</Text>
            <Text style={styles.subtitle}>Let's set up your career profile</Text>

          <CustomDropdown
            label="Experience Level"
            value={experienceLevel}
            options={['Less than 1 year', '1 - 2 years', '3 - 5 years', '6 - 10 years', '10+ years']}
            onSelect={setExperienceLevel}
          />

          <CustomDropdown
            label="Industry"
            value={industry}
            options={['Healthcare', 'Education', 'Media & Communication', 'Retail & E-commerce', 'NGO/ Non-Profit', 'Government', 'Educational Institution', 'Other']}
            onSelect={setIndustry}
          />

          <CustomInput
            label="Role type"
            placeholder=""
            value={roleType}
            onChangeText={setRoleType}
          />

          <CustomDropdown
            label="Employment type"
            value={employmentType}
            options={['Full Time', 'Contract', 'Part Time', 'Freelance', 'Internship']}
            onSelect={setEmploymentType}
          />

          <CustomDropdown
            label="Skills"
            value={skills}
            options={['Digital Marketing', 'SEO & SEM', 'Social Media Marketing', 'Email Marketing', 'Data Visualization', 'Other']}
            onSelect={setSkills}
          />

          <CustomInput
            label="LinkedIn Link"
            placeholder=""
            value={linkedin}
            onChangeText={setLinkedin}
            autoCapitalize="none"
          />

          <TouchableOpacity 
            style={[styles.button, isUpdating && { opacity: 0.7 }]} 
            onPress={handleContinue}
            disabled={isUpdating}
          >
            <Text style={styles.buttonText}>{isUpdating ? 'Saving...' : 'Continue'}</Text>
          </TouchableOpacity>
        </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
