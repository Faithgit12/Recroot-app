import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "../Styles/OnboardingStyles";

const { width } = Dimensions.get("window");

const ONBOARDING_DATA = [
  {
    id: 1,
    image: require("../assets/image 4.png"),
    titleParts: [
      { text: "Your Next\n", isHighlighted: false },
      { text: "Opportunity\n", isHighlighted: true },
      { text: "Starts Here", isHighlighted: false },
    ],
    description: "Find roles that match your skills,connect with top employers, and take the next step in your career.",
    buttonText: "Next",
  },
  {
    id: 2,
    image: require("../assets/image 2.png"),
    titleParts: [
      { text: "Create a Unique\n", isHighlighted: false },
      { text: "Profile", isHighlighted: true },
    ],
    description: "Showcase your experience ,skills, and achievements to attract recruiters and increase your chances of getting hired.",
    buttonText: "Next",
  },
  {
    id: 3,
    image: require("../assets/image 3.png"),
    titleParts: [
      { text: "Apply", isHighlighted: true },
      { text: ", Track, and\nGet Hired", isHighlighted: false },
    ],
    description: "Submit applications, monitor interview progress, and receive updates from employers.",
    buttonText: "Get Started",
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleFinish = () => {
    router.replace("/signup");
  };

  const handleNext = () => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    } else {
      handleFinish();
    }
  };

  const handleDotPress = (index: number) => {
    flatListRef.current?.scrollToIndex({
      index: index,
      animated: true,
    });
    setCurrentIndex(index);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollOffset / width);
    if (index !== currentIndex && index >= 0 && index < ONBOARDING_DATA.length) {
      setCurrentIndex(index);
    }
  };

  const renderItem = ({ item }: { item: typeof ONBOARDING_DATA[0] }) => {
    return (
      <View style={{ width, alignItems: "center", justifyContent: "center" }}>
        <View style={styles.contentContainer}>
          {/* 1. Illustration Card */}
          <View style={styles.imageCard}>
            <Image source={item.image} style={styles.image} />
          </View>

          {/* 2. Text Area (Title and Subtitle) */}
          <View style={styles.textContainer}>
            {/* Title with highlighted words */}
            <Text style={styles.title}>
              {item.titleParts.map((part, index) => (
                <Text
                  key={index}
                  style={part.isHighlighted ? styles.highlightText : null}
                >
                  {part.text}
                </Text>
              ))}
            </Text>

            {/* Description / Subtitle */}
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
        
        {/* Top Header: Skip Button */}
        <View style={styles.headerContainer}>
          <Pressable style={styles.skipButton} onPress={handleFinish}>
            <Text style={styles.skipButtonText}>Skip</Text>
          </Pressable>
        </View>

        {/* Middle Area: FlatList for swipable pages */}
        <FlatList
          ref={flatListRef}
          data={ONBOARDING_DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16} // Frequency of scroll position checking (approx. 60fps)
          style={{ flex: 1 }}
        />

        {/* Bottom Area: Page Indicator Dots & Action Button */}
        <View style={styles.bottomContainer}>
          {/* Dots Indicator */}
          <View style={styles.dotsContainer}>
            {ONBOARDING_DATA.map((_, index) => (
              <Pressable
                key={index}
                onPress={() => handleDotPress(index)}
                style={[
                  styles.dot,
                  currentIndex === index && styles.activeDot, 
                ]}
              />
            ))}
          </View>

          {/* Next / Get Started Action Button */}
          <Pressable style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>
              {ONBOARDING_DATA[currentIndex].buttonText}
            </Text>
          </Pressable>
        </View>

      </SafeAreaView>
    </View>
  );
}
