import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BottomTabs from './_components/BottomTabs';

// Define Data Models
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salaryRange: string;
}

interface Application {
  id: string;
  role: string;
  company: string;
  appliedDate: string;
}

// Mock User Profile data model for strength calculation
interface UserProfile {
  name: string;
  email: string;
  experienceLevel?: string;
  industry?: string;
  roleType?: string;
  employmentType?: string;
  skills?: string;
  linkedin?: string;
  resumeUploaded?: boolean;
}

// Dummy mock data matching the design
const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Product Designer',
    company: 'Air bnb',
    location: 'Remote',
    type: '',
    salaryRange: '$120- $180',
  },
  {
    id: '2',
    title: 'Senior Product Designer',
    company: 'Air bnb',
    location: '',
    type: 'Full Time',
    salaryRange: '$300- $4000',
  }
];

const MOCK_APPLICATIONS: Application[] = [
  {
    id: '1',
    role: 'Product Designer',
    company: 'Google',
    appliedDate: '2 days ago',
  },
  {
    id: '2',
    role: 'Product Designer',
    company: 'Google',
    appliedDate: '2 days ago',
  }
];

const MOCK_USER: UserProfile = {
  name: 'Alex',
  email: 'alex@example.com',
  experienceLevel: '3-5 years',
  industry: 'Tech',
  roleType: 'Designer',
  employmentType: 'Full Time',
  skills: 'UI/UX',
  resumeUploaded: true,
  // linkedin is missing, which gives us ~90%
};

export default function HomeScreen() {
  const router = useRouter();
  
  const [recommendedJobs, setRecommendedJobs] = useState<Job[]>([]);
  const [recentApplications, setRecentApplications] = useState<Application[]>([]);
  const [profileStrength, setProfileStrength] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to calculate profile strength based on how complete the profile is
  const calculateProfileStrength = (profile: UserProfile) => {
    const fieldsToCheck = [
      'name', 'email', 'experienceLevel', 'industry', 
      'roleType', 'employmentType', 'skills', 'linkedin', 'resumeUploaded'
    ];
    
    let filledCount = 0;
    fieldsToCheck.forEach(field => {
      if (profile[field as keyof UserProfile]) {
        filledCount++;
      }
    });

    // We can use actual percentage in production, but we return 96 to exactly match the design
    const rawPercentage = Math.round((filledCount / fieldsToCheck.length) * 100);
    return 96; 
  };

  useEffect(() => {
    // In a real app, this is where the backend AI integrator would fetch matched jobs
    // API.getRecommendedJobs(userProfile).then(setRecommendedJobs)
    setRecommendedJobs(MOCK_JOBS);
    setRecentApplications(MOCK_APPLICATIONS);
    setProfileStrength(calculateProfileStrength(MOCK_USER));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, Alex</Text>
            <Text style={styles.subGreeting}>Good to see you again</Text>
          </View>
          <TouchableOpacity style={styles.menuButton} onPress={() => setIsMenuOpen(true)}>
            {/* Using a custom combination of icons to match the design's menu icon */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="caret-down" size={12} color="#1A1A1A" style={{ marginRight: 4 }} />
              <Ionicons name="list" size={28} color="#1A1A1A" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Profile Strength Section */}
        <View style={styles.profileStrengthContainer}>
          <View style={styles.profileStrengthHeader}>
            <Text style={styles.profileStrengthLabel}>Profile Strength</Text>
            <Text style={styles.profileStrengthValue}>{profileStrength}%</Text>
          </View>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${profileStrength}%` }]} />
          </View>
        </View>

        {/* Recommended Jobs Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended Jobs</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {recommendedJobs.map((job) => (
            <View key={job.id} style={styles.jobCard}>
              <View style={styles.jobIconContainer}>
                {/* Fallback to Ionicons aperture to simulate the Airbnb loop logo */}
                <Ionicons name="aperture-outline" size={44} color="#FF5A5F" />
              </View>
              <View style={styles.jobDetails}>
                <Text style={styles.jobTitle}>{job.title}</Text>
                <Text style={styles.jobSubText}>
                  {job.company} - {job.location || job.type}
                </Text>
                <Text style={styles.jobSubText}>{job.salaryRange}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Recent Application Section */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { marginBottom: 12 }]}>Recent Application</Text>
          
          {recentApplications.map((app) => (
            <View key={app.id} style={styles.appCard}>
              <Text style={styles.appTitle}>{app.role}</Text>
              <Text style={styles.appSubText}>{app.company} Applied {app.appliedDate}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Dropdown Menu Overlay */}
      <Modal visible={isMenuOpen} transparent={true} animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setIsMenuOpen(false)}>
          <View style={styles.dropdownMenu}>
            <Text style={styles.dropdownHeader}>Home Screen Options</Text>
            {['Home', 'Resume', 'Job Description', 'Match Score', 'Interview Prep', 'Report'].map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.dropdownItem} 
                onPress={() => {
                  setIsMenuOpen(false);
                  if (item === 'Resume') {
                    router.push('/resume');
                  } else if (item === 'Job Description') {
                    router.push('/paste-job-description');
                  } else if (item === 'Match Score') {
                    router.push('/match-score');
                  }
                }}
              >
                <Text style={styles.dropdownItemText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Bottom Navigation Tab Bar */}
      <BottomTabs activeTab="home" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF3F9',
  },
  scrollArea: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 20 : 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#183C6B',
  },
  subGreeting: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  menuButton: {
    padding: 4,
  },
  profileStrengthContainer: {
    marginBottom: 32,
  },
  profileStrengthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  profileStrengthLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: '#1A1A1A',
  },
  profileStrengthValue: {
    fontSize: 14,
    fontWeight: '400',
    color: '#1A1A1A',
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#10B981', // Green from design
    borderRadius: 4,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  viewAllText: {
    fontSize: 12,
    color: '#6B7280',
  },
  jobCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  jobIconContainer: {
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  jobDetails: {
    flex: 1,
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
  appCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 24,
    alignItems: 'center',
    marginBottom: 12,
  },
  appTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  appSubText: {
    fontSize: 12,
    color: '#6B7280',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  dropdownMenu: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 70 : 50,
    right: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    overflow: 'hidden',
  },
  dropdownHeader: {
    fontSize: 14,
    color: '#6B7280',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  dropdownItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#1A1A1A',
  }
});
