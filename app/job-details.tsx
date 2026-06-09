import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { resumeService } from '../services/api/resumeService';
import { scoringService } from '../services/api/scoringService';
import { ActivityIndicator, Alert } from 'react-native';
export default function JobDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState('About');

  // We can use passed params or fallback to mock data
  const title = params.title || 'Senior Product Designer';
  const company = params.company || 'Air bnb';
  const location = params.location || 'Remote';
  const jobId = params.id || '1';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.tabsContainer}>
          {['About', 'Requirements', 'Company'].map((tab) => (
            <TouchableOpacity 
              key={tab} 
              style={[styles.tabButton, activeTab === tab && styles.tabButtonActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollArea}>
          <View style={styles.cardContainer}>
            {activeTab === 'About' && (
              <View>
                <Text style={styles.sectionTitle}>About the Role</Text>
                <Text style={styles.descriptionText}>
                  We are looking for a senior product designer to join our team and help design enhancing products for million of users. You will work closely with product managers and engineers to craft experiences that are intuitive and beautiful.
                </Text>
              </View>
            )}
            {activeTab === 'Requirements' && (
              <View>
                <Text style={styles.sectionTitle}>Requirements</Text>
                <Text style={styles.descriptionText}>
                  • 5+ years of experience in product design.{'\n'}
                  • Strong portfolio showcasing user-centered design.{'\n'}
                  • Proficiency in Figma and other design tools.
                </Text>
              </View>
            )}
            {activeTab === 'Company' && (
              <View>
                <Text style={styles.sectionTitle}>About {company}</Text>
                <Text style={styles.descriptionText}>
                  {company} is a global company that connects people with unique experiences and accommodations around the world.
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.applyButton}
          onPress={() => router.push({ pathname: '/apply-job', params: { id: jobId, title, company, location } })}
        >
          <Text style={styles.applyButtonText}>Apply Now</Text>
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
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  content: {
    flex: 1,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tabButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabButtonActive: {
    borderBottomColor: '#183C6B',
  },
  tabText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#1A1A1A',
    fontWeight: '600',
  },
  scrollArea: {
    flex: 1,
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    borderRadius: 12,
    padding: 24,
    minHeight: 250,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 24,
  },
  footer: {
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 34 : 24,
    backgroundColor: '#EEF3F9',
  },
  applyButton: {
    backgroundColor: '#183C6B',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  }
});
