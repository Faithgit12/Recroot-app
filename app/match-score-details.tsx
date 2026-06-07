import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MatchScoreResult } from '../services/aiExtractionService';

export default function MatchScoreDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { matchResult } = params;

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
    }
  }, [matchResult]);

  const matchData = [
    { label: 'Skills Match', score: scoreData.skillsMatch || 96, color: '#22C55E' },
    { label: 'Qualification Match', score: scoreData.qualificationMatch || 96, color: '#22C55E' },
    { label: 'Experience Match', score: scoreData.experienceMatch || 96, color: '#22C55E' },
    { label: 'Education Match', score: scoreData.educationMatch || 96, color: '#22C55E' },
    { label: 'Overall Fit', score: scoreData.overallFit || 96, color: '#22C55E' },
    { label: 'Overall Score', score: scoreData.overallScore || 95, color: '#183C6B' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#0F172A" />
          </TouchableOpacity>
        </View>

        <Text style={styles.pageTitle}>Match Score Breakdown</Text>

        {/* Progress Bars */}
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

        <View style={styles.spacer} />

        {/* Continue Button */}
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
});
