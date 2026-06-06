import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';

export default function ResumeScreen() {
  const router = useRouter();
  const [selectedFileName, setSelectedFileName] = useState("Alex_Joshua_Resume.pdf");
  const [fileSizeError, setFileSizeError] = useState(false);
  
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        
        if (file.size && file.size > MAX_FILE_SIZE) {
          setFileSizeError(true);
          Alert.alert("File Too Large", "Please select a resume that is 5MB or smaller.");
        } else {
          setFileSizeError(false);
          setSelectedFileName(file.name);
        }
      }
    } catch (err) {
      console.log('Error picking document:', err);
    }
  };

  const handleUpdate = () => {
    if (fileSizeError) {
      return;
    }
    
    // Perform update action here (e.g., API call)
    console.log("Updating profile resume to:", selectedFileName);
    
    Alert.alert(
      "Success", 
      "Your resume has been updated.",
      [{ text: "OK", onPress: () => router.push('/home') }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Update Resume</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Upload a new resume to your profile. Future applications will use this resume by default.
        </Text>

        <View style={styles.uploadCard}>
          <View style={styles.iconContainer}>
            <Ionicons name="document-text" size={32} color="#EF4444" />
          </View>
          <Text style={styles.fileName}>{selectedFileName}</Text>
          <TouchableOpacity style={styles.changeButton} onPress={handlePickDocument}>
            <Text style={styles.changeButtonText}>Select File</Text>
          </TouchableOpacity>
        </View>
        
        {fileSizeError && (
          <Text style={styles.errorText}>File size exceeds 5MB limit.</Text>
        )}
      </View>

      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.updateButton, fileSizeError && styles.updateButtonDisabled]}
          onPress={handleUpdate}
          disabled={fileSizeError}
        >
          <Text style={styles.updateButtonText}>Update Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF3F9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 10 : 30,
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginLeft: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  description: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 32,
    lineHeight: 22,
  },
  uploadCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    marginBottom: 16,
  },
  fileName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
    marginBottom: 24,
    textAlign: 'center',
  },
  changeButton: {
    backgroundColor: '#EEF3F9',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  changeButtonText: {
    color: '#183C6B',
    fontWeight: '600',
    fontSize: 15,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    marginTop: 16,
    textAlign: 'center',
  },
  footer: {
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 34 : 24,
  },
  updateButton: {
    backgroundColor: '#183C6B',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  updateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  }
});
