import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC", // Theme main background color
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: "space-between",
    paddingBottom: 30,
  },

  headerContainer: {
    alignItems: "center",
    marginTop: height * 0.05,
    marginBottom: height * 0.03,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: 'semibold',
    color: "#0F172A", // Dark Slate
    textAlign: "center",
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 15,
    color: "#475569", // Muted slate gray
    textAlign: "center",
    lineHeight: 22,
  },

  formContainer: {
    width: "100%",
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  inputWrapperActive: {
    borderColor: "#183C6B", // Corrected theme color
    borderWidth: 1.5,
  },
  textInput: {
    flex: 1,
    color: "#0F172A",
    fontSize: 16,
    height: "100%",
  },
  iconButton: {
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
    paddingHorizontal: 4,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    backgroundColor: "#FFFFFF",
  },
  checkboxActive: {
    backgroundColor: "#183C6B",
    borderColor: "#183C6B",
  },
  checkboxCheckmark: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  checkboxText: {
    fontSize: 14,
    color: "#475569",
    flex: 1,
    lineHeight: 20,
  },
  linkText: {
    color: "#183C6B",
    fontWeight: "600",
  },

  button: {
    width: "100%",
    backgroundColor: "#183C6B",
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#183C6B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    color: "#475569",
  },
  footerLink: {
    fontSize: 14,
    color: "#183C6B",
    fontWeight: "700",
    marginLeft: 4,
  },

  otpBoxesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: height * 0.04,
  },
  otpBox: {
    width: 50,
    height: 56,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 6,
    backgroundColor: "#EBF3FA", // Premium light blue-grey tint
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  otpBoxActive: {
    borderColor: "#183C6B",
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
  },
  otpBoxText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#183C6B",
  },
  timerText: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "right",
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 8,
    marginBottom: 32,
  },
  resendLabel: {
    fontSize: 14,
    color: "#475569",
  },
  resendLink: {
    color: "#183C6B",
    fontWeight: "700",
  },

  keyboardContainer: {
    backgroundColor: "#E2E8F0",
    padding: 16,
    paddingBottom: height * 0.04,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  keyboardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  keyboardKey: {
    flex: 1,
    height: 54,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  keyboardKeyEmpty: {
    flex: 1,
    height: 54,
    marginHorizontal: 6,
    backgroundColor: "transparent",
  },
  keyboardKeyText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#0F172A",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.4)", // Semi-transparent dark background
    justifyContent: "center",
    alignItems: "center",
  },
  successCard: {
    width: width * 0.85,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  successIconWrapper: {
    width: 140,
    height: 140,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  successIcon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 12,
    textAlign: "center",
  },
  successSubtitle: {
    fontSize: 15,
    color: "#475569",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 28,
  },
  successButton: {
    width: "100%",
    backgroundColor: "#183C6B",
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  successButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
