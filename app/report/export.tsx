import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { exportInterviewReport, exportMatchReport } from '../utils/exportUtils';

export default function ExportReportScreen() {
  const router = useRouter();
  const { type, questions: questionsParam, rawData } = useLocalSearchParams<{ type: string, questions?: string, rawData?: string }>();

  const isInterviewPrep = type === 'Interview Prep Report';
  
  let matchDetails: any = null;
  if (rawData) {
    try {
      matchDetails = JSON.parse(rawData);
    } catch(e) {}
  }

  const overallScore = matchDetails?.overallScore ?? 95;
  const numMatched = matchDetails?.matchedSkills?.length ?? 15;
  const numMissing = matchDetails?.missingSkills?.length ?? 15;

  const matchData = [
    { label: 'Overall Score', score: overallScore, color: '#183C6B' },
  ];

  let displayQuestions = [
    'Tell me about a time you faced a significant challenge in your previous role.',
    'How do you prioritize your tasks when dealing with tight deadlines?',
    'Describe your approach to designing a new feature from scratch.',
    'How do you handle negative feedback on your designs?',
    'Where do you see your career heading in the next 5 years?',
  ];

  if (questionsParam) {
    try {
      displayQuestions = JSON.parse(questionsParam);
    } catch (e) {}
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <Text style={styles.pageTitle}>{isInterviewPrep ? 'Interview Prep Report' : 'Export Report'}</Text>
          <Text style={styles.pageSubtitle}>Download or share report</Text>
        </View>

        {!isInterviewPrep ? (
          <>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll} contentContainerStyle={styles.cardsContainer}>
              <View style={[styles.summaryCard, { backgroundColor: '#E6F4EA' }]}>
                <Ionicons name="sparkles" size={24} color="#10B981" style={styles.cardIcon} />
                <Text style={styles.cardTitle}>Matched Skills</Text>
                <Text style={styles.cardNumber}>{numMatched}</Text>
                <Text style={styles.cardDesc}>Great match with required skills</Text>
              </View>
              
              <View style={[styles.summaryCard, { backgroundColor: '#FDE8E8' }]}>
                <Ionicons name="warning-outline" size={24} color="#EF4444" style={styles.cardIcon} />
                <Text style={styles.cardTitle}>Missing Skills</Text>
                <Text style={styles.cardNumber}>{numMissing}</Text>
                <Text style={styles.cardDesc}>Skills to improve or learn</Text>
              </View>
            </ScrollView>

            {matchDetails?.feedback && (
              <View style={styles.feedbackSection}>
                <Text style={styles.feedbackTitle}>Feedback Analysis</Text>
                <Text style={styles.feedbackText}>{matchDetails.feedback}</Text>
              </View>
            )}

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
          </>
        ) : (
          <View style={styles.questionsListContainer}>
            <View style={styles.questionsListHeader}>
              <Ionicons name="chatbubbles-outline" size={24} color="#183C6B" />
              <Text style={styles.questionsListTitle}>Generated Questions</Text>
            </View>
            {displayQuestions.map((question, index) => (
              <View key={index} style={styles.questionItem}>
                <View style={styles.questionNumberBox}>
                  <Text style={styles.questionNumber}>{index + 1}</Text>
                </View>
                <Text style={styles.questionText}>{question}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.spacer} />

        <TouchableOpacity 
          style={styles.exportButton} 
          onPress={() => {
            if (isInterviewPrep) {
              exportInterviewReport(displayQuestions);
            } else {
              exportMatchReport(matchDetails);
            }
          }}
        >
          <Ionicons name="download-outline" size={20} color="#183C6B" style={{ marginRight: 8 }} />
          <Text style={styles.exportButtonText}>Export PDF</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.homeButton} 
          onPress={() => router.replace('/home')}
        >
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF3F9',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#183C6B',
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  horizontalScroll: {
    marginHorizontal: -24,
    marginBottom: 32,
  },
  cardsContainer: {
    paddingHorizontal: 24,
    gap: 16,
  },
  summaryCard: {
    width: 150,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  cardIcon: {
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 13,
    color: '#1A1A1A',
    marginBottom: 8,
  },
  cardNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 16,
  },
  progressSection: {
    marginBottom: 32,
  },
  progressRow: {
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  progressScore: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  homeButton: {
    backgroundColor: '#183C6B',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  homeButtonText: {
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
  questionsListContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 32,
  },
  questionsListHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  questionsListTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginLeft: 8,
  },
  questionItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  questionNumberBox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  questionNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
  },
  questionText: {
    flex: 1,
    fontSize: 15,
    color: '#334155',
    lineHeight: 22,
  },
  feedbackSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  feedbackTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 8,
  },
  feedbackText: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 22,
  },
  spacer: {
    height: 32,
  },
});
