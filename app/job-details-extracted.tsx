import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ExtractedJobDetails, matchResumeToJob } from '../services/aiExtractionService';

export default function JobDetailsExtractedScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { confirmedDetails, jobDescription } = params;

  const [details, setDetails] = useState<ExtractedJobDetails>({
    jobTitle: '',
    experience: '',
    jobType: '',
    skills: '',
    location: '',
    keySkills: [],
  });
  const [isMatching, setIsMatching] = useState(false);

  useEffect(() => {
    if (confirmedDetails) {
      try {
        const parsed = JSON.parse(confirmedDetails as string);
        setDetails(parsed);
      } catch (e) {
        console.error("Failed to parse confirmed details");
      }
    }
  }, [confirmedDetails]);

  const handleContinue = async () => {
    setIsMatching(true);
    try {
      // Use some mock resume text for now since we don't have the user's resume in context.
      // In a real app, this would be fetched from applicationStorage or context.
      const mockResumeText = "Experienced product designer..."; 
      
      const matchResult = await matchResumeToJob(mockResumeText, details);
      
      router.push({
        pathname: '/match-score',
        params: {
          matchResult: JSON.stringify(matchResult)
        }
      });
    } catch (error) {
      console.error("Matching failed", error);
    } finally {
      setIsMatching(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#0F172A" />
          </TouchableOpacity>
        </View>

        {/* Title & Subtitle */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Job Details Extracted</Text>
          <Text style={styles.subtitle}>We have extracted the following information</Text>
        </View>

        {/* Read-only Cards */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Job Title</Text>
          <Text style={styles.cardValue}>{details.jobTitle}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Experience</Text>
          <Text style={styles.cardValue}>{details.experience}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Job Type</Text>
          <Text style={styles.cardValue}>{details.jobType}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Skills</Text>
          <Text style={styles.cardValue}>{details.skills}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Location</Text>
          <Text style={styles.cardValue}>{details.location || 'Not Specified'}</Text>
        </View>

        {/* Key Skills Tags */}
        <View style={styles.keySkillsContainer}>
          <Text style={styles.keySkillsTitle}>Key Skills</Text>
          <View style={styles.tagsWrapper}>
            {details.keySkills.map((skill, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.spacer} />

        {/* Continue Button */}
        <TouchableOpacity 
          style={[styles.button, isMatching && styles.buttonDisabled]} 
          onPress={handleContinue}
          disabled={isMatching}
        >
          <Text style={styles.buttonText}>{isMatching ? 'Matching...' : 'Continue'}</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
    flexGrow: 1,
  },
  header: {
    marginBottom: 24,
  },
  backButton: {
    padding: 4,
    marginLeft: -4,
  },
  titleContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#0F172A',
  },
  card: {
    backgroundColor: '#F1F5F9', // light gray-blue background
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#183C6B', // Dark blue label
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 15,
    color: '#0F172A',
  },
  keySkillsContainer: {
    marginTop: 8,
    marginBottom: 24,
  },
  keySkillsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  tagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  tagText: {
    color: '#183C6B',
    fontSize: 14,
    fontWeight: '500',
  },
  spacer: {
    flex: 1,
    minHeight: 20,
  },
  button: {
    backgroundColor: '#183C6B',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#94A3B8',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
