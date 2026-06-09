import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function GeneratedQuestionsScreen() {
  const router = useRouter();

  const [questions, setQuestions] = useState<string[]>([
    'Why are you interested in this role',
    'Why are you interested in this role',
    'Why are you interested in this role',
    'Why are you interested in this role',
    'Why are you interested in this role',
  ]);

  const removeQuestion = (index: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const updateQuestion = (index: number, text: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = text;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    if (questions.length < 20) {
      setQuestions([...questions, '']);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#0F172A" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageTitle}>AI Generated Questions</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>AI Generated Interview Questions</Text>
          <Text style={styles.cardSubtitle}>Optional - up to 5 questions shown to candidates</Text>

          <Text style={styles.helperText}>
            These questions appear to candidates when they apply. Keep them focused and role - specific
          </Text>

          <View style={styles.questionsContainer}>
            {questions.map((q, index) => (
              <View key={index} style={styles.questionRow}>
                <View style={styles.numberBox}>
                  <Text style={styles.numberText}>{index + 1}</Text>
                </View>
                
                <TextInput
                  style={styles.input}
                  value={q}
                  onChangeText={(text) => updateQuestion(index, text)}
                  placeholder="Type a question..."
                  placeholderTextColor="#94A3B8"
                />

                <TouchableOpacity onPress={() => removeQuestion(index)} style={styles.removeButton}>
                  <Ionicons name="close-circle-outline" size={24} color="#64748B" />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <Text style={styles.counterText}>{questions.length}/20</Text>

          <TouchableOpacity style={styles.addBtn} onPress={addQuestion}>
            <Text style={styles.addBtnText}>+ Add a Question</Text>
            <Text style={styles.addBtnCount}>({questions.length}/20)</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.spacer} />

        <TouchableOpacity 
          style={styles.continueButton} 
          onPress={() => router.replace('/home')}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
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
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 24,
  },
  helperText: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 22,
    marginBottom: 24,
  },
  questionsContainer: {
    gap: 12,
    marginBottom: 8,
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberBox: {
    width: 32,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  numberText: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '500',
  },
  input: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#0F172A',
  },
  removeButton: {
    padding: 8,
    marginLeft: 4,
  },
  counterText: {
    textAlign: 'right',
    fontSize: 12,
    color: '#64748B',
    marginBottom: 16,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    backgroundColor: '#FAFAF9',
  },
  addBtnText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#475569',
    marginRight: 4,
  },
  addBtnCount: {
    fontSize: 14,
    color: '#94A3B8',
  },
  spacer: {
    height: 24,
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
