import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ExtractedJobDetails, matchResumeToJob } from '../services/aiExtractionService';
import { resumeService } from '../services/api/resumeService';
import { scoringService } from '../services/api/scoringService';
import { useMatchStore } from '../store/matchStore';
import { Alert } from 'react-native';
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
      const resumesData = await resumeService.getMyResumes();
      const resumesList = Array.isArray(resumesData) ? resumesData : ((resumesData as any).resumes || (resumesData as any).data || []);
      
      if (resumesList.length === 0) {
        Alert.alert("No Resume Found", "Please upload a resume first before calculating a match score.");
        setIsMatching(false);
        return;
      }

      const resumeId = resumesList[0]._id || resumesList[0].id;
      
      // Call actual backend scoring service
      const payload = {
        resumeId: resumeId as string,
        jobDescription: (jobDescription || confirmedDetails || '') as string
      };
      console.log("Sending scoring payload:", JSON.stringify({ resumeId: payload.resumeId, jobDescLength: payload.jobDescription.length }));
      
      const scoringResponse = await scoringService.score(payload);
      console.log("Received scoring response:", JSON.stringify(scoringResponse, null, 2));

      // The backend scoring returns { data: { matchScore: number, feedback: string, matchedSkills: [], missingSkills: [] } }
      const responseData = scoringResponse.data || (scoringResponse as any);
      const backendScore = responseData.matchScore ?? 0;

      const matchResult = {
        overallScore: backendScore,
        skillsMatch: backendScore, // Backend doesn't provide granular scores, so we mirror the main score
        qualificationMatch: backendScore,
        experienceMatch: backendScore,
        educationMatch: backendScore,
        overallFit: backendScore,
        missingSkills: responseData.missingSkills || [],
        matchedSkills: responseData.matchedSkills || [],
        feedback: responseData.feedback || '',
        jobTitle: details.jobTitle
      };

      useMatchStore.getState().setRecentMatch(matchResult);

      router.push({
        pathname: '/match-score',
        params: {
          matchResult: JSON.stringify(matchResult)
        }
      });
    } catch (error: any) {
      console.error("Matching failed", error);
      Alert.alert("Match Failed", error?.response?.data?.message || error.message || "Could not score resume.");
    } finally {
      setIsMatching(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#0F172A" />
          </TouchableOpacity>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Job Details Extracted</Text>
          <Text style={styles.subtitle}>We have extracted the following information</Text>
        </View>

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

        <TouchableOpacity 
          style={[styles.button, isMatching && styles.buttonDisabled]} 
          onPress={handleContinue}
          disabled={isMatching}
        >
          <Text style={styles.buttonText}>{isMatching ? 'Matching...' : 'Continue'}</Text>
        </TouchableOpacity>

      </ScrollView>
      </KeyboardAvoidingView>
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
