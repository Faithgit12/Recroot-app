import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Alert, ActivityIndicator, FlatList, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import { resumeService, Resume } from '../services/api/resumeService';

export default function ResumeScreen() {
  const router = useRouter();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const fetchResumes = async () => {
    try {
      setIsFetching(true);
      const data = await resumeService.getMyResumes();
      // Handle cases where backend wraps the array in an object
      const resumesArray = Array.isArray(data) ? data : ((data as any).resumes || (data as any).data || []);
      setResumes(resumesArray);
    } catch (error: any) {
      console.log('Failed to fetch resumes', error);
      Alert.alert("Error Fetching Resumes", error?.response?.data?.message || error.message);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        
        if (file.size && file.size > MAX_FILE_SIZE) {
          Alert.alert("File Too Large", "Please select a resume that is 5MB or smaller.");
        } else {
          handleUpload(file.uri, file.name, file.mimeType || 'application/pdf');
        }
      }
    } catch (err) {
      console.log('Error picking document:', err);
    }
  };

  const handleUpload = async (uri: string, name: string, mimeType: string) => {
    try {
      setIsUploading(true);
      await resumeService.uploadResume(uri, name, mimeType);
      Alert.alert("Success", "Your resume has been uploaded successfully.");
      fetchResumes(); // Refresh the list
    } catch (error: any) {
      Alert.alert("Upload Failed", error?.response?.data?.message || error.message || "An error occurred");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert("Delete Resume", "Are you sure you want to delete this resume?", [
      { text: "Cancel", style: "cancel" },
      { 
        text: "Delete", 
        style: "destructive", 
        onPress: async () => {
          try {
            await resumeService.deleteResume(id);
            fetchResumes(); // Refresh the list
          } catch (error: any) {
            Alert.alert("Error", "Failed to delete resume");
          }
        } 
      }
    ]);
  };

  const [openingId, setOpeningId] = useState<string | null>(null);

  const handleViewResume = async (item: Resume) => {
    const id = item._id || item.id;
    setOpeningId(id as string);
    let targetUrl = item.url || (item as any).fileUrl || (item as any).fileURL || (item as any).file_url || (item as any).resumeUrl || (item as any).path;
    
    if (!targetUrl) {
      try {
        if (id) {
          const detailed = await resumeService.getResumeById(id);
          targetUrl = detailed.url || (detailed as any).fileUrl || (detailed as any).fileURL || (detailed as any).file_url || (detailed as any).resumeUrl || (detailed as any).path;
        }
      } catch (err) {
        console.log("Could not fetch detailed resume", err);
      }
    }

    setOpeningId(null);

    if (targetUrl) {
      if (targetUrl.startsWith('/')) {
        targetUrl = `https://recroot-backend.onrender.com${targetUrl}`;
      }
      Linking.openURL(targetUrl).catch(() => {
        Alert.alert("Error", "Could not open this document. Format may be unsupported.");
      });
    } else {
      Alert.alert(
        "Not Available", 
        `File link is missing (fileUrl is ${String((item as any).fileUrl)}).\nAvailable fields: ${Object.keys(item).join(', ')}`
      );
    }
  };

  const renderItem = ({ item }: { item: Resume }) => (
    <TouchableOpacity 
      style={styles.resumeCard} 
      onPress={() => handleViewResume(item)}
      activeOpacity={0.7}
      disabled={openingId === (item._id || item.id)}
    >
      <View style={styles.resumeIcon}>
        {openingId === (item._id || item.id) ? (
          <ActivityIndicator size="small" color="#183C6B" />
        ) : (
          <Ionicons name="document-text" size={24} color="#183C6B" />
        )}
      </View>
      <View style={styles.resumeInfo}>
        <Text style={styles.resumeName} numberOfLines={1}>{(item as any).fileName || item.filename || item.name || 'Resume'}</Text>
        <Text style={styles.resumeDate}>
          {item.uploadedAt || (item as any).createdAt 
            ? new Date(item.uploadedAt || (item as any).createdAt).toLocaleDateString() 
            : 'Just now'}
        </Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item._id || item.id as string)}>
        <Ionicons name="trash-outline" size={20} color="#EF4444" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Resumes</Text>
      </View>

      <View style={styles.content}>
        {isFetching ? (
          <ActivityIndicator size="large" color="#183C6B" style={{ marginTop: 50 }} />
        ) : (
          <FlatList
            data={resumes}
            keyExtractor={(item) => item._id || item.id || Math.random().toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons name="document-text-outline" size={64} color="#CBD5E1" />
                <Text style={styles.emptyTitle}>No resumes found</Text>
                <Text style={styles.emptyDesc}>Upload your first resume to get started</Text>
              </View>
            }
          />
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.updateButton}
          onPress={handlePickDocument}
          disabled={isUploading}
        >
          {isUploading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.updateButtonText}>Upload New Resume</Text>
          )}
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
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 12,
  },
  resumeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  resumeIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#EEF3F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  resumeInfo: {
    flex: 1,
  },
  resumeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 4,
  },
  resumeDate: {
    fontSize: 12,
    color: '#64748B',
  },
  deleteButton: {
    padding: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
    marginTop: 16,
  },
  emptyDesc: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 8,
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
  updateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  }
});
