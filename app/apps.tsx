import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useFocusEffect } from 'expo-router';
import BottomTabs from './_components/BottomTabs';
import { getApplications, SavedApplication } from '../services/applicationStorage';
import { Ionicons } from '@expo/vector-icons';

export default function AppsScreen() {
  const [applications, setApplications] = useState<SavedApplication[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchApplications = async () => {
    const data = await getApplications();
    setApplications(data);
  };

  useFocusEffect(
    useCallback(() => {
      fetchApplications();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchApplications();
    setRefreshing(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Applications</Text>
        <Text style={styles.subtitle}>Track your recent applications</Text>
      </View>
      
      <ScrollView 
        style={styles.scrollArea} 
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {applications.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={48} color="#9CA3AF" />
            <Text style={styles.emptyText}>No applications yet.</Text>
            <Text style={styles.emptySubtext}>When you apply for jobs, they will appear here.</Text>
          </View>
        ) : (
          applications.map((app, index) => (
            <View key={index} style={styles.appCard}>
              <View style={styles.appIconContainer}>
                {app.company.toLowerCase() === 'google' ? (
                  <Ionicons name="logo-google" size={40} color="#DB4437" />
                ) : (
                  <Ionicons name="aperture-outline" size={40} color="#FF5A5F" />
                )}
              </View>
              <View style={styles.appDetails}>
                <Text style={styles.appTitle}>{app.jobTitle}</Text>
                <Text style={styles.appSubText}>{app.company}</Text>
                <Text style={styles.appDateText}>Applied {formatDate(app.submittedAt)}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <BottomTabs activeTab="apps" />
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
    paddingTop: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#183C6B',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  scrollArea: {
    flex: 1,
    paddingHorizontal: 24,
  },
  emptyContainer: {
    marginTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  appCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  appIconContainer: {
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48,
  },
  appDetails: {
    flex: 1,
  },
  appTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  appSubText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  appDateText: {
    fontSize: 12,
    color: '#9CA3AF',
  }
});
