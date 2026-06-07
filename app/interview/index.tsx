import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';
import { useAppStore } from '../../store/appStore';

export default function InterviewScreen() {
  const router = useRouter();
  const [selectedMode, setSelectedMode] = useState<string>('AI Interview');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const overallProgress = useAppStore(state => state.overallProgress);
  const recentSessions = useAppStore(state => state.recentSessions);
  const addSession = useAppStore(state => state.addSession);
  const setOverallProgress = useAppStore(state => state.setOverallProgress);

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

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate AI generation delay
    setTimeout(() => {
      setIsGenerating(false);
      
      // Update global progress by a small percentage, max 100%
      setOverallProgress(Math.min(overallProgress + 15, 100));
      
      // Add to recent sessions
      addSession({
        type: selectedMode,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      });
      
      // Navigate to generated screen
      router.push('/interview/generated');
    }, 2000);
  };

  // SVG circular progress setup
  const size = 100;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (overallProgress / 100) * circumference;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <Text style={styles.pageTitle}>Practice and ace your interviews</Text>

        {/* Modes Horizontal Scroll */}
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
                  color={selectedMode === mode.id ? '#183C6B' : (mode.id === 'Technical' ? '#EF4444' : '#F59E0B')} 
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

        {/* Job Details Static Form */}
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

        {/* Bottom Cards */}
        <View style={styles.bottomCardsContainer}>
          {/* Progress Card */}
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

          {/* Recent Sessions Card */}
          <View style={styles.sessionsCard}>
            <Text style={styles.cardTitle}>Recent Sessions</Text>
            
            <ScrollView showsVerticalScrollIndicator={false} style={styles.sessionsList}>
              {recentSessions.length === 0 ? (
                <Text style={styles.emptyText}>No sessions yet</Text>
              ) : (
                recentSessions.map((session) => (
                  <View key={session.id} style={styles.sessionRow}>
                    <Text style={styles.sessionType}>{session.type}</Text>
                    <Text style={styles.sessionDate}>{session.date}</Text>
                  </View>
                ))
              )}
            </ScrollView>
          </View>
        </View>

        <View style={styles.spacer} />

        {/* Generate Button */}
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
    fontSize: 12,
    color: '#0F172A',
    fontWeight: '500',
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
