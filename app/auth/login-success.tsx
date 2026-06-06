import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function LoginSuccessScreen() {
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect to home after 2.5 seconds
    const timer = setTimeout(() => {
      router.replace('/home');
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        {/* Mock Confetti/Checkmark Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="checkmark" size={60} color="#10B981" />
          </View>
          {/* Confetti pieces mocked using scattered small views */}
          <View style={[styles.confetti, { top: -20, left: 10, backgroundColor: '#F472B6' }]} />
          <View style={[styles.confetti, { top: 0, right: -10, backgroundColor: '#3B82F6' }]} />
          <View style={[styles.confetti, { bottom: -10, left: -20, backgroundColor: '#FBBF24' }]} />
          <View style={[styles.confetti, { bottom: 20, right: 10, backgroundColor: '#34D399' }]} />
          <View style={[styles.confetti, { top: 30, left: -30, backgroundColor: '#A78BFA' }]} />
          <View style={[styles.confetti, { bottom: -30, right: -20, backgroundColor: '#F43F5E' }]} />
        </View>

        <Text style={styles.title}>Welcome, Alex!</Text>
        <Text style={styles.subtitle}>Login Successful</Text>
        <Text style={styles.redirectText}>Redirecting to your dashboard</Text>
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF3F9', // Matching the light blue background
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    width: 160,
    height: 160,
    position: 'relative',
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#10B981', // Green border
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  confetti: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#183C6B',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
    textAlign: 'center',
  },
  redirectText: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
  },
});
