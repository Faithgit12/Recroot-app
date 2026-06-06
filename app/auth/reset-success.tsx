import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ResetSuccessScreen() {
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect to login after 2.5 seconds
    const timer = setTimeout(() => {
      router.replace('/login');
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        <View style={styles.card}>
          {/* Mock Success Illustration */}
          <View style={styles.illustrationContainer}>
            <View style={styles.iconCircle}>
              <Ionicons name="checkmark" size={60} color="#FFFFFF" />
            </View>
            <View style={[styles.star, { top: -10, left: 20, backgroundColor: '#10B981' }]} />
            <View style={[styles.star, { top: 20, right: 0, backgroundColor: '#10B981' }]} />
            <View style={[styles.star, { bottom: 0, left: 0, backgroundColor: '#10B981' }]} />
            <View style={[styles.star, { bottom: 20, right: 20, backgroundColor: '#10B981' }]} />
          </View>

          <Text style={styles.title}>Password Reset Successful!</Text>
          <Text style={styles.subtitle}>
            Your Password has been reset{'\n'}successfully.
          </Text>
          <Text style={styles.redirectText}>Redirecting...</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    width: 140,
    height: 140,
    position: 'relative',
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#10B981', // Green background
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 10,
    borderColor: '#E6F4EA', // Light green outer ring
  },
  star: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  redirectText: {
    fontSize: 14,
    color: '#1A1A1A',
    textAlign: 'center',
    fontWeight: '500',
  },
});
