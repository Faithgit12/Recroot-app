import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, TextInput, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import { saveApplication } from '../services/applicationStorage';

export default function ApplyJobScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const title = params.title || 'Senior Product Designer';
  const company = params.company || 'Air bnb';
  const location = params.location || 'Remote';
  const jobId = params.id || '1';

  const [coverLetter, setCoverLetter] = useState('');
  
  // State for the resume picked from profile setup
  const [resumeFileName, setResumeFileName] = useState("Alex_Joshua_Resume.pdf");

  const handleSubmitApplication = async () => {
    // Code the input and submission of the candidate for the use in a recruiters dashboard that would be created later
    const applicationData = {
      jobId: jobId as string,
      jobTitle: title as string,
      company: company as string,
      applicantId: 'user-123', // Mock user ID
      resume: resumeFileName,
      coverLetter,
      submittedAt: new Date().toISOString()
    };
    
    console.log("Submitting Application Data to Recruiter Dashboard:", applicationData);
    
    // Save to device storage
    await saveApplication(applicationData);
    
    // Check if resume changed and route to success screen with param
    const resumeChanged = resumeFileName !== "Alex_Joshua_Resume.pdf";
    router.push({
      pathname: '/application-success',
      params: { resumeChanged: resumeChanged ? 'true' : 'false' }
    });
  };

  const handleChangeResume = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setResumeFileName(result.assets[0].name);
      }
    } catch (err) {
      console.log('Error picking document:', err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.pageTitle}>Apply for</Text>
          <Text style={styles.jobTitle}>{title}</Text>
          <Text style={styles.companyText}>{company} - {location}</Text>

          {/* Resume Section */}
          <Text style={styles.sectionHeader}>Resume</Text>
          <View style={styles.resumeCard}>
            <View style={styles.resumeIconContainer}>
              <Ionicons name="document-text" size={24} color="#EF4444" />
            </View>
            <Text style={styles.resumeName} numberOfLines={1}>{resumeFileName}</Text>
            <TouchableOpacity onPress={handleChangeResume}>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>

          {/* Cover Letter Section */}
          <Text style={styles.sectionHeader}>Cover Letter</Text>
          <View style={styles.coverLetterContainer}>
            <TextInput
              style={styles.coverLetterInput}
              placeholder="Add a cover letter (optional)"
              placeholderTextColor="#9CA3AF"
              multiline
              textAlignVertical="top"
              value={coverLetter}
              onChangeText={setCoverLetter}
            />
          </View>
        </ScrollView>

        {/* Fixed Submit Button */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleSubmitApplication}
          >
            <Text style={styles.submitButtonText}>Submit Application</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF3F9',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 10 : 30,
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
    alignSelf: 'flex-start',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  jobTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  companyText: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 32,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  resumeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  resumeIconContainer: {
    marginRight: 12,
  },
  resumeName: {
    flex: 1,
    fontSize: 15,
    color: '#1A1A1A',
  },
  changeText: {
    fontSize: 14,
    color: '#183C6B',
    fontWeight: '500',
  },
  coverLetterContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    height: 250,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    marginBottom: 24,
  },
  coverLetterInput: {
    flex: 1,
    fontSize: 15,
    color: '#1A1A1A',
  },
  footer: {
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 34 : 24,
    backgroundColor: '#EEF3F9',
  },
  submitButton: {
    backgroundColor: '#183C6B',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  }
});
