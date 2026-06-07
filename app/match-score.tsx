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
import Svg, { Circle } from 'react-native-svg';
import { MatchScoreResult } from '../services/aiExtractionService';

export default function MatchScoreScreen() {
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

  // SVG circular progress setup
  const size = 180;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  // Calculate dash offset for score percentage
  const strokeDashoffset = circumference - (scoreData.overallScore / 100) * circumference;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#0F172A" />
          </TouchableOpacity>
        </View>

        {/* Score Card */}
        <View style={styles.scoreCard}>
          <Text style={styles.scoreCardTitle}>Overall Match Score</Text>
          
          <View style={styles.progressContainer}>
            <Svg width={size} height={size}>
              {/* Background Circle */}
              <Circle
                stroke="#F1F5F9"
                fill="none"
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={strokeWidth}
              />
              {/* Foreground Circle (Green) */}
              <Circle
                stroke="#22C55E"
                fill="none"
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="butt"
                rotation="-90"
                origin={`${size / 2}, ${size / 2}`}
              />
            </Svg>
            <View style={styles.progressTextContainer}>
              <Text style={styles.progressText}>{scoreData.overallScore}%</Text>
            </View>
          </View>

          <Text style={styles.verdictText}>Great Match 👋</Text>
          <Text style={styles.verdictSubtext}>
            You're a strong candidate for this role
          </Text>
        </View>

        {/* Metrics List */}
        <View style={styles.metricsContainer}>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Skills Match</Text>
            <Text style={styles.metricValue}>{scoreData.skillsMatch}%</Text>
          </View>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Qualification Match</Text>
            <Text style={styles.metricValue}>{scoreData.qualificationMatch}%</Text>
          </View>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Experience Match</Text>
            <Text style={styles.metricValue}>{scoreData.experienceMatch}%</Text>
          </View>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Education Match</Text>
            <Text style={styles.metricValue}>{scoreData.educationMatch}%</Text>
          </View>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Overall Fit</Text>
            <Text style={styles.metricValue}>{scoreData.overallFit}%</Text>
          </View>
        </View>

        <View style={styles.spacer} />

        {/* View Details Button */}
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {
            router.push({
              pathname: '/match-score-details',
              params: { matchResult: JSON.stringify(scoreData) }
            });
          }}
        >
          <Text style={styles.buttonText}>View Details</Text>
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
  scoreCard: {
    backgroundColor: '#F1F5F9', // Light gray background like in mockup
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  scoreCardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 24,
  },
  progressContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  progressTextContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: 40,
    fontWeight: '800',
    color: '#0F172A',
  },
  verdictText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#22C55E',
    marginBottom: 8,
  },
  verdictSubtext: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
  },
  metricsContainer: {
    paddingHorizontal: 16,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  metricLabel: {
    fontSize: 16,
    color: '#0F172A',
  },
  metricValue: {
    fontSize: 16,
    color: '#0F172A',
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
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
