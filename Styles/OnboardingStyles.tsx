import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC", 
  },

  safeArea: {
    flex: 1,
    justifyContent: "space-between", 
  },

  headerContainer: {
    height: 60,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 24,
    marginTop: 10,
  },

  skipButton: {
    backgroundColor: "#E2E8F0",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10, 
    justifyContent: "center",
    alignItems: "center",
  },

  skipButtonText: {
    color: "#183C6B", 
    fontSize: 15,
    fontWeight: "600",
  },

  
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  imageCard: {
    width: width * 0.9, 
    height: height * 0.35, 
    backgroundColor: "#FFFFFF", 
    borderRadius: 16,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    
    elevation: 4,
    marginBottom: height * 0.04, 
  },

  
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain", 
  },


  textContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 12,
  },

  
  title: {
    fontSize: 28,
    fontWeight: "800", 
    textAlign: "center",
    color: "#0F172A", 
    lineHeight: 38,
    marginBottom: 16,
  },

  
  highlightText: {
    color: "#183C6B", 
  },


  description: {
    fontSize: 15,
    color: "#475569", 
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 10,
  },

  
  bottomContainer: {
    paddingHorizontal: 24,
    paddingBottom: height * 0.05,
    alignItems: "center",
    width: "100%",
  },

  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#CBD5E1", 
    marginHorizontal: 6,
  },

  activeDot: {
    backgroundColor: "#183C6B", 
  },

  button: {
    width: "100%",
    backgroundColor: "#183C6B", 
    paddingVertical: 16,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    
    shadowColor: "#183C6B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
