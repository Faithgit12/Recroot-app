import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  Dimensions,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { styles } from "../Styles/FormStyles";


const { height } = Dimensions.get("window");

export default function OtpScreen() {
  const router = useRouter();

  const [otpCode, setOtpCode] = useState<string[]>(["", "", "", "", "", ""]);
  
  const [activeBoxIndex, setActiveBoxIndex] = useState(0);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [timerSeconds, setTimerSeconds] = useState(30);

  useEffect(() => {
    if (timerSeconds > 0) {
      const interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timerSeconds]);

  const handleKeyPress = (num: string) => {
    if (activeBoxIndex < 6) {
      const updatedCode = [...otpCode];
      updatedCode[activeBoxIndex] = num;
      setOtpCode(updatedCode);
      
      if (activeBoxIndex < 5) {
        setActiveBoxIndex(activeBoxIndex + 1);
      } else {
        setActiveBoxIndex(6); 
      }
    }
  };

  const handleBackspace = () => {
    const updatedCode = [...otpCode];

    if (activeBoxIndex === 6) {
      updatedCode[5] = "";
      setOtpCode(updatedCode);
      setActiveBoxIndex(5);
    } else if (activeBoxIndex > 0) {
      const targetIndex = otpCode[activeBoxIndex] !== "" ? activeBoxIndex : activeBoxIndex - 1;
      updatedCode[targetIndex] = "";
      setOtpCode(updatedCode);
      setActiveBoxIndex(targetIndex);
    } else {
      updatedCode[0] = "";
      setOtpCode(updatedCode);
      setActiveBoxIndex(0);
    }
  };

  const handleBoxPress = (index: number) => {
    setActiveBoxIndex(index);
  };

  const handleVerify = () => {
    const fullCode = otpCode.join("");
    if (fullCode.length < 6) {
      Alert.alert("Error", "Please enter all 6 digits of the verification code.");
      return;
    }
    
    setShowSuccessModal(true);
  };

  const handleResend = () => {
    if (timerSeconds === 0) {
      setTimerSeconds(30);
      setOtpCode(["", "", "", "", "", ""]);
      setActiveBoxIndex(0);
      Alert.alert("Code Resent", "A new verification code has been sent to your email.");
    }
  };

  const handleProceed = () => {
    setShowSuccessModal(false);
    router.replace("/home");
  };

  const renderKey = (val: string) => {
    return (
      <Pressable style={styles.keyboardKey} onPress={() => handleKeyPress(val)}>
        <Text style={styles.keyboardKeyText}>{val}</Text>
      </Pressable>
    );
  };

  return (
    <View style={[styles.container, { paddingBottom: height * 0.4 }]}>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        
        <View style={styles.headerContainer}>
          <Text style={styles.pageTitle}>Enter OTP</Text>
          <Text style={styles.pageSubtitle}>We sent a verification code to your email</Text>
        </View>

        <View style={styles.otpBoxesContainer}>
          {otpCode.map((digit, index) => (
            <Pressable
              key={index}
              onPress={() => handleBoxPress(index)}
              style={[
                styles.otpBox,
                activeBoxIndex === index && styles.otpBoxActive, // Highlight focused box
              ]}
            >
              <Text style={styles.otpBoxText}>{digit}</Text>
            </Pressable>
          ))}
        </View>

        <View style={{ paddingHorizontal: 24 }}>
          <View style={styles.resendContainer}>
            <Text style={styles.resendLabel}>
              Didn&apos;t receive a code?{" "}
              <Text
                style={[styles.resendLink, timerSeconds > 0 && { color: "#94A3B8" }]}
                onPress={handleResend}
              >
                Resend
              </Text>
            </Text>
            {timerSeconds > 0 && (
              <Text style={styles.timerText}>{timerSeconds}s</Text>
            )}
          </View>

          <Pressable style={styles.button} onPress={handleVerify}>
            <Text style={styles.buttonText}>Verify OTP Code</Text>
          </Pressable>
        </View>

        <View style={styles.keyboardContainer}>
          <View style={styles.keyboardRow}>
            {renderKey("1")}
            {renderKey("2")}
            {renderKey("3")}
          </View>
          
          <View style={styles.keyboardRow}>
            {renderKey("4")}
            {renderKey("5")}
            {renderKey("6")}
          </View>

          <View style={styles.keyboardRow}>
            {renderKey("7")}
            {renderKey("8")}
            {renderKey("9")}
          </View>

          <View style={styles.keyboardRow}>
            <View style={styles.keyboardKeyEmpty} />
            {renderKey("0")}
            <Pressable style={styles.keyboardKey} onPress={handleBackspace}>
              <Text style={[styles.keyboardKeyText, { fontSize: 20 }]}>⌫</Text>
            </Pressable>
          </View>
        </View>

        <Modal
          visible={showSuccessModal}
          transparent={true}
          animationType="fade"
          onRequestClose={handleProceed}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.successCard}>
              
              <View style={styles.successIconWrapper}>
                <View
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: 45,
                    borderWidth: 4,
                    borderColor: "#22C55E", // Success Green
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#F0FDF4",
                  }}
                >
                  <Text style={{ fontSize: 44, color: "#22C55E", fontWeight: "bold" }}>✓</Text>
                </View>

                <View style={{ position: "absolute", width: "100%", height: "100%" }}>
                  <View style={{ position: "absolute", top: 10, left: 10, width: 8, height: 8, borderRadius: 4, backgroundColor: "#FF4D4D" }} />
                  <View style={{ position: "absolute", top: 20, right: 15, width: 6, height: 12, borderRadius: 3, backgroundColor: "#3B82F6", transform: [{ rotate: "45deg" }] }} />
                  <View style={{ position: "absolute", bottom: 25, left: 5, width: 10, height: 6, borderRadius: 3, backgroundColor: "#FBBF24", transform: [{ rotate: "-20deg" }] }} />
                  <View style={{ position: "absolute", bottom: 15, right: 10, width: 8, height: 8, borderRadius: 4, backgroundColor: "#10B981" }} />
                  <View style={{ position: "absolute", top: 5, right: 50, width: 6, height: 6, borderRadius: 3, backgroundColor: "#EC4899" }} />
                </View>
              </View>

              <Text style={styles.successTitle}>Email Verified</Text>
              <Text style={styles.successSubtitle}>
                Your email has been successfully verified
              </Text>

              <Pressable style={styles.successButton} onPress={handleProceed}>
                <Text style={styles.successButtonText}>Proceed</Text>
              </Pressable>

            </View>
          </View>
        </Modal>

      </SafeAreaView>
    </View>
  );
}
