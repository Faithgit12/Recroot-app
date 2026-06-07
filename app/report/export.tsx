import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ExportReportScreen() {
  const router = useRouter();
  const { type } = useLocalSearchParams<{ type: string }>();

  const isInterviewPrep = type === 'Interview Prep Report';

  const matchData = [
    { label: 'Skills Match', score: 96, color: '#10B981' },
    { label: 'Qualification Match', score: 96, color: '#10B981' },
    { label: 'Experience Match', score: 96, color: '#10B981' },
    { label: 'Education Match', score: 96, color: '#10B981' },
    { label: 'Overall Fit', score: 96, color: '#10B981' },
    { label: 'Overall Score', score: 95, color: '#183C6B' },
  ];

  const mockQuestions = [
    'Tell me about a time you faced a significant challenge in your previous role.',
    'How do you prioritize your tasks when dealing with tight deadlines?',
    'Describe your approach to designing a new feature from scratch.',
    'How do you handle negative feedback on your designs?',
    'Where do you see your career heading in the next 5 years?',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <Text style={styles.pageTitle}>{isInterviewPrep ? 'Interview Prep Report' : 'Export Report'}</Text>
          <Text style={styles.pageSubtitle}>Download or share report</Text>
        </View>

        {!isInterviewPrep ? (
          <>
            {/* Summary Cards */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll} contentContainerStyle={styles.cardsContainer}>
              <View style={[styles.summaryCard, { backgroundColor: '#E6F4EA' }]}>
                <Ionicons name="sparkles" size={24} color="#10B981" style={styles.cardIcon} />
                <Text style={styles.cardTitle}>Matched Skills</Text>
                <Text style={styles.cardNumber}>15</Text>
                <Text style={styles.cardDesc}>Great match with required skills</Text>
              </View>
              
              <View style={[styles.summaryCard, { backgroundColor: '#FDE8E8' }]}>
                <Ionicons name="warning-outline" size={24} color="#EF4444" style={styles.cardIcon} />
                <Text style={styles.cardTitle}>Missing Skills</Text>
                <Text style={styles.cardNumber}>15</Text>
                <Text style={styles.cardDesc}>Great match with required skills</Text>
              </View>
            </ScrollView>

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
          </>
        ) : (
          <View style={styles.questionsListContainer}>
            <View style={styles.questionsListHeader}>
              <Ionicons name="chatbubbles-outline" size={24} color="#183C6B" />
              <Text style={styles.questionsListTitle}>Generated Questions</Text>
            </View>
            {mockQuestions.map((question, index) => (
              <View key={index} style={styles.questionItem}>
                <View style={styles.questionNumberBox}>
                  <Text style={styles.questionNumber}>{index + 1}</Text>
                </View>
                <Text style={styles.questionText}>{question}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Back to Home Button */}
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
});
