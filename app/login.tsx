import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import {Ionicons} from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

// Import form styling
import {styles} from "../Styles/FormStyles";

export default function LoginScreen() {
  const router = useRouter();

  // Form inputs state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);

  // Load saved email on screen mount if Remember Me was previously checked
  useEffect(() => {
    const loadSavedCredentials = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem('savedEmail');
        const savedRememberMe = await AsyncStorage.getItem('rememberMe');
        if (savedRememberMe === 'true' && savedEmail) {
          setEmail(savedEmail);
          setRememberMe(true);
        }
      } catch (e) {
        // Ignore storage read errors
      }
    };
    loadSavedCredentials();
  }, []);

  // Handles login verification
  const handleLogin = async () => {
    if (!email.trim() || !email.includes("@")) {
      Alert.alert("Validation Error", "Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Validation Error", "Password must be at least 6 characters long.");
      return;
    }

    // Save recroot user credentials based on Remember Me toggle
    try {
      if (rememberMe) {
        await AsyncStorage.setItem('savedEmail', email);
        await AsyncStorage.setItem('rememberMe', 'true');
      } else {
        await AsyncStorage.removeItem('savedEmail');
        await AsyncStorage.removeItem('rememberMe');
      }
    } catch (e) {
      // Ignore storage write errors
    }

    // Success redirect
    router.replace("/auth/login-success");
  };

  // Navigates to the Signup page
  const handleSignupRedirect = () => {
    router.push("/signup");
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
            <View>
           <Image source ={require('../assets/logomark.png')}
           style={{width:167.5, height:50, alignSelf:'center', marginTop:60 }}
           resizeMode="contain"
           />
            </View>
            <View style={styles.headerContainer}>
              <Text style={styles.pageTitle}>Welcome Back!</Text>
            </View>

            {/* Form Fields */}
            <View style={styles.formContainer}>
              
              {/* Email Address Input */}
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

              {/* Password Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Password</Text>
                <View
                  style={[
                    styles.inputWrapper,
                    focusedField === "password" && styles.inputWrapperActive,
                  ]}
                >
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your password"
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
                    <Text style={{ fontSize: 18, color: "#64748B" }}>
                      {showPassword ? <Ionicons name="eye" size={24} color="black" /> : <Ionicons name="eye-off" size={24} color="black" />}
                    </Text>
                  </Pressable>
                </View>
              </View>

              {/* Login Action Button */}
              <Pressable style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Log In</Text>
              </Pressable>
              </View>
            <View style={{
              flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:8,
            }}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Pressable onPress={() => setRememberMe(!rememberMe)}>
                <Ionicons name={rememberMe ? "checkbox" : "square-outline"} size={24} color="#1E3A5F" />
              </Pressable>
              <Text style={styles.footerText}>Remember me</Text>
              </View>

            {/* Forgot Password Link */}
            <View>
            <TouchableOpacity onPress={() => router.push("/auth/forgot-password")}>
              <Text style={{fontSize:15, fontWeight: '400', color:"#183C6B"}}>
                Forgot password?
                </Text>
            </TouchableOpacity>
             </View>
             </View>
             
            {/* Signup Navigation Link */}
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Don&apos;t have an account?</Text>
              <Pressable onPress={handleSignupRedirect}>
                <Text style={styles.footerLink}>Sign Up</Text>
              </Pressable>
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
