import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { styles as globalStyles } from '../../components/profile/styles';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { resumeService } from '../../services/api/resumeService';

type SelectedFile = {
  uri: string;
  name: string;
  size: number;
  type: string;
};

export default function UploadResumeScreen() {
  const router = useRouter();
  const [fileUploaded, setFileUploaded] = useState<SelectedFile | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleChooseFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        
        const MAX_SIZE = 5 * 1024 * 1024;
        
        if (file.size && file.size > MAX_SIZE) {
          Alert.alert("File Too Large", "The selected file exceeds the maximum 5MB limit. Please choose a smaller file.");
          return;
        }

        setFileUploaded({
          uri: file.uri,
          name: file.name,
          size: file.size || 0,
          type: file.mimeType || 'application/pdf', // fallback if unknown
        });
      }
    } catch (err) {
      console.error("Error picking document", err);
      Alert.alert("Error", "There was a problem picking your document.");
    }
  };

  const handleContinue = async () => {
    if (fileUploaded && fileUploaded.uri) {
      try {
        setIsUploading(true);
        await resumeService.uploadResume(fileUploaded.uri, fileUploaded.name, fileUploaded.type);
      } catch (err: any) {
        setIsUploading(false);
        Alert.alert("Upload Failed", err?.response?.data?.message || err.message || "There was a problem uploading your resume.");
        return;
      }
    }
    setIsUploading(false);
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
                <View style={[styles.pdfIcon, { backgroundColor: fileUploaded.type.includes('word') || fileUploaded.name.endsWith('.doc') || fileUploaded.name.endsWith('.docx') ? '#2B579A' : '#EF4444' }]}>
                  <Text style={styles.pdfIconText}>{fileUploaded.type.includes('word') || fileUploaded.name.endsWith('.doc') || fileUploaded.name.endsWith('.docx') ? 'DOC' : 'PDF'}</Text>
                </View>
                <View style={styles.fileDetails}>
                  <Text style={styles.fileName} numberOfLines={1} ellipsizeMode="middle">{fileUploaded.name.length > 25 ? fileUploaded.name.substring(0, 25) + '...' : fileUploaded.name}</Text>
                  <Text style={styles.fileSize}>{(fileUploaded.size / (1024 * 1024)).toFixed(2)} MB</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => setFileUploaded(null)}>
                <Ionicons name="close-circle-outline" size={24} color="#EF4444" />
              </TouchableOpacity>
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

        <TouchableOpacity 
          style={[globalStyles.button, isUploading && { opacity: 0.7 }]} 
          onPress={handleContinue}
          disabled={isUploading}
        >
          <Text style={globalStyles.buttonText}>{isUploading ? 'Uploading...' : 'Continue'}</Text>
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
