import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MatchScoreResult } from '../services/aiExtractionService';
import { useMatchStore } from '../store/matchStore';
import { exportMatchReport } from './utils/exportUtils';

export default function MatchScoreDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { matchResult } = params;
  const { recentMatch } = useMatchStore();

  const [scoreData, setScoreData] = useState<MatchScoreResult>({
    overallScore: 0,
    skillsMatch: 0,
    qualificationMatch: 0,
    experienceMatch: 0,
    educationMatch: 0,
    overallFit: 0,
  });

  useEffect(() => {
    if (matchResult) {
      try {
        const parsed = JSON.parse(matchResult as string);
        setScoreData(parsed);
      } catch (e) {
        console.error("Failed to parse match result");
      }
    } else if (recentMatch) {
      setScoreData(recentMatch);
    }
  }, [matchResult, recentMatch]);

  const matchData = [
    { label: 'Overall Score', score: scoreData.overallScore ?? 95, color: '#183C6B' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#0F172A" />
          </TouchableOpacity>
        </View>

        <Text style={styles.pageTitle}>Match Score Breakdown</Text>

        <View style={styles.progressSection}>
          {matchData.map((item, index) => (
            <View key={index} style={styles.progressRow}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>{item.label}</Text>
                <Text style={styles.progressScore}>{item.score}%</Text>
              </View>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${item.score}%`, backgroundColor: item.color }]} />
              </View>
            </View>
          ))}
        </View>

        {scoreData.matchedSkills && scoreData.matchedSkills.length > 0 && (
          <View style={styles.skillsSection}>
            <Text style={styles.skillsTitle}>Matched Skills</Text>
            <View style={styles.tagsContainer}>
              {scoreData.matchedSkills.map((skill, index) => (
                <View key={index} style={styles.matchedTag}>
                  <Text style={styles.matchedTagText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {scoreData.missingSkills && scoreData.missingSkills.length > 0 && (
          <View style={styles.skillsSection}>
            <Text style={styles.skillsTitle}>Missing Skills</Text>
            <View style={styles.tagsContainer}>
              {scoreData.missingSkills.map((skill, index) => (
                <View key={index} style={styles.missingTag}>
                  <Text style={styles.missingTagText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {scoreData.feedback && (
          <View style={styles.feedbackSection}>
            <Text style={styles.feedbackTitle}>Feedback</Text>
            <Text style={styles.feedbackText}>{scoreData.feedback}</Text>
          </View>
        )}

        <View style={styles.spacer} />

        <TouchableOpacity 
          style={styles.exportButton} 
          onPress={() => exportMatchReport(scoreData)}
        >
          <Ionicons name="download-outline" size={20} color="#183C6B" style={{ marginRight: 8 }} />
          <Text style={styles.exportButtonText}>Export PDF</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.continueButton} 
          onPress={() => router.replace('/home')}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
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
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 32,
  },
  progressSection: {
    marginBottom: 32,
  },
  progressRow: {
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  progressScore: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
  },
  progressBarBg: {
    height: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5,
  },
  spacer: {
    flex: 1,
    minHeight: 40,
  },
  continueButton: {
    backgroundColor: '#183C6B',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  exportButton: {
    backgroundColor: '#EEF3F9',
    borderRadius: 12,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#183C6B',
  },
  exportButtonText: {
    color: '#183C6B',
    fontSize: 16,
    fontWeight: '600',
  },
  skillsSection: {
    marginBottom: 24,
  },
  skillsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  matchedTag: {
    backgroundColor: '#DCFCE7',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  matchedTagText: {
    color: '#166534',
    fontSize: 14,
    fontWeight: '500',
  },
  missingTag: {
    backgroundColor: '#FEE2E2',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  missingTagText: {
    color: '#991B1B',
    fontSize: 14,
    fontWeight: '500',
  },
  feedbackSection: {
    marginBottom: 24,
    backgroundColor: '#F1F5F9',
    padding: 16,
    borderRadius: 12,
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 8,
  },
  feedbackText: {
    fontSize: 15,
    color: '#334155',
    lineHeight: 24,
  },
});
