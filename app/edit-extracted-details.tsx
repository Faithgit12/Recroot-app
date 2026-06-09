import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ExtractedJobDetails } from '../services/aiExtractionService';

export default function EditExtractedDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { extractedDetails, jobDescription } = params;

  const [details, setDetails] = useState<ExtractedJobDetails>({
    jobTitle: '',
    experience: '',
    jobType: '',
    skills: '',
    location: '',
    keySkills: [],
  });

  useEffect(() => {
    if (extractedDetails) {
      try {
        const parsed = JSON.parse(extractedDetails as string);
        setDetails(parsed);
      } catch (e) {
        console.error("Failed to parse extracted details");
      }
    }
  }, [extractedDetails]);

  const handleChange = (key: keyof ExtractedJobDetails, value: string) => {
    setDetails(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveAndContinue = () => {
    router.push({
      pathname: '/job-details-extracted',
      params: { 
        confirmedDetails: JSON.stringify(details),
        jobDescription: jobDescription as string
      }
    });
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1, backgroundColor: '#F8FAFC' }} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#0F172A" />
            </TouchableOpacity>
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Confirm and Edit Details</Text>
            <Text style={styles.subtitle}>Review and edit the extracted information</Text>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Job Title</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.textInput}
                value={details.jobTitle}
                onChangeText={(val) => handleChange('jobTitle', val)}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Experience</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.textInput}
                value={details.experience}
                onChangeText={(val) => handleChange('experience', val)}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Job Type</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.textInput}
                value={details.jobType}
                onChangeText={(val) => handleChange('jobType', val)}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Skills</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.textInput}
                value={details.skills}
                onChangeText={(val) => handleChange('skills', val)}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Location</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.textInput}
                value={details.location}
                onChangeText={(val) => handleChange('location', val)}
              />
            </View>
          </View>

          <View style={styles.keySkillsContainer}>
            <Text style={styles.keySkillsTitle}>Key Skills</Text>
            <View style={styles.tagsWrapper}>
              {details.keySkills.map((skill, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.spacer} />

          <TouchableOpacity style={styles.button} onPress={handleSaveAndContinue}>
            <Text style={styles.buttonText}>Save & Continue</Text>
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
    flexGrow: 1,
  },
  header: {
    marginBottom: 24,
  },
  backButton: {
    padding: 4,
    marginLeft: -4,
  },
  titleContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
    marginBottom: 8,
  },
  inputWrapper: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 48,
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: '#0F172A',
  },
  keySkillsContainer: {
    marginTop: 8,
    marginBottom: 24,
  },
  keySkillsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  tagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  tagText: {
    color: '#183C6B', // The primary blue color for key skills
    fontSize: 14,
    fontWeight: '500',
  },
  spacer: {
    flex: 1,
    minHeight: 20,
  },
  button: {
    backgroundColor: '#183C6B',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
