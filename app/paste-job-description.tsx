import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const MAX_CHARS = 3000;
const VERY_GOOD_THRESHOLD = 500;

export default function PasteJobDescriptionScreen() {
  const [jobDescription, setJobDescription] = useState('');
  const router = useRouter();

  const handleContinue = () => {
    if (jobDescription.trim().length > 0) {
      router.push({
        pathname: '/ai-analysis',
        params: { jobDescription: jobDescription.trim() },
      });
    }
  };

  const isVeryGood = jobDescription.length >= VERY_GOOD_THRESHOLD;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#0F172A" />
            </TouchableOpacity>
          </View>

          {/* Title & Subtitle */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Paste job description</Text>
            <Text style={styles.subtitle}>Add job description for the role you want to match</Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <Text style={styles.inputLabel}>Job Description</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.textInput}
                multiline
                placeholder="Copy and paste the job description"
                placeholderTextColor="#94A3B8"
                value={jobDescription}
                onChangeText={setJobDescription}
                maxLength={MAX_CHARS}
                textAlignVertical="top"
              />
            </View>
            <View style={styles.charCountContainer}>
              <Text style={styles.charCountText}>
                {jobDescription.length}/ {MAX_CHARS}
              </Text>
              {isVeryGood && (
                <Text style={styles.veryGoodText}>Very Good</Text>
              )}
            </View>
          </View>

          <View style={styles.spacer} />

          {/* Tip Box */}
          <View style={styles.tipBox}>
            <View style={styles.tipHeader}>
              <Ionicons name="bulb-outline" size={20} color="#0F172A" />
              <Text style={styles.tipTitle}>Tip</Text>
            </View>
            <Text style={styles.tipText}>
              Include key responsibilities, qualification and required skills
            </Text>
          </View>

          {/* Continue Button */}
          <TouchableOpacity 
            style={[styles.button, jobDescription.length === 0 && styles.buttonDisabled]} 
            onPress={handleContinue}
            disabled={jobDescription.length === 0}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
  formContainer: {
    marginBottom: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0F172A',
    marginBottom: 12,
  },
  inputWrapper: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    minHeight: 250,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: '#0F172A',
    lineHeight: 22,
  },
  charCountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  charCountText: {
    fontSize: 14,
    color: '#64748B',
  },
  veryGoodText: {
    fontSize: 14,
    color: '#22C55E', // Green color
    fontWeight: '500',
  },
  spacer: {
    flex: 1,
  },
  tipBox: {
    backgroundColor: '#E0F2E9', // Light greenish bg
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    marginTop: 24,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    marginLeft: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#0F172A',
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#183C6B',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#94A3B8',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
