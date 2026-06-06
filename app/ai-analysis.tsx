import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';
import { extractJobDetails } from '../services/aiExtractionService';

export default function AIAnalysisScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const jobDescription = params.jobDescription as string;

  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    'Extracting job details',
    'Identifying key data',
    'Comparing with job requirement',
    'Calculating Match Score',
  ];

  useEffect(() => {
    let isMounted = true;

    const runAnalysis = async () => {
      // Simulate progress updates for UI
      const timer1 = setTimeout(() => { if(isMounted) { setProgress(25); setCurrentStep(1); } }, 800);
      const timer2 = setTimeout(() => { if(isMounted) { setProgress(50); setCurrentStep(2); } }, 1600);
      const timer3 = setTimeout(() => { if(isMounted) { setProgress(75); setCurrentStep(3); } }, 2400);

      // Actual extraction call
      try {
        const details = await extractJobDetails(jobDescription);
        
        if (isMounted) {
          setProgress(100);
          setCurrentStep(4);
          
          setTimeout(() => {
            // Pass the extracted details to the confirmation screen
            router.replace({
              pathname: '/edit-extracted-details',
              params: {
                extractedDetails: JSON.stringify(details),
                jobDescription: jobDescription, // Pass original JD for later matching
              }
            });
          }, 600);
        }
      } catch (error) {
        console.error("Extraction failed", error);
        // Handle error (e.g. show error message and go back)
      }

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    };

    runAnalysis();

    return () => {
      isMounted = false;
    };
  }, [jobDescription]);

  // SVG dimensions
  const size = 160;
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        {/* Title & Subtitle */}
        <View style={styles.header}>
          <Text style={styles.title}>AI Analysis</Text>
          <Text style={styles.subtitle}>Analyzing Compatibility...</Text>
          <Text style={styles.description}>
            Our AI is analyzing your resume against the job description
          </Text>
        </View>

        {/* Progress Circle */}
        <View style={styles.progressContainer}>
          <Svg width={size} height={size}>
            {/* Background Circle */}
            <Circle
              stroke="#E2E8F0"
              fill="none"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={strokeWidth}
            />
            {/* Progress Circle */}
            <Circle
              stroke="#183C6B"
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
            <Text style={styles.progressText}>{progress}%</Text>
          </View>
        </View>

        {/* Steps List */}
        <View style={styles.stepsContainer}>
          {steps.map((step, index) => {
            const isCompleted = currentStep > index;
            const isCurrent = currentStep === index;
            
            return (
              <View key={index} style={styles.stepRow}>
                <View style={styles.iconContainer}>
                  {isCompleted ? (
                    <Ionicons name="checkmark-circle" size={24} color="#22C55E" />
                  ) : isCurrent ? (
                    <View style={styles.loadingDot} />
                  ) : (
                    <View style={styles.emptyCircle} />
                  )}
                </View>
                <Text 
                  style={[
                    styles.stepText,
                    isCompleted && styles.stepTextCompleted,
                    isCurrent && styles.stepTextCurrent
                  ]}
                >
                  {step}
                </Text>
              </View>
            );
          })}
        </View>

        <View style={styles.spacer} />

        {/* Tip Box */}
        <View style={styles.tipBox}>
          <View style={styles.tipHeader}>
            <Ionicons name="bulb-outline" size={20} color="#0F172A" />
            <Text style={styles.tipTitle}>Tip</Text>
          </View>
          <Text style={styles.tipText}>
            This may take a few seconds. please wait while we analyze...
          </Text>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 22,
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    position: 'relative',
  },
  progressTextContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#0F172A',
  },
  stepsContainer: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  loadingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#183C6B',
  },
  emptyCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CBD5E1',
  },
  stepText: {
    fontSize: 15,
    color: '#94A3B8',
    fontWeight: '400',
  },
  stepTextCompleted: {
    color: '#0F172A',
    fontWeight: '400',
  },
  stepTextCurrent: {
    color: '#0F172A',
    fontWeight: '600',
  },
  spacer: {
    flex: 1,
  },
  tipBox: {
    backgroundColor: '#E0F2E9',
    borderRadius: 12,
    padding: 16,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    marginLeft: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#0F172A',
    lineHeight: 20,
  },
});
