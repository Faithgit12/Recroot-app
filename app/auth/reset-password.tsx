import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ResetPasswordScreen() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumberOrSpecial = /[0-9!@#$%^&*]/.test(password);

  const handleReset = () => {
    if (hasMinLength && hasUppercase && hasNumberOrSpecial && password === confirmPassword) {
      router.push('/auth/reset-success');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          
          <View style={styles.header}>
            <Text style={styles.title}>Reset Password</Text>
          </View>

          <View style={styles.formContainer}>
            
            <Text style={styles.inputLabel}>New Password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.textInput}
                placeholder="********"
                placeholderTextColor="#94A3B8"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color="#94A3B8" />
              </TouchableOpacity>
            </View>

            <View style={styles.validationContainer}>
              <View style={styles.validationRow}>
                <Ionicons name="checkmark-circle-outline" size={18} color={hasMinLength ? "#10B981" : "#94A3B8"} />
                <Text style={[styles.validationText, hasMinLength && styles.validationTextActive]}>At least 8 characters</Text>
              </View>
              <View style={styles.validationRow}>
                <Ionicons name="checkmark-circle-outline" size={18} color={hasUppercase ? "#10B981" : "#94A3B8"} />
                <Text style={[styles.validationText, hasUppercase && styles.validationTextActive]}>One Uppercase Letter (A-Z)</Text>
              </View>
              <View style={styles.validationRow}>
                <Ionicons name="checkmark-circle-outline" size={18} color={hasNumberOrSpecial ? "#10B981" : "#94A3B8"} />
                <Text style={[styles.validationText, hasNumberOrSpecial && styles.validationTextActive]}>One number or special character (@,!,#)</Text>
              </View>
            </View>

            <Text style={styles.inputLabel}>Confirm New Password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.textInput}
                placeholder="********"
                placeholderTextColor="#94A3B8"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} size={20} color="#94A3B8" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={[
                styles.button, 
                (!hasMinLength || !hasUppercase || !hasNumberOrSpecial || password !== confirmPassword || password === '') && styles.buttonDisabled
              ]} 
              onPress={handleReset}
              disabled={!hasMinLength || !hasUppercase || !hasNumberOrSpecial || password !== confirmPassword || password === ''}
            >
              <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>

          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF3F9',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#183C6B',
  },
  formContainer: {
    width: '100%',
  },
  inputLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 16,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: '#1A1A1A',
  },
  validationContainer: {
    marginBottom: 24,
  },
  validationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  validationText: {
    fontSize: 13,
    color: '#94A3B8',
    marginLeft: 8,
  },
  validationTextActive: {
    color: '#1A1A1A',
  },
  button: {
    backgroundColor: '#183C6B',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: '#94A3B8',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
