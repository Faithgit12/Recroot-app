import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import {Ionicons} from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

// Import form styling
import { styles } from "../Styles/FormStyles";

export default function SignupScreen() {
  const router = useRouter();

  // Form input states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UI interaction states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // States to highlight inputs when focused
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Handles form validation and submission
  const handleContinue = () => {
    // 1. Basic validation checks
    if (!name.trim()) {
      Alert.alert("Validation Error", "Please enter your name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      Alert.alert("Validation Error", "Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Validation Error", "Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Validation Error", "Passwords do not match.");
      return;
    }
    if (!agreeToTerms) {
      Alert.alert("Validation Error", "You must agree to the Terms of Use & Privacy Policy.");
      return;
    }

    // 2. Navigate to the Profile Creation screen
    router.push("/profile/personal-info");
  };

  // Navigates to the Login page
  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <ScrollView>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoid}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Page Header */}
            <View style={styles.headerContainer}>
              <Text style={styles.pageTitle}>Create an Account</Text>
            </View>

            {/* Registration Form Fields */}
            <View style={styles.formContainer}>
              
              {/* 1. Name Input Field */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Your Name</Text>
                <View
                  style={[
                    styles.inputWrapper,
                    focusedField === "name" && styles.inputWrapperActive,
                  ]}
                >
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your first and Last name"
                    placeholderTextColor="#94A3B8"
                    value={name}
                    onChangeText={setName}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    autoCapitalize="words"
                  />
                </View>
              </View>

              {/* 2. Email Input Field */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <View
                  style={[
                    styles.inputWrapper,
                    focusedField === "email" && styles.inputWrapperActive,
                  ]}
                >
                  <TextInput
                    style={styles.textInput}
                    placeholder="you@your company.com"
                    placeholderTextColor="#94A3B8"
                    value={email}
                    onChangeText={setEmail}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>

              {/* 3. Password Input Field */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Create Password</Text>
                <View
                  style={[
                    styles.inputWrapper,
                    focusedField === "password" && styles.inputWrapperActive,
                  ]}
                >
                  <TextInput
                    style={styles.textInput}
                    placeholder="Create a strong Password"
                    placeholderTextColor="#94A3B8"
                    value={password}
                    onChangeText={setPassword}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <Pressable
                    style={styles.iconButton}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Ionicons name="eye" size={24} color="black" /> : <Ionicons name="eye-off" size={24} color="black" />}
                  </Pressable>
                </View>
              </View>

              {/* 4. Confirm Password Input Field */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Confirm Password</Text>
                <View
                  style={[
                    styles.inputWrapper,
                    focusedField === "confirmPassword" && styles.inputWrapperActive,
                  ]}
                >
                  <TextInput
                    style={styles.textInput}
                    placeholder="Re-enter your Password"
                    placeholderTextColor="#94A3B8"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    onFocus={() => setFocusedField("confirmPassword")}
                    onBlur={() => setFocusedField(null)}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <Pressable
                    style={styles.iconButton}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <Ionicons name="eye" size={24} color="black" /> : <Ionicons name="eye-off" size={24} color="black" />}
                  </Pressable>
                </View>
              </View>

              {/* Terms of Use and Privacy Checkbox */}
              <Pressable
                style={styles.checkboxContainer}
                onPress={() => setAgreeToTerms(!agreeToTerms)}
              >
                <View style={[styles.checkbox, agreeToTerms && styles.checkboxActive]}>
                  {agreeToTerms && <Text style={styles.checkboxCheckmark}>✓</Text>}
                </View>
                <Text style={styles.checkboxText}>
                  I agree to the <Text style={styles.linkText}>Terms</Text> of{" "}
                  <Text style={styles.linkText}>use</Text> and{" "}
                  <Text style={styles.linkText}>Privacy</Text>
                </Text>
              </Pressable>

              {/* Submit Button */}
              <Pressable style={styles.button} onPress={handleContinue}>
                <Text style={styles.buttonText}>Continue</Text>
              </Pressable>
            </View>

            {/* Footer Navigation */}
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <Pressable onPress={handleLoginRedirect}>
                <Text style={styles.footerLink}>Log In</Text>
              </Pressable>
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
