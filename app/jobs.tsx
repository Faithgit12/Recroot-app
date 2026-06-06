import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BottomTabs from './_components/BottomTabs';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salaryRange: string;
  matchScore: string;
  logo: string;
}

const MOCK_ALL_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Product Designer',
    company: 'Air bnb',
    location: 'Remote',
    type: 'Full Time',
    salaryRange: '$120- $180',
    matchScore: '95% match',
    logo: 'logo-airbnb',
  },
  {
    id: '2',
    title: 'Senior Product Designer',
    company: 'Air bnb',
    location: 'Remote',
    type: 'Full Time',
    salaryRange: '$120- $180',
    matchScore: '95% match',
    logo: 'logo-airbnb',
  },
  {
    id: '3',
    title: 'Product Designer',
    company: 'Google',
    location: 'Applied 2 days ago', // Keeping the mock text from design
    type: 'Full Time',
    salaryRange: '',
    matchScore: '90% match',
    logo: 'logo-google',
  },
  {
    id: '4',
    title: 'Product Designer',
    company: 'Google',
    location: 'Applied 2 days ago',
    type: 'Full Time',
    salaryRange: '',
    matchScore: '90% match',
    logo: 'logo-google',
  },
  {
    id: '5',
    title: 'Product Designer',
    company: 'Google',
    location: 'Applied 2 days ago',
    type: 'Full Time',
    salaryRange: '',
    matchScore: '90% match',
    logo: 'logo-google',
  },
  {
    id: '6',
    title: 'Product Designer',
    company: 'Google',
    location: 'Applied 2 days ago',
    type: 'Full Time',
    salaryRange: '',
    matchScore: '90% match',
    logo: 'logo-google',
  }
];

const FILTERS = ['All', 'Remote', 'Full time', 'Part time'];

export default function JobsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search jobs..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={styles.filterContent}>
          {FILTERS.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[styles.filterChip, activeFilter === filter && styles.filterChipActive]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {MOCK_ALL_JOBS.map((job) => (
          <TouchableOpacity 
            key={job.id} 
            style={styles.jobCard}
            onPress={() => router.push({ pathname: '/job-details', params: { id: job.id, title: job.title, company: job.company, location: job.location } })}
          >
            <View style={styles.jobIconContainer}>
              {job.logo === 'logo-google' ? (
                <Ionicons name="logo-google" size={40} color="#DB4437" />
              ) : (
                <Ionicons name="aperture-outline" size={40} color="#FF5A5F" />
              )}
            </View>
            <View style={styles.jobDetails}>
              <Text style={styles.jobTitle} numberOfLines={1}>{job.title}</Text>
              <Text style={styles.jobSubText}>
                {job.company} {job.location ? `- ${job.location}` : ''}
              </Text>
              {!!job.salaryRange && (
                <Text style={styles.jobSubText}>{job.salaryRange}</Text>
              )}
            </View>
            <View style={styles.matchBadge}>
              <Text style={styles.matchText}>{job.matchScore}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <BottomTabs activeTab="jobs" />
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
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 48,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
  },
  filterScroll: {
    flexGrow: 0,
  },
  filterContent: {
    paddingRight: 24,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#D1D5DB', // Light gray background for inactive
    marginRight: 10,
  },
  filterChipActive: {
    backgroundColor: '#183C6B',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  scrollArea: {
    flex: 1,
    paddingHorizontal: 24,
  },
  jobCard: {
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
  jobIconContainer: {
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48,
  },
  jobDetails: {
    flex: 1,
    paddingRight: 8,
  },
  jobTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  jobSubText: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 18,
  },
  matchBadge: {
    backgroundColor: '#A7F3D0', // light green from design
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  matchText: {
    color: '#065F46', // darker green for text
    fontSize: 12,
    fontWeight: '500',
  }
});
