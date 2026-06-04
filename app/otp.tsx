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

// Import form styles
import { styles } from "../Styles/FormStyles";


const { height } = Dimensions.get("window");

export default function OtpScreen() {
  const router = useRouter();

  // State to store the 6 OTP digits. Initialized with empty strings.
  const [otpCode, setOtpCode] = useState<string[]>(["", "", "", "", "", ""]);
  
  // Track which box is currently active (focused)
  const [activeBoxIndex, setActiveBoxIndex] = useState(0);

  // Modal visibility state for success screen popup
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Timer state for "Resend Code" countdown (starts at 30 seconds)
  const [timerSeconds, setTimerSeconds] = useState(30);

  // Handle countdown timer decrement
  useEffect(() => {
    if (timerSeconds > 0) {
      const interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timerSeconds]);

  // Handles input when a number key is pressed on the custom keyboard
  const handleKeyPress = (num: string) => {
    // If the active index is within range, update the digit
    if (activeBoxIndex < 6) {
      const updatedCode = [...otpCode];
      updatedCode[activeBoxIndex] = num;
      setOtpCode(updatedCode);
      
      // Move focus to the next box (up to index 5)
      if (activeBoxIndex < 5) {
        setActiveBoxIndex(activeBoxIndex + 1);
      } else {
        // If we filled the last box, keep focus there or stop
        setActiveBoxIndex(6); 
      }
    }
  };

  // Handles deleting a character when backspace is pressed
  const handleBackspace = () => {
    const updatedCode = [...otpCode];

    if (activeBoxIndex === 6) {
      // If we are past the last box, delete the digit in box 5
      updatedCode[5] = "";
      setOtpCode(updatedCode);
      setActiveBoxIndex(5);
    } else if (activeBoxIndex > 0) {
      // Delete the digit in the active box or previous box, and move focus back
      const targetIndex = otpCode[activeBoxIndex] !== "" ? activeBoxIndex : activeBoxIndex - 1;
      updatedCode[targetIndex] = "";
      setOtpCode(updatedCode);
      setActiveBoxIndex(targetIndex);
    } else {
      // If we are at box 0, just clear it
      updatedCode[0] = "";
      setOtpCode(updatedCode);
      setActiveBoxIndex(0);
    }
  };

  // Handles clicking on an OTP box to manually change focus
  const handleBoxPress = (index: number) => {
    setActiveBoxIndex(index);
  };

  // Verifies the code
  const handleVerify = () => {
    const fullCode = otpCode.join("");
    if (fullCode.length < 6) {
      Alert.alert("Error", "Please enter all 6 digits of the verification code.");
      return;
    }
    
    // Simulate API verification success by showing the modal
    setShowSuccessModal(true);
  };

  // Handles "Resend" action
  const handleResend = () => {
    if (timerSeconds === 0) {
      setTimerSeconds(30);
      // Reset code inputs
      setOtpCode(["", "", "", "", "", ""]);
      setActiveBoxIndex(0);
      Alert.alert("Code Resent", "A new verification code has been sent to your email.");
    }
  };

  // Redirect to home screen on final proceed
  const handleProceed = () => {
    setShowSuccessModal(false);
    router.replace("/home");
  };

  // Custom numeric keypad render keys helper
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
        
        {/* Header Title Section */}
        <View style={styles.headerContainer}>
          <Text style={styles.pageTitle}>Enter OTP</Text>
          <Text style={styles.pageSubtitle}>We sent a verification code to your email</Text>
        </View>

        {/* OTP Input Boxes Row */}
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

        {/* Resend and Timer Container */}
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

          {/* Verification Trigger Button */}
          <Pressable style={styles.button} onPress={handleVerify}>
            <Text style={styles.buttonText}>Verify OTP Code</Text>
          </Pressable>
        </View>

        {/* Custom Numeric Keypad at the bottom */}
        <View style={styles.keyboardContainer}>
          {/* Row 1 */}
          <View style={styles.keyboardRow}>
            {renderKey("1")}
            {renderKey("2")}
            {renderKey("3")}
          </View>
          
          {/* Row 2 */}
          <View style={styles.keyboardRow}>
            {renderKey("4")}
            {renderKey("5")}
            {renderKey("6")}
          </View>

          {/* Row 3 */}
          <View style={styles.keyboardRow}>
            {renderKey("7")}
            {renderKey("8")}
            {renderKey("9")}
          </View>

          {/* Row 4 */}
          <View style={styles.keyboardRow}>
            <View style={styles.keyboardKeyEmpty} />
            {renderKey("0")}
            <Pressable style={styles.keyboardKey} onPress={handleBackspace}>
              <Text style={[styles.keyboardKeyText, { fontSize: 20 }]}>⌫</Text>
            </Pressable>
          </View>
        </View>

        {/* Success Modal Overlay */}
        <Modal
          visible={showSuccessModal}
          transparent={true}
          animationType="fade"
          onRequestClose={handleProceed}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.successCard}>
              
              {/* Confetti and Checkmark Illustration Wrapper */}
              <View style={styles.successIconWrapper}>
                {/* Visual Checkmark inside a custom double-ring circular wrapper */}
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

                {/* Styled CSS Confetti particles decoration */}
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

              {/* Proceed Button */}
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
