import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, TextInput, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BottomTabs from './_components/BottomTabs';
import { jobService } from '../services/api/jobService';

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

const FILTERS = ['All', 'Remote', 'Full time', 'Part time'];

export default function JobsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const data = await jobService.getJobs();
        if (data && data.length > 0) {
          const mappedJobs = data.map((j: any) => ({
            id: j._id || j.id || Math.random().toString(),
            title: j.title || 'Unknown Title',
            company: 'Tech Corp', // placeholder since backend job model might not have company
            location: 'Remote',
            type: 'Full Time',
            salaryRange: 'Competitive',
            matchScore: 'New',
            logo: 'logo-airbnb'
          }));
          setJobs(mappedJobs);
        }
      } catch (err) {
        console.log("Failed to fetch jobs:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => 
    (activeFilter === 'All' || job.type.toLowerCase().includes(activeFilter.toLowerCase()) || job.location.toLowerCase().includes(activeFilter.toLowerCase())) &&
    (job.title.toLowerCase().includes(searchQuery.toLowerCase()) || job.company.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
        {isLoading ? (
          <ActivityIndicator size="large" color="#183C6B" style={{ marginTop: 40 }} />
        ) : filteredJobs.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 40, color: '#6B7280' }}>No jobs found.</Text>
        ) : (
          filteredJobs.map((job) => (
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
          ))
        )}
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
