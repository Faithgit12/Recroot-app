import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CheckEmailScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        <View style={styles.card}>
          <View style={styles.illustrationContainer}>
            <View style={styles.envelopeBackground}>
              <Ionicons name="mail" size={60} color="#60A5FA" />
              <View style={styles.atBadge}>
                <Text style={styles.atText}>@</Text>
              </View>
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}>1</Text>
              </View>
            </View>
          </View>

          <Text style={styles.title}>Check your email</Text>
          <Text style={styles.subtitle}>
            We have sent a password reset link to{'\n'}
            <Text style={styles.emailText}>example@gmail.com</Text>
          </Text>
          <Text style={styles.subtitle}>
            Please check your inbox and follow{'\n'}the instructions
          </Text>

          {/* Test button to proceed to the next step without a real email link */}
          <TouchableOpacity 
            style={styles.testButton} 
            onPress={() => router.push('/auth/reset-password')}
          >
            <Text style={styles.testButtonText}>Continue to Reset (Testing)</Text>
          </TouchableOpacity>
        </View>

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
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  illustrationContainer: {
    marginBottom: 32,
  },
  envelopeBackground: {
    width: 120,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  atBadge: {
    position: 'absolute',
    top: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  atText: {
    color: '#3B82F6',
    fontSize: 20,
    fontWeight: 'bold',
  },
  notificationBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  notificationText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 16,
  },
  emailText: {
    color: '#1A1A1A',
    fontWeight: '600',
  },
  testButton: {
    marginTop: 24,
    backgroundColor: '#E2E8F0',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  testButtonText: {
    color: '#475569',
    fontWeight: '600',
  },
});
