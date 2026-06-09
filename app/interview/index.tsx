import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';
import { useAppStore } from '../../store/appStore';
import { resumeService } from '../../services/api/resumeService';
import { interviewService, InterviewSession } from '../../services/api/interviewService';
import { useMatchStore } from '../../store/matchStore';

export default function InterviewScreen() {
  const router = useRouter();
  const [selectedMode, setSelectedMode] = useState<string>('Combined');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const recentMatch = useMatchStore(state => state.recentMatch);
  
  const [jobRole, setJobRole] = useState(recentMatch?.jobTitle || '');
  const [jobDescription, setJobDescription] = useState('');
  
  const [sessions, setSessions] = useState<InterviewSession[]>([]);
  const [isLoadingSessions, setIsLoadingSessions] = useState(true);

  const overallProgress = useAppStore(state => state.overallProgress);
  const setOverallProgress = useAppStore(state => state.setOverallProgress);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const data = await interviewService.getInterviews();
      // Assume API returns an array, optionally sort by newest
      setSessions(Array.isArray(data) ? data : ((data as any).data || []));
    } catch (error) {
      console.error("Failed to fetch interviews", error);
    } finally {
      setIsLoadingSessions(false);
    }
  };

  const modes = [
    {
      id: 'Combined',
      title: 'Combined',
      subtitle: 'Questions based on Resume & Job',
      icon: 'layers-outline'
    },
    {
      id: 'Resume Based',
      title: 'Resume Based',
      subtitle: 'Questions purely on your experience',
      icon: 'document-text-outline'
    },
    {
      id: 'Job Based',
      title: 'Job Based',
      subtitle: 'Questions focused on the specific role',
      icon: 'business-outline'
    }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    try {
      const payload: any = {};
      
      // The backend STRICTLY requires a valid resumeId to not throw "resume not found"
      const resumesData = await resumeService.getMyResumes();
      const resumes = Array.isArray(resumesData) ? resumesData : ((resumesData as any).data || []);
      payload.resumeId = resumes.length > 0 ? (resumes[0]._id || resumes[0].id) : undefined;
      
      if (selectedMode === 'Resume Based') {
        // Focus on Resume by sending generic Job values so the AI only talks about the resume
        payload.jobRole = "General Professional";
        payload.jobDescription = "General interview focusing purely on the candidate's past experience, skills, and resume.";
      } else {
        // Combined or Job Based
        payload.jobRole = jobRole.trim() || 'Software Engineer';
        payload.jobDescription = jobDescription.trim() || 'Seeking an experienced professional with deep knowledge of the domain.';
      }

      const session = await interviewService.generate(payload);

      setOverallProgress(Math.min(overallProgress + 5, 100));
      
      fetchSessions();
      
      router.push({
        pathname: '/report/export',
        params: {
          type: 'Interview Prep Report',
          questions: JSON.stringify(session.questions)
        }
      });
    } catch (error: any) {
      Alert.alert("Generation Failed", error?.response?.data?.message || error.message || "Could not generate interview questions");
    } finally {
      setIsGenerating(false);
    }
  };

  const size = 100;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (overallProgress / 100) * circumference;

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1, backgroundColor: '#F8FAFC' }} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        
        <Text style={styles.pageTitle}>Practice and ace your interviews</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll} contentContainerStyle={styles.modesContainer}>
          {modes.map((mode) => (
            <TouchableOpacity 
              key={mode.id} 
              style={[
                styles.modeCard,
                selectedMode === mode.id && styles.modeCardSelected
              ]}
              onPress={() => setSelectedMode(mode.id)}
            >
              <View style={styles.modeIconContainer}>
                <Ionicons 
                  name={mode.icon as any} 
                  size={24} 
                  color={selectedMode === mode.id ? '#183C6B' : '#94A3B8'} 
                />
              </View>
              <Text style={styles.modeTitle}>{mode.title}</Text>
              <Text style={styles.modeSubtitle}>{mode.subtitle}</Text>
              
              <View style={styles.radioContainer}>
                {selectedMode === mode.id ? (
                  <Ionicons name="checkmark-circle" size={24} color="#183C6B" />
                ) : (
                  <Ionicons name="ellipse-outline" size={24} color="#CBD5E1" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {selectedMode !== 'Resume Based' && (
          <View style={styles.jobDetailsContainer}>
            <View style={styles.jobFieldRow}>
              <Text style={styles.jobFieldLabel}>Job Title</Text>
              <TextInput 
                style={styles.jobFieldInput}
                value={jobRole}
                onChangeText={setJobRole}
                placeholder="e.g. Senior Product Designer"
                placeholderTextColor="#94A3B8"
              />
            </View>
            <View style={[styles.jobFieldRow, { alignItems: 'flex-start' }]}>
              <Text style={[styles.jobFieldLabel, { marginTop: 8 }]}>Job Description</Text>
              <TextInput 
                style={[styles.jobFieldInput, { minHeight: 60, textAlignVertical: 'top' }]}
                value={jobDescription}
                onChangeText={setJobDescription}
                placeholder="Paste job description here..."
                placeholderTextColor="#94A3B8"
                multiline
              />
            </View>
          </View>
        )}

        <View style={styles.bottomCardsContainer}>
          <View style={styles.progressCard}>
            <Text style={styles.cardTitle}>Your Progress</Text>
            
            <View style={styles.progressCircleContainer}>
              <Svg width={size} height={size}>
                <Circle stroke="#F1F5F9" fill="none" cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} />
                <Circle
                  stroke="#22C55E"
                  fill="none"
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  rotation="-90"
                  origin={`${size / 2}, ${size / 2}`}
                />
              </Svg>
              <View style={styles.progressTextContainer}>
                <Text style={styles.progressText}>{overallProgress}%</Text>
              </View>
            </View>
            
            <Text style={styles.cardSubtitle}>Overall Progress</Text>
          </View>

          <View style={styles.sessionsCard}>
            <Text style={styles.cardTitle}>Recent Sessions</Text>
            
            <ScrollView showsVerticalScrollIndicator={false} style={styles.sessionsList}>
              {isLoadingSessions ? (
                <ActivityIndicator size="small" color="#183C6B" style={{ marginTop: 20 }} />
              ) : sessions.length === 0 ? (
                <Text style={styles.emptyText}>No sessions yet</Text>
              ) : (
                sessions.slice(0, 10).map((session) => {
                  const dateStr = session.createdAt 
                    ? new Date(session.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) 
                    : 'Recently';
                  
                  return (
                    <View key={session._id || session.id || Math.random().toString()} style={styles.sessionRow}>
                      <Text style={styles.sessionType} numberOfLines={1}>{session.jobRole || 'Interview'}</Text>
                      <Text style={styles.sessionDate}>{dateStr}</Text>
                    </View>
                  );
                })
              )}
            </ScrollView>
          </View>
        </View>

        <View style={styles.spacer} />

        <TouchableOpacity 
          style={[styles.button, isGenerating && styles.buttonDisabled]} 
          onPress={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Generate Questions</Text>
          )}
        </TouchableOpacity>

      </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginLeft: -8,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 20,
  },
  horizontalScroll: {
    marginHorizontal: -24,
    marginBottom: 24,
  },
  modesContainer: {
    paddingHorizontal: 24,
    gap: 16,
  },
  modeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: 150,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  modeCardSelected: {
    borderColor: '#183C6B',
  },
  modeIconContainer: {
    marginBottom: 16,
  },
  modeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 8,
  },
  modeSubtitle: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 16,
  },
  radioContainer: {
    marginTop: 'auto',
  },
  jobDetailsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  jobFieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  jobFieldLabel: {
    fontSize: 14,
    color: '#475569',
  },
  jobFieldValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0F172A',
  },
  jobFieldInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#0F172A',
    textAlign: 'right',
    marginLeft: 16,
  },
  uploadedRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomCardsContainer: {
    flexDirection: 'row',
    gap: 16,
    height: 180,
  },
  progressCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  sessionsCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 'auto',
  },
  progressCircleContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  progressTextContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
  },
  sessionsList: {
    flex: 1,
  },
  sessionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sessionType: {
    flex: 1,
    fontSize: 12,
    color: '#0F172A',
    fontWeight: '500',
    marginRight: 8,
  },
  sessionDate: {
    fontSize: 12,
    color: '#64748B',
  },
  emptyText: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 20,
  },
  spacer: {
    height: 32,
  },
  button: {
    backgroundColor: '#183C6B',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

/* 
================================================================================
LEGACY DESIGN BACKUP
================================================================================
If your team members do not agree with the new separated Resume/Job tabs, 
you can restore the old design by replacing the current `modes` array and 
`Job Details Form` with the following code blocks:

--- 1. Replace the current `modes` array with: ---

  const [selectedMode, setSelectedMode] = useState<string>('AI Interview');

  const modes = [
    {
      id: 'AI Interview',
      title: 'AI Interview',
      subtitle: 'Simulate a real interview with AI',
      icon: 'chatbubbles-outline'
    },
    {
      id: 'Technical',
      title: 'Technical',
      subtitle: 'Design, coding & technical Q&A',
      icon: 'calendar-outline'
    },
    {
      id: 'Behavioural',
      title: 'Behavioural',
      subtitle: 'Practice soft skills questions',
      icon: 'document-text-outline'
    }
  ];

--- 2. Replace the current Job Details Form with: ---

        {/* Job Details Static Form *\/}
        <View style={styles.jobDetailsContainer}>
          <View style={styles.jobFieldRow}>
            <Text style={styles.jobFieldLabel}>Job Title</Text>
            <Text style={styles.jobFieldValue}>Senior product designer</Text>
          </View>
          <View style={styles.jobFieldRow}>
            <Text style={styles.jobFieldLabel}>Experience</Text>
            <Text style={styles.jobFieldValue}>2+ years</Text>
          </View>
          <View style={styles.jobFieldRow}>
            <Text style={styles.jobFieldLabel}>Skills</Text>
            <Text style={styles.jobFieldValue}>Prototyping</Text>
          </View>
          <View style={styles.jobFieldRow}>
            <Text style={styles.jobFieldLabel}>Job Description</Text>
            <View style={styles.uploadedRow}>
              <Text style={styles.jobFieldValue}>Uploaded</Text>
              <Ionicons name="checkmark-circle-outline" size={20} color="#22C55E" style={{ marginLeft: 8 }} />
            </View>
          </View>
        </View>

================================================================================
*/
