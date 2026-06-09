import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function ApplicationSuccessScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    if (params.resumeChanged === 'true') {
      const timer = setTimeout(() => {
        Alert.alert(
          "Resume Changed",
          "We noticed a resume change, would you like to update your resume?",
          [
            { text: "No", style: 'cancel' },
            { text: "Yes", onPress: () => router.push('/resume') }
          ]
        );
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [params.resumeChanged, router]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Application Submitted</Text>
        <Text style={styles.subtitle}>
          Your application has been{'\n'}submitted successfully.
        </Text>
        <Text style={styles.subtext}>
          We'll notify you about the updates.
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.backHomeButton}
          onPress={() => router.push('/home')}
        >
          <Text style={styles.backHomeText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF3F9',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  subtext: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
  },
  footer: {
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 34 : 24,
  },
  backHomeButton: {
    backgroundColor: '#183C6B',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backHomeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  }
});
