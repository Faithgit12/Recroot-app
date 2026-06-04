import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { styles as globalStyles } from './styles';
import { Ionicons } from '@expo/vector-icons';

export default function UploadResumeScreen() {
  const router = useRouter();
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleChooseFile = () => {
    // In a real app, you would use expo-document-picker here
    // For this UI mockup, we just toggle the state
    setFileUploaded(true);
  };

  const handleContinue = () => {
    router.push('/profile/success');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EEF3F9' }}>
      <ScrollView style={globalStyles.container} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={globalStyles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>

        <Text style={[globalStyles.title, { textAlign: 'left', fontSize: 20, marginBottom: 4 }]}>Upload your resume</Text>
        <Text style={[globalStyles.subtitle, { textAlign: 'left', marginBottom: 24 }]}>Upload your resume to get started</Text>

        <View style={styles.uploadArea}>
          {!fileUploaded ? (
            <View style={styles.uploadContent}>
              <Text style={styles.uploadText}>Drag & drop your file here</Text>
              <Text style={styles.orText}>Or</Text>
              <TouchableOpacity style={styles.chooseFileButton} onPress={handleChooseFile}>
                <Text style={styles.chooseFileButtonText}>Choose File</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.fileUploadedContent}>
              <View style={styles.fileInfoRow}>
                <View style={styles.pdfIcon}>
                  <Text style={styles.pdfIconText}>PDF</Text>
                </View>
                <View style={styles.fileDetails}>
                  <Text style={styles.fileName}>Alex_Joshua_Resume.pdf</Text>
                  <Text style={styles.fileSize}>2.5 MB</Text>
                </View>
              </View>
              <Ionicons name="checkmark-circle-outline" size={24} color="#10B981" />
            </View>
          )}
        </View>

        <Text style={styles.formatInfo}>Supported format: PDF,DOC (Max 5MB)</Text>

        <View style={styles.secureCard}>
          <Ionicons name="lock-closed-outline" size={20} color="#1A1A1A" style={styles.secureIcon} />
          <Text style={styles.secureText}>
            Your data is secure and confidential.{'\n'}We'll never share your information.
          </Text>
        </View>

        <TouchableOpacity style={globalStyles.button} onPress={handleContinue}>
          <Text style={globalStyles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  uploadArea: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    marginBottom: 8,
  },
  uploadContent: {
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '500',
    marginBottom: 12,
  },
  orText: {
    fontSize: 14,
    color: '#1A1A1A',
    marginBottom: 12,
  },
  chooseFileButton: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  chooseFileButtonText: {
    color: '#183C6B',
    fontSize: 16,
    fontWeight: '500',
  },
  fileUploadedContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 16,
  },
  fileInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pdfIcon: {
    backgroundColor: '#EF4444',
    borderRadius: 4,
    padding: 4,
    marginRight: 12,
  },
  pdfIconText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  fileDetails: {
    justifyContent: 'center',
  },
  fileName: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  fileSize: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  formatInfo: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 24,
  },
  secureCard: {
    backgroundColor: '#D1FAE5',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  secureIcon: {
    marginRight: 12,
  },
  secureText: {
    fontSize: 13,
    color: '#1A1A1A',
    flex: 1,
    lineHeight: 18,
  },
});
