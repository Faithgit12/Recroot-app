import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from '../../components/profile/styles';

export default function SuccessScreen() {
  const router = useRouter();

  const handleGoHome = () => {
    router.replace('/home');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EEF3F9' }}>
      <View style={[styles.container, { justifyContent: 'flex-end', paddingBottom: 40 }]}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={[styles.subtitle, { color: '#6B7280', marginBottom: 0, marginTop: 'auto' }]}>
            Your profile is ready, let's find the best jobs for you.
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleGoHome}>
          <Text style={styles.buttonText}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
